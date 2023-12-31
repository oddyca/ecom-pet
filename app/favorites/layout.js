import React, { Suspense } from 'react';
import Loading from './loading';

export default async function Layout({ children }) {
  return (
    <>
      <Suspense fallback={<Loading />}>
        {children}
      </Suspense>
    </>
  );
}
