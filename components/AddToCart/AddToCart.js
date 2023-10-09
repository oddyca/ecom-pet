'use client';

import React from 'react';
import Image from 'next/image';
import NextImage from 'next/image';

import useStore from '../../controller/store/store';

export default function AddToCart({ id }) {
  const { addToCart } = useStore();

  return (
    <>
      <button
        type="submit"
        className="flex justify-center items-center w-full py-3.5 px-3 bg-[#2D2D2D] text-white rounded-lg hover:bg-[#555555]"
        onClick={() => addToCart(id)}
      >
        <Image
          as={NextImage}
          src="/cart-white.svg"
          width={16}
          height={16}
          alt="cart icon"
        />
      </button>
    </>
  );
}
