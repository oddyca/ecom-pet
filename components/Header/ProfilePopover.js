'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Popover, PopoverTrigger, PopoverContent,
} from '@nextui-org/react';
import useStore from '../../controller/store/store';

export default function ProfilePopover() {
  const [isLoggedLS, setISLoggedLS] = useState('');

  useEffect(() => {
    const isLogged = localStorage.getItem('isLogged');
    setISLoggedLS(isLogged);
  }, []);

  const { resetCart, isLogged, resetIsLogged } = useStore();

  const logOut = () => {
    resetCart();
    resetIsLogged();
    localStorage.removeItem('isLogged');
  };

  return (
    <Popover
      placement="bottom"
      className="px-0 overflow-hidden"
      showArrow
    >
      <PopoverTrigger>
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
      </PopoverTrigger>
      <PopoverContent>
        <div className="divide-y-1">
          <Link
            href={isLoggedLS || isLogged ? '/profile' : '/signin'}
            className="flex gap-4 px-6 py-2 hover:bg-[#F0F0F0]"
          >
            <Image
              src="/profile-icon.svg"
              alt="profile icon"
              width={12}
              height={12}
              className="stroke-black"
            />
            My profile
          </Link>
          <Link
            href="/settings"
            className="flex gap-4 px-6 py-2 hover:bg-[#F0F0F0]"
          >
            <Image
              src="/settings.svg"
              alt="settings icon"
              width={14}
              height={14}
              className="stroke-black"
            />
            Settings
          </Link>
          {(isLoggedLS || isLogged) && (
            <Link
              href="/"
              className="flex gap-4 px-6 py-2 hover:bg-[#F0F0F0]"
              onClick={() => logOut()}
            >
              <Image
                src="/signout.svg"
                alt="signout icon"
                width={14}
                height={14}
                className="stroke-black"
              />
              Sign out
            </Link>
          )}
          <Link
            href="/info"
            className="flex gap-4 px-6 py-2 hover:bg-[#F0F0F0] text-link-blue"
          >
            <Image
              src="/info.svg"
              alt="info icon"
              width={14}
              height={14}
              className="stroke-black"
            />
            Please note
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}
