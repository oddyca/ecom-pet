'use client';

import React from 'react';
import useStore from '../../controller/store/store';

export default function ItemsInCart() {
  const { cart } = useStore();
  const values = [...cart.values()];
  const cartSize = values.reduce((sum, current) => (sum + current.quantity), 0);

  return (
    <>
      {cart.size !== 0 && <div className="absolute rounded-full grid place-items-center top-[-.75rem] right-[-1rem] bg-black text-white text-sm h-5 w-5">{cartSize <= 9 ? cartSize : '9+'}</div>}
    </>
  );
}
