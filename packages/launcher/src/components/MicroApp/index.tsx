import React, {
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  forwardRef,
} from 'react';
import isEqual from 'lodash/isEqual';
import { loadMicroApp } from 'qiankun'

import type { 
  FrameworkConfiguration, 
  MicroApp as MicroAppTypeDefinition,
} from 'qiankun'

type MicroAppType = MicroAppTypeDefinition & {
  _unmounting?: boolean;
  _updatingPromise?: Promise<null>;
  _updatingTimestamp?: number;
};

interface MicroAppConfig {
  name: string;
  entry: string;
}

interface MicroAppProps extends FrameworkConfiguration {
  /** 微应用的名称 */
  name: string;
  /** 微应用的入口 */
  entry?: string;
  /** 初始化时需要传递给微应用的数据 */
  props?: any;
  loader?: (loading: boolean) => React.ReactNode;
  errorBoundary?: (error: any) => React.ReactNode;
  settings?: FrameworkConfiguration;
  [key: string]: any;
}

const apps = [
  {
    "name": "vite-react",
    "entry": "//localhost:9501"
  },
  {
    "name": "umi4",
    "entry": "//localhost:9502"
  }
]

function unmountMicroApp(microApp: MicroAppType) {
  microApp.mountPromise.then(() => microApp.unmount());
}

function useDeepCompare<T>(value: T): T {
  const ref = useRef<T>(value);
  if (!isEqual(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

export const InternalMicroApp: React.ForwardRefRenderFunction<MicroAppType, MicroAppProps> = (props, componentRef) => {
  const { 
    errorBoundary,
    settings: settingsFromProps = {},
    ...propsFromParams
  } = props;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const microAppRef = useRef<MicroAppType>();
  const containerRef = useRef<HTMLDivElement>(null);

  const name = props.name;
  const isCurrentApp = (app: MicroAppConfig) => app.name === name;
  const appConfig = apps.find((app) => isCurrentApp(app));

  const { entry } = appConfig || {} as MicroAppConfig;

  useImperativeHandle(componentRef, () => microAppRef.current!);

  const microAppErrorBoundary = errorBoundary ?? null;

  const setComponentError = (error: any) => {
    if (microAppErrorBoundary) {
      setError(error);
      // error log 出来，不要吞
      if (error) {
        console.error(error);
      }
    } else if (error) {
      throw error;
    }
  };

  useEffect(
    () => {
      setLoading(true);
      setComponentError(null);

      const configuration = {
        globalContext: window,
        ...settingsFromProps,
      };

      microAppRef.current = loadMicroApp(
        {
          name,
          entry,
          container: containerRef.current!,
          props: {},
        },
        configuration,
      );

      (['loadPromise', 'bootstrapPromise', 'mountPromise'] as const).forEach(
        (key) => {
          const promise = microAppRef.current?.[key];
          promise?.catch((e) => {
            setComponentError(e);
            setLoading(false);
          });
        },
      );

      return () => {
        const microApp = microAppRef.current;

        if (microApp) {
          microApp._unmounting = true;
          unmountMicroApp(microApp);
        }
      };
    }, 
    [name]
  );

  useEffect(
    () => {
      const microApp = microAppRef.current;

      if (!microApp) return;

      if (!microApp._updatingPromise) {
        microApp._updatingPromise = microApp.mountPromise;
        microApp._updatingTimestamp = Date.now();
      } else {
        microApp._updatingPromise = microApp._updatingPromise.then(() => {
          const canUpdate = (microApp?: MicroAppType) => microApp?.update && microApp.getStatus() === 'MOUNTED' && !microApp._unmounting;

          if (canUpdate(microApp)) {
            const props = {
              ...propsFromParams,
              setLoading,
            };

            return microApp.update?.(props);
          }
        })
      }
    }, 
    [useDeepCompare({ ...propsFromParams })]
  );

  return (
    <div ref={containerRef} />
  )
}

export const MicroApp = forwardRef<MicroAppType, MicroAppProps>(InternalMicroApp);