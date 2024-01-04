'use client';

import React, { useEffect } from 'react';
import useStore from '../../controller/store/store';
import { replaceFavsInLocalStorage } from '../../controller/clientController';

export default function ItemsInFav() {
  const { favorites } = useStore();

  useEffect(() => {
    replaceFavsInLocalStorage(favorites);
  }, [favorites]);

  return (
    <>
      {favorites.size !== 0 && <div className="absolute rounded-full grid place-items-center top-[-.75rem] right-[-1rem] bg-black text-white text-sm h-5 w-5">{favorites.size <= 9 ? favorites.size : '9+'}</div>}
    </>
  );
}
