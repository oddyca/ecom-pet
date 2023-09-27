'use client';

import React, { useState } from 'react';
import { Image } from '@nextui-org/react';
import NextImage from 'next/image';
import Link from 'next/link';
/* eslint-disable no-nested-ternary */
export default function ItemCard({
  itemID, img, price, title, category,
}) {
  const [isEnetered, setIsEnetered] = useState(false);

  const handleMouseEnter = () => {
    setIsEnetered((state) => !state);
  };

  const cardHovered = 'relative overflow-hidden order-none w-[250px] h-[360px] bg-white rounded-lg';
  const cardNotHovered = 'relative overflow-hidden w-[250px] h-[360px] bg-white rounded-lg border-stroke-light-blue border-[1px]';

  return (
    <div
      className={isEnetered ? 'relative z-30 w-[270px] pt-1 h-min-[524px] grid justify-center items-start' : 'relative z-3 w-[270px] h-min-[524px] grid justify-center items-start pt-1'}
      onMouseEnter={() => handleMouseEnter()}
      onMouseLeave={() => handleMouseEnter()}
    >
      <div
        className="
          relative
          p-top-1
          z-10
          flex
          flex-col
          gap-1
          w-[250px]
          rounded-lg
        "
      >
        <div className="group absolute top-3 right-3 z-40 cursor-pointer hover:scale-110 transition transition-duration-150">
          <svg
            width="19"
            height="17"
            viewBox="0 0 19 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.7909 2.20317C18.349 3.75365 18.4087 6.24853 16.9265 7.871L9.4995 16L2.07351 7.87097C0.591288 6.24851 0.650981 3.75359 2.20908 2.20312C3.9488 0.471924 6.81398 0.630117 8.35093 2.5419L9.50001 3.97068L10.6481 2.54174C12.1851 0.629955 15.0512 0.471979 16.7909 2.20317Z"
              stroke="#2D2D2D"
              className="group-hover:stroke-[#EC4D37]"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <Link href={`/item/${itemID}`}>
          <div
            style={{
              backgroundImage: `url(${img})`, backgroundSize: '75%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center',
            }}
            className={isEnetered ? cardHovered : cardNotHovered}
          >
            <span className={
            itemID === 1
              ? 'block absolute bottom-0 left-0 w-max bg-[#EC4D37] text-white text-xs px-2'
              : 'block absolute bottom-0 left-0 w-max bg-black text-white text-xs px-2'
            }
            >
              {
              itemID === 1 ? '-25%' : itemID === 2 ? '-10%' : ''
            }

            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <p className={itemID === 1 || itemID === 2 ? 'line-through text-sm' : 'text-base'}>{`$${price}`}</p>
            {
            (itemID === 1 || itemID === 2)
            && (
              <p className={itemID === 1 ? 'font-bold text-[#EC4D37]' : itemID === 2 ? 'font-bold' : ''}>
                $
                {
                  itemID === 1 ? Math.round((price - (price * 0.25)) * 100) / 100 : itemID === 2 ? Math.round((price - (price * 0.1)) * 100) / 100 : ''
                }
              </p>
            )
          }
          </div>
          <p className="font-bold truncate">{title}</p>
        </Link>
        <Link
          href={`/category/${category}`}
          className="bg-none outline-none"
        >
          <p className="text-sm text-link-blue hover:text-icon-blue">{category}</p>
        </Link>
      </div>
      <div
        className={
        isEnetered
          ? 'absolute drop-shadow-lg z-1 border-stroke-light-blue border-[1px] rounded-lg h-[524px] w-full bg-white'
          : 'absolute top-0 h-full w-full hidden'
        }
      >
        {isEnetered && (
          <div className="flex flex-col justify-end h-full p-2">
            <button
              type="button"
              className="flex justify-center items-center w-full py-3 px-3 bg-[#2D2D2D] text-white rounded-lg hover:bg-[#555555]"
            >
              <Image
                as={NextImage}
                src="/cart-white.svg"
                width={16}
                height={16}
                alt="cart icon"
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
