'use client';

import React from 'react';
import { NextUIProvider } from '@nextui-org/react';

export default function Providers({ children }) {
  return (
    <NextUIProvider className="flex flex-col">
      {children}
    </NextUIProvider>
  );
}
