'use client';

import React, { useState, useEffect } from 'react';
import { Button, Image, Link } from '@nextui-org/react';
import useStore from '../../controller/store/store';

import ChangePassword from './ChangePassword/ChangePassword';
import PasswordIcon from './ChangePassword/PasswordIcon';
import ChangeName from './ChangeName/ChangeName';
import UserIcon from './ChangeName/UserIcon';

export default function Settings() {
  const [wasSigned, setWasSigned] = useState(null);
  const [tab, setTab] = useState('name');

  useEffect(() => {
    const isLogged = localStorage.getItem('isLogged');
    const wasSignedUp = isLogged.includes('signup-');

    if (wasSignedUp) {
      setWasSigned(true);
    } else {
      setTab('password');
    }
  }, []);

  const {
    resetCart, resetIsLogged, resetFavs,
  } = useStore();

  const logOut = () => {
    resetCart();
    resetIsLogged();
    resetFavs();
    localStorage.removeItem('isLogged');
    localStorage.removeItem('cartMap');
  };

  return (
    <main className="flex min-h-[666px] w-full relative flex-col items-center justify-center p-3">
      <div className="flex gap-10 w-full max-w-[1440px] py-6 min-h-[666px] h-full">
        <div className="flex flex-col gap-8 shrink-0">
          <h3 className="text-lg text-black">Settings</h3>
          <div className="flex flex-col gap-4">
            {wasSigned && (
              <Button
                color="default"
                variant={tab === 'name' ? 'flat' : 'light'}
                value="name"
                startContent={<UserIcon />}
                className="flex justify-start"
                onPress={(e) => setTab(e.target.value)}
              >
                Change name
              </Button>
            )}
            <Button
              color="default"
              variant={tab === 'name' ? 'light' : 'flat'}
              value="password"
              startContent={<PasswordIcon />}
              className="flex justify-start"
              onPress={(e) => setTab(e.target.value)}
            >
              Change password
            </Button>
            <div className="mt-3 py-3 flex">
              <div className="w-auto flex justify-center items-center px-3">
                <Image
                  src="/signout.svg"
                  alt="signout icon"
                  width={20}
                  height={20}
                  radius="none"
                />
              </div>
              <Link
                href="/"
                className="text-black text-sm hover:text-link-blue"
                onClick={() => logOut()}
              >
                Sign out
              </Link>
            </div>
          </div>
        </div>
        <div className="ml-10 flex flex-col gap-4 w-full h-fit">
          {
            tab === 'name' ? (
              <>
                <h3 className="text-xl font-bold">Change your display name</h3>
                <ChangeName />
              </>
            ) : (
              <>
                <h3 className="text-xl font-bold">Change your password</h3>
                <ChangePassword />
              </>
            )
          }
        </div>
      </div>
    </main>
  );
}
