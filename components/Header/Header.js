'use client';

import React from 'react';
import Image from 'next/image';

export default function Header({ categoriesToRender }) {
  const renderCategoriers = () => (
    <ul className="w-max h-max grid grid-cols-4">
      {categoriesToRender.map((category) => (
        <li
          key={category}
          className="hover:bg-[#F5F5F5] py-2 px-[5rem] cursor-pointer text-center"
        >
          { category }
        </li>
      ))}
    </ul>

  );

  return (
    <header className="flex flex-col items-center h-[175px] w-full pt-6">
      <div
        className="grid grid-cols-3 h-full w-full max-w-[1440px] px-3"
      >
        <div />
        <div className="grid place-items-center">
          <Image
            src="/logo.svg"
            alt="logo image"
            width={100}
            height={90}
          />
        </div>
        <div className="flex justify-end">
          <ul className="flex items-center justify-end gap-6 w-auto">
            <li>
              <a
                href="#"
                className="w-auto h-auto flex gap-2"
              >
                <Image
                  src="/cart.svg"
                  alt="cart icon"
                  width={16}
                  height={16}
                />
                <span className="text-icon-blue">Cart</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="w-auto h-auto flex gap-2"
              >
                <Image
                  src="/fav-nav.svg"
                  alt="favorites icon"
                  width={16}
                  height={16}
                />
                <span className="text-icon-blue">Favorites</span>
              </a>
            </li>
            <li>
              <button
                type="button"
                className="w-[40px] h-[40px] rounded-full bg-white border-2 border-stroke-blue grid place-content-center"
              >
                <Image
                  src="/bell-icon.svg"
                  alt="notifications icon"
                  width={16}
                  height={16}
                />
              </button>
            </li>
            <li>
              <button
                type="button"
                className="w-[40px] h-[40px] rounded-full bg-white border-2 border-stroke-blue grid place-content-center"
              >
                <Image
                  src="/profile-icon.svg"
                  alt="profile icon"
                  width={16}
                  height={16}
                />
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-center items-center gap-[200px] h-max w-full bg-[#FFFFFF] border-stroke-blue border-t-2">
        { renderCategoriers() }
      </div>
    </header>
  );
}
