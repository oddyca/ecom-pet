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
                />
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
                SUBMIT
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
          />
        </>
      )}
    </div>
  );
}
