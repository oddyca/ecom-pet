import React from 'react';
import Image from 'next/image';

export default function AddToCart() {
  return (
    <>
      <button
        type="submit"
        className="flex justify-center items-center w-full py-3.5 px-3 bg-black text-white rounded-lg hover:bg-[#555555]"
      >
        <Image
          src="/cart-white.svg"
          width={16}
          height={16}
          alt="cart icon"
        />
      </button>
    </>
  );
}
