'use client';

import React from 'react';
import useStore from '../controller/store/store';
import Test from '../components/test';

import Header from '../components/Header/Header';

export default function Home() {
  const addToCart = useStore((state) => state.addToCart);

  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between text-sm lg:flex">
          <Test />
          <button
            type="button"
            onClick={() => addToCart('1')}
          >
            add to cart
          </button>
        </div>
      </main>
    </>

  );
}
