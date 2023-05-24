import React, {
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  forwardRef,
} from 'react';
import isEqual from 'lodash/isEqual';
import { loadMicroApp } from 'qiankun'
import { Loader } from './Loader';
import { ErrorBoundary } from './ErrorBoundary';
import { proxy, useSnapshot } from 'valtio';

import type { 
  FrameworkConfiguration, 
  MicroApp as MicroAppTypeDefinition,
} from 'qiankun';

const globalState = proxy({
  count: 1,
})

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
  wrapperClassName?: string;
  className?: string;
  autoSetLoading?: boolean;
  autoCaptureError?: boolean;
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
  const { count } = useSnapshot(globalState);
  const { 
    settings: settingsFromProps = {},
    className,
    wrapperClassName,
    loader,
    errorBoundary,
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

  const microAppLoader =
    loader ||
    (propsFromParams.autoSetLoading
      ? (loading) => <Loader loading={loading} />
      : null);

  const microAppErrorBoundary =
    errorBoundary ||
    (propsFromParams.autoCaptureError
      ? (e) => <ErrorBoundary error={e} />
      : null);

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
          props: {
            globalState
          },
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

  const microAppWrapperClassName = wrapperClassName
    ? `${wrapperClassName} qiankun-micro-app-wrapper`
    : 'qiankun-micro-app-wrapper';

  const microAppClassName = className
    ? `${className} qiankun-micro-app-container`
    : 'qiankun-micro-app-container';

  return Boolean(microAppLoader) || Boolean(microAppErrorBoundary) ? (
    <div
      style={{ position: 'relative' }}
      className={microAppWrapperClassName}
    >
      {Boolean(microAppLoader) && microAppLoader?.(loading)}
      {Boolean(microAppErrorBoundary) &&
        Boolean(error) &&
        microAppErrorBoundary?.(error)}
      <div ref={containerRef} className={microAppClassName} />
    </div>
  ) : (
    <>
      {count}
      <div ref={containerRef} className={microAppClassName} />
    </>
  );
}

export const MicroApp = forwardRef<MicroAppType, MicroAppProps>(InternalMicroApp);