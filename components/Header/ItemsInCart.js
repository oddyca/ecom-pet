'use client';

import React from 'react';
import useStore from '../../controller/store/store';

export default function ItemsInCart() {
  const itemsCount = useStore((state) => state.cart.size);

  return (
    <>
      {itemsCount !== 0 && <div className="absolute rounded-full grid place-items-center top-[-.75rem] right-[-1rem] bg-black text-white text-sm h-5 w-5">{itemsCount}</div>}
    </>
  );
}
