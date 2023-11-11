'use client';

import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';

export default function Profile() {
  useEffect(() => {
    // const userID = localStorage.getItem('')
  }, []);

  return (
    <>
      <Breadcrumbs
        itemCategory="Profile"
      />
      <main className="flex min-h-[666px] w-full relative flex-col items-center justify-center p-3">
        <div className="w-full max-w-[1440px] flex justify-center items-center gap-4">
          Profile
        </div>
      </main>
    </>
  );
}
