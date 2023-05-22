import React, { Suspense, useMemo, lazy } from 'react'

interface LazyProps {
  entry: () => any;
}

export const Lazy: React.FC<LazyProps> = ({ entry }) => {
  const Comp = useMemo(
    () => lazy(entry),
    [location.pathname]
  );

  return (
    <Suspense
      fallback={null}
    >
      <Comp />
    </Suspense>
  )
}

export default Lazy;
