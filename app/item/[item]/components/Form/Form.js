'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import AddToCart from '../../../../../components/AddToCart/AddToCart';
import AddToFavorite from '../../../../../components/AddToFavorite/AddToFavorite';
import useStore from '../../../../../controller/store/store';

const sizes = ['S', 'M', 'L', 'XL'];

export default function Form({ fetchedInfo }) {
  const { addToCart } = useStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const handleFormSubmit = (data, event) => {
    event.preventDefault();
    // TODO: submit logic
  };

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div className="flex flex-col gap-1">
        { (fetchedInfo.category === "men's clothing" || fetchedInfo.category === "women's clothing")
          && (
            <>
              <p className="text-sm font-gray">Pick size</p>
              <div className="flex items-center gap-2 relative w-fit">
                {
                  sizes.map((size) => (
                    <div>
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
                        key={size}
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
        <AddToCart id={fetchedInfo.id} />
        <div className="flex-1 rounded-lg border-2 border-black group">
          <AddToFavorite />
        </div>
      </div>
    </form>
  );
}