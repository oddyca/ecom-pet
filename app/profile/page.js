'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import useStore from '../../controller/store/store';

import PurchaseHistoryCards from './PurchaseHistory/PurchaseHistoryCards';

export default function Profile() {
  const [loggedUser, setLoggedUser] = useState('');
  const [cartSize, setCartSize] = useState(0);

  const router = useRouter();

  const {
    resetCart, resetIsLogged, resetFavs, cart, favorites,
  } = useStore();

  const logOut = () => {
    resetCart();
    resetIsLogged();
    resetFavs();
    localStorage.removeItem('isLogged');
    localStorage.removeItem('cartMap');
  };

  useEffect(() => {
    const loggedUsername = localStorage.getItem('isLogged');
    if (!loggedUsername) {
      router.push('/signin');
    }
    const wasSignedUp = loggedUsername.includes('signup-') ? loggedUsername.slice(7) : loggedUsername;
    const cartItemsIds = [...cart.keys()];
    const calcCartSize = cartItemsIds.reduce((sum, current) => sum + cart.get(current).quantity, 0);
    setCartSize(calcCartSize);
    setLoggedUser(wasSignedUp);
  }, []);

  return (
    <>
      <Breadcrumbs
        misc="Profile"
      />
      <main className="flex min-h-[666px] w-full relative flex-col items-center justify-center p-3">
        <div className="flex gap-10 w-full max-w-[1440px] py-6 min-h-[666px] h-full">
          <div className="flex flex-col gap-8 shrink-0">
            <p>{`Logged as ${loggedUser}`}</p>
            <div className="flex flex-col gap-3">
              <div className="flex gap-4">
                <div className="w-auto flex justify-center items-center">
                  <Image
                    src="/cart.svg"
                    width={16}
                    height={16}
                    alt="cart icon"
                  />
                </div>
                <Link
                  href="cart"
                  className="hover:text-link-blue"
                >
                  My cart
                  <span className="text-icon-blue ml-1 text-xs">
                    {`${cartSize} ${cartSize !== 1 ? 'items' : 'item'}`}
                  </span>
                </Link>
              </div>
              <div className="flex gap-4">
                <div className="w-auto flex justify-center items-center">
                  <Image
                    src="/fav-nav.svg"
                    width={16}
                    height={16}
                    alt="favorite icon"
                  />
                </div>
                <Link
                  href="/favorites"
                  className="hover:text-link-blue"
                >
                  My favorites
                  <span className="text-icon-blue ml-1 text-xs">
                    {`${favorites.size} ${favorites.size !== 1 ? 'items' : 'item'}`}
                  </span>
                </Link>
              </div>
              <div className="divide-y-1">
                <div className="flex gap-4">
                  <div className="w-auto flex justify-center items-center">
                    <Image
                      src="/settings.svg"
                      width={16}
                      height={16}
                      alt="settings icon"
                    />
                  </div>
                  <Link
                    href="/settings"
                    className="hover:text-link-blue"
                  >
                    Settings
                  </Link>
                </div>
                <div className="mt-3 py-3 flex gap-4">
                  <div className="w-auto flex justify-center items-center">
                    <Image
                      src="/signout.svg"
                      alt="signout icon"
                      width={14}
                      height={14}
                      className="stroke-black"
                    />
                  </div>
                  <Link
                    href="/"
                    className="hover:text-link-blue"
                    onClick={() => logOut()}
                  >
                    Sign out
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="ml-10 flex flex-col gap-4 w-full h-fit">
            <h3 className="text-xl font-bold">Purchase history</h3>
            <PurchaseHistoryCards />
          </div>
        </div>
      </main>
    </>
  );
}
