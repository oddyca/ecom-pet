'use client';

import React, { useState } from 'react';
import { Input } from '@nextui-org/react';
import { PROMO_CODES } from '../../../lib/lib';
import OrderModal from './OrderModal';

export default function Order({ items }) {
  const [typedPromo, setTypedPromo] = useState('');
  const [isCorrect, seIsCorrect] = useState(true);
  const [currentDiscount, setCurrentDiscount] = useState(null);

  const calculateTotalPrice = () => {
    const initialPrice = items.reduce((sum, current) => {
      const discountedPrice = current.discount
        ? current.price - (current.price * (Number(current.discount) / 100))
        : current.price;
      return sum + discountedPrice * current.quantity;
    }, 0);

    const deliveryFee = initialPrice < 40 ? 5 : 0;
    return initialPrice + deliveryFee;
  };

  const handlePromoCodeCheck = () => {
    if (PROMO_CODES[typedPromo]) {
      setCurrentDiscount(PROMO_CODES[typedPromo]);
      seIsCorrect(true);
    } else {
      seIsCorrect(false);
    }
  };

  const totalOrderSum = calculateTotalPrice();

  return (
    <div className="flex flex-col justify-center items-center gap-3 w-full rounded-md p-4 bg-white shadow-lg">
      {items.length === 0 ? (
        <p>No items in the cart</p>
      ) : (
        <>
          <div className="w-full flex flex-col gap-3 border-b-2 border-b-stroke-light-blue pb-2">
            <div className="flex justify-between">
              <p>Cart total</p>
              <p>{`$${totalOrderSum.toFixed(2)}`}</p>
            </div>
            <div className="flex justify-between">
              <p>Delivery fee</p>
              <p>{totalOrderSum >= 40 ? '-' : '$5.00'}</p>
            </div>
          </div>
          <div className="w-full flex flex-col gap-1 overflow-hidden">
            <Input
              type="text"
              label="Promo code"
              labelPlacement="outside"
              size="lg"
              variant="bordered"
              value={typedPromo}
              onChange={(e) => setTypedPromo(e.target.value)}
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
            {!isCorrect && (
              <p className="self-start text-sm text-red">Wrong promo code</p>
            )}
            {typedPromo && (
              <button
                type="button"
                className="w-fit py-2 px-4 rounded-lg bg-black text-white self-end animate-slideup hover:bg-[#555555]"
                onClick={handlePromoCodeCheck}
              >
                APPLY
              </button>
            )}
          </div>
          <div className="flex flex-col w-full text-lg font-bold">
            <div className="flex justify-between">
              <h1>TOTAL</h1>
              {currentDiscount ? (
                <span>
                  <span className="line-through text-sm font-normal">{`$${totalOrderSum.toFixed(2)}`}</span>
                  {' $'}
                  {`${(totalOrderSum / (1 + currentDiscount)).toFixed(2)}`}
                </span>
              ) : (
                `$${totalOrderSum.toFixed(2)}`
              )}
            </div>
            {currentDiscount && (
              <div className="flex justify-between font-normal">
                <p className="text-sm text-red">Discount</p>
                <p className="text-sm text-red">{`${currentDiscount * 100}%`}</p>
              </div>
            )}
          </div>
          <OrderModal
            items={items}
            totalOrderSum={totalOrderSum}
            currentDiscount={currentDiscount * 100}
          />
        </>
      )}
    </div>
  );
}
