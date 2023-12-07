'use client';

import React from 'react';
import Image from 'next/image';
import useStore from '../../../controller/store/store';

export default function DeleteItem({ id, size }) {
  const IS_LOGGED = localStorage.getItem('isLogged');
  const { removeFromCart } = useStore();

  return (
    <button
      type="button"
      onClick={() => removeFromCart(id, IS_LOGGED, size)}
      className="block grid place-content-center h-full w-[64px] bg-red rounded-lg justify-self-stretch place-self-stretch
       hover:bg-[#B94747]"
    >
      <Image
        src="/cart-white.svg"
        alt="cart icon"
        width={20}
        height={20}
      />
    </button>
  );
}
