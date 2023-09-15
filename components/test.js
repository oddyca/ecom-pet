'use client';

import React from 'react';
import useStore from '../controller/store/store';

export default function Test() {
  const itemsCount = useStore((state) => state.cart.size);
  return (
    <div>{itemsCount}</div>
  );
}
