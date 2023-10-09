'use client';

import React from 'react';
import AddToCart from '../../../../../components/AddToCart/AddToCart';
import AddToFavorite from '../../../../../components/AddToFavorite/AddToFavorite';
import PickSize from '../PickSize/PickSize';

export default function Form({ fetchedInfo }) {
  return (
    <form className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        { (fetchedInfo.category === "men's clothing" || fetchedInfo.category === "women's clothing")
          && (
            <div className="flex items-center gap-2">
              <PickSize />
            </div>
          )}
      </div>
      <div className="flex gap-3 items-center max-w-[390px]">
        <AddToCart id={fetchedInfo.id} />
        <div className="flex-1 rounded-lg border-2 border-[#2D2D2D] group">
          <AddToFavorite />
        </div>
      </div>
    </form>
  );
}
