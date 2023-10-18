'use client';

import React from 'react';
import useStore from '../../controller/store/store';

export default function AddToFavorite({ id }) {
  const { addToFavs, favorites } = useStore();
  return (
    <>
      <button
        type="button"
        className="flex justify-center items-center w-full py-3 px-3 group cursor-pointer hover:scale-110 transition transition-duration-150"
        onClick={(e) => {
          e.preventDefault();
          addToFavs(id);
        }}
      >
        <svg
          width="19"
          height="17"
          viewBox="0 0 19 17"
          fill={favorites.has(id) ? '#EC4D37' : 'none'}
        >
          <path
            d="M16.7909 2.20317C18.349 3.75365 18.4087 6.24853 16.9265 7.871L9.4995 16L2.07351 7.87097C0.591288 6.24851 0.650981 3.75359 2.20908 2.20312C3.9488 0.471924 6.81398 0.630117 8.35093 2.5419L9.50001 3.97068L10.6481 2.54174C12.1851 0.629955 15.0512 0.471979 16.7909 2.20317Z"
            stroke={favorites.has(id) ? '#EC4D37' : '#2D2D2D'}
            className="group-hover:stroke-[#EC4D37]"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      </button>
    </>
  );
}
