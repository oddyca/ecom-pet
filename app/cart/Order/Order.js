'use client';

import React from 'react';
import { Input } from '@nextui-org/react';

export default function Order({ items }) {
  const calcItemsPrice = () => {
    const calcOfTotalItemPrice = items.reduce((sum, current) => (
      current.sale
        ? sum + (current.price - (current.price * (Number(current.sale) / 100)))
        : sum + current.price
    ), 0);
    return calcOfTotalItemPrice;
  };

  return (
    <div className="flex flex-col justify-center items-center gap-3 w-full rounded-md p-4 bg-white shadow-lg">
      {
        items.length === 0
          ? <p>No items in cart</p>
          : (
            <>
              <div className="w-full flex flex-col gap-3 border-b-2 border-b-stroke-light-blue pb-2">
                <div className="flex justify-between">
                  <p>Cart total</p>
                  <p>{`$${calcItemsPrice()}`}</p>
                </div>
                <div className="flex justify-between">
                  <p>Delivery fee</p>
                  <p>{calcItemsPrice() >= 40 ? '-' : '$5.00'}</p>
                </div>
              </div>
              <div className="w-full flex flex-col gap-1">
                <Input
                  type="text"
                  label="Promo code"
                  labelPlacement="outside"
                  size="lg"
                  variant="bordered"
                  startContent={(
                    <svg
                      width="20"
                      height="14"
                      viewBox="0 0 20 14"
                      fill="none"
                      className="stroke-current"
                    >
                      <path
                        d="M12 1H4C3.06812 1 2.60192 1 2.23438 1.15224C1.74432 1.35523 1.35523 1.74481 1.15224 2.23486C1 2.60241 1 3.06835 1 4.00023C2.65685 4.00023 4 5.34292 4 6.99977C4 8.65662 2.65685 10 1 10C1 10.9319 1 11.3978 1.15224 11.7654C1.35523 12.2554 1.74432 12.6447 2.23438 12.8477C2.60192 12.9999 3.06812 13 4 13H12M12 1H16C16.9319 1 17.3978 1 17.7654 1.15224C18.2554 1.35523 18.6447 1.74481 18.8477 2.23486C18.9999 2.6024 18.9999 3.06835 18.9999 4.00023C17.343 4.00023 16 5.34315 16 7C16 8.65685 17.343 10 18.9999 10C18.9999 10.9319 18.9999 11.3978 18.8477 11.7654C18.6447 12.2554 18.2554 12.6447 17.7654 12.8477C17.3978 12.9999 16.9319 13 16 13H12M12 1V13"
                        strokeWidth="1.5"
                      />
                    </svg>
                  )}
                />
              </div>
              <div className="flex justify-between w-full text-lg font-bold">
                <h1>TOTAL</h1>
                <h1>{`$${calcItemsPrice() >= 40 ? calcItemsPrice() : calcItemsPrice() + 5}`}</h1>
              </div>
              <button
                type="button"
                className="w-full py-2 rounded-lg bg-black text-white flex flex-col items-center"
              >
                ORDER
                {' '}
                <span className="text-sm">
                  {items.length}
                  {' '}
                  items
                </span>
              </button>
            </>
          )
      }
    </div>
  );
}
