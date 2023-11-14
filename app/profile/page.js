'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';

export default function Profile() {
  const [loggedUser, setLoggedUser] = useState('');
  const router = useRouter();

  useEffect(() => {
    const loggedUsername = localStorage.getItem('isLogged');
    if (!loggedUsername) {
      router.push('/signin');
      return;
    }
    const wasSignedUp = loggedUsername.includes('signup-') ? loggedUsername.slice(7) : loggedUsername;

    setLoggedUser(wasSignedUp);
  }, []);

  return (
    <>
      <Breadcrumbs
        itemCategory="Profile"
      />
      <main className="flex min-h-[666px] w-full relative flex-col items-center justify-center p-3">
        <div className="w-full max-w-[1440px] flex justify-center items-center gap-4">
          Logged as
          {' '}
          {loggedUser}
        </div>
      </main>
    </>
  );
}
