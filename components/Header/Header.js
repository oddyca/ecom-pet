'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Navbar, NavbarBrand, NavbarContent, NavbarItem, Button,
} from '@nextui-org/react';

import HeaderCategories from '../HeaderCategories/HeaderCategories';
import ItemsInCart from './ItemsInCart';
import ItemsInFav from './ItemsInFav';
import Notifications from './Notifications';
import ProfilePopover from './ProfilePopover';

export default function Header() {
  return (
    <header className="flex flex-col items-center h-[175px] w-full pt-6">
      <div
        className="grid grid-cols-3 h-full w-full max-w-[1440px] px-3"
      >
        <div />
        <div className="grid place-items-center">
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
          <ul className="flex items-center justify-end gap-6 w-auto">
            <li className="relative">
              <Link
                href="/cart"
                className="w-auto h-auto flex gap-2"
              >
                <Image
                  src="/cart.svg"
                  alt="cart icon"
                  width={16}
                  height={16}
                />
                <span className="text-icon-blue">Cart</span>
              </Link>
              <ItemsInCart />
            </li>
            <li className="relative">
              <Link
                href="/favorites"
                className="w-auto h-auto flex gap-2"
              >
                <Image
                  src="/fav-nav.svg"
                  alt="favorites icon"
                  width={16}
                  height={16}
                />
                <span className="text-icon-blue">Favorites</span>
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
