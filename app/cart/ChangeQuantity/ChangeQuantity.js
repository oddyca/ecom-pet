'use client';

import React from 'react';
import useStore from '../../../controller/store/store';

export default function ChangeQuantity({ id, quantity, size }) {
  const { addToCart, decreaseAmount } = useStore();

  return (
    <div className="flex outline outline-1 outline-icon-blue rounded w-fit">
      <button
        type="button"
        className="px-4 py-2 hover:bg-gray-100"
        onClick={() => decreaseAmount(id, size)}
      >
        -
      </button>
      <p className="px-6 py-2">{quantity}</p>
      <button
        type="button"
        className="px-4 py-2 hover:bg-gray-100"
        onClick={() => addToCart(id, size)}
      >
        +
      </button>
    </div>
  );
}
