'use client';

import React, { useEffect, useState, useRef } from 'react';
import { getUserData, getAllUsers } from '../../controller/controller';

import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';

export default function Profile() {
  const [loggedUser, setLoggedUser] = useState('');
  const allUsersData = useRef(null);

  useEffect(() => {
    async function fetchAllUsers() {
      const fetchedData = await getAllUsers();
      allUsersData.current = fetchedData;
    }

    async function fetchData() {
      await fetchAllUsers();

      const signUpIDs = Object.keys(localStorage).filter((key) => key.includes('signup'));
      const loggedUsername = localStorage.getItem('isLogged');
      const signedUpIndex = loggedUsername.includes('signup-') ? signUpIDs.indexOf(`signup-${loggedUsername}`) : -1;

      if (signedUpIndex !== -1) {
        setLoggedUser(loggedUsername.slice(7));
      } else {
        setLoggedUser(loggedUsername);
      }
    }

    fetchData();
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
