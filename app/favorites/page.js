import React from 'react';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import FavCards from './FavCards/FavCards';

export default function Favorites() {
  return (
    <>
      <Breadcrumbs
        misc="Favorites"
      />
      <main className="flex min-h w-full relative flex-col items-center justify-center p-5 mt-3">
        <div className="w-full max-w-[1440px] min-h-[666px] flex flex-col gap-4">
          <h1 className="text-2xl font-bold">My favorites</h1>
          <FavCards />
        </div>
      </main>
    </>
  );
}
