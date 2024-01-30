'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import HeaderCategories from '../HeaderCategories/HeaderCategories';
import ItemsInCart from './Components/ItemsInCart';
import ItemsInFav from './Components/ItemsInFav';
import Notifications from './Components/Notifications';
import ProfilePopover from './Components/ProfilePopover';

export default function Header() {
  return (
    <header className="flex flex-col items-center h-[175px] w-full pt-6">
      <div
        className="grid grid-cols-3 gap-3 md:gap-0 h-full w-full max-w-[1440px] px-1 md:px-3"
      >
        <div className="col-start-2 grid place-items-center sm:self-left">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="logo image"
              width={100}
              height={90}
            />
          </Link>
        </div>
        <div className="flex justify-end">
          <ul className="flex items-center justify-end gap-4 md:gap-6">
            <li className="relative w-fit h-fit p-0">
              <Link
                href="/cart"
                className="w-auto h-[20px] flex gap-2"
              >
                <Image
                  src="/cart.svg"
                  alt="cart icon"
                  width={16}
                  height={16}
                />
                <span className="text-icon-blue lg:block hidden">Cart</span>
              </Link>
              <ItemsInCart />
            </li>
            <li className="relative p-0">
              <Link
                href="/favorites"
                className="w-auto h-[20px] flex gap-2"
              >
                <Image
                  src="/fav-nav.svg"
                  alt="favorites icon"
                  width={16}
                  height={16}
                />
                <span className="text-icon-blue lg:block hidden">Favorites</span>
              </Link>
              <ItemsInFav />
            </li>
            <li className="relative">
              <Notifications />
            </li>
            <li>
              <ProfilePopover />
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-center items-center gap-[200px] h-max w-full bg-[#FFFFFF] border-stroke-blue border-t-2">
        <HeaderCategories />
      </div>
    </header>
  );
}
