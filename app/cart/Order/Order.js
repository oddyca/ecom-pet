'use client';

import React from 'react';

export default function Order({ items }) {
  return (
    <div className="flex flex-col gap-3 w-full rounded-md p-4 bg-white shadow-lg">
      <div className="w-full flex flex-col gap-3 border-b-2 border-b-stroke-light-blue pb-2">
        <div className="flex justify-between">
          <p>Cart total</p>
          <p>total items price</p>
        </div>
        <div className="flex justify-between">
          <p>Delivery fee</p>
          <p>$9.99</p>
        </div>
      </div>
      <div>
        <p className="text-sm">Promo code</p>
        <input
          type="text"
          className="h-[36px] w-full border border-black rounded"
        />
      </div>
      <div className="flex justify-between">
        <h1>TOTAL</h1>
        <h1>total price</h1>
      </div>
      <buttom className="w-full py-2 rounded-lg bg-black text-white flex flex-col items-center">
        ORDER
        {' '}
        <span className="text-sm">
          {items.length}
          {' '}
          items
        </span>
      </buttom>
    </div>
  );
}
