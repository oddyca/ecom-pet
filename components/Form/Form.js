'use client';

import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import AddToCart from '../AddToCart/AddToCart';
import AddToFavorite from '../AddToFavorite/AddToFavorite';
import useStore from '../../controller/store/store';
import { replaceInLocalStorage } from '../../controller/clientController';
import { SIZES } from '../../lib/lib';

export default function Form({ fetchedInfo, setIsEnetered, onClose }) {
  const { addToCart, cart } = useStore();
  const cartRef = useRef(cart);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const handleFormSubmit = (data, event) => {
    event.preventDefault();
    addToCart(fetchedInfo.id, data.size);
    if (setIsEnetered) setIsEnetered(false);
    if (onClose) onClose();
  };

  useEffect(() => () => {
    replaceInLocalStorage(cartRef.current);
  }, []);

  useEffect(() => {
    cartRef.current = cart;
  }, [cart]);

  return (
    <form
      className="flex flex-col gap-4 lg:gap-2"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div className="flex flex-col gap-2 lg:gap-1">
        { (fetchedInfo.category === "men's clothing" || fetchedInfo.category === "women's clothing")
          && (
            <>
              <p className="text-sm font-gray">Pick size</p>
              <div className="flex items-center gap-2 relative w-fit">
                {
                  SIZES.map((size) => (
                    <div
                      key={size}
                    >
                      <input
                        id={`radio-${size}`}
                        type="radio"
                        value={size}
                        {...register('size', {
                          required: 'This field is required',
                        })}
                        className="hidden peer"
                      />
                      <label
                        htmlFor={`radio-${size}`}
                        className="border border-2 border-gray px-3 py-1 peer-checked:border-black cursor-pointer"
                      >
                        {size}
                      </label>
                    </div>
                  ))
                }
                {errors.size && (
                  <div className="absolute right-[-50px] bottom-2 w-fit h-fit p-2 border rounded text-sm text-red border-2 border-red bg-white">
                    <span className="">{errors.size.message}</span>
                  </div>
                )}
              </div>
            </>
          )}
      </div>
      <div className="flex gap-3 items-center max-w-[390px]">
        <AddToCart />
        <div className="flex-1 rounded-lg border-2 border-black group">
          <AddToFavorite id={fetchedInfo.id} />
        </div>
      </div>
    </form>
  );
}
