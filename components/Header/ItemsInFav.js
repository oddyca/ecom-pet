'use client';

import React from 'react';
import useStore from '../../controller/store/store';

export default function ItemsInFav() {
  const { favorites } = useStore();
  return (
    <>
      {favorites.size !== 0 && <div className="absolute rounded-full grid place-items-center top-[-.75rem] right-[-1rem] bg-black text-white text-sm h-5 w-5">{favorites.size <= 9 ? favorites.size : '9+'}</div>}
    </>
  );
}
