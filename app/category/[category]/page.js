import React from 'react';
import Banners from '../../../components/Banners/Banners';
import Sort from '../../../components/Sort/Sort';
import Search from '../../../components/Search/Search';
import Items from '../../../components/Items/Items';
import { getIntoCategory } from '../../../controller/controller';

export default async function page({ params }) {
  const fetchedProducts = await getIntoCategory(params.category);
  return (
    <>
      <Banners />
      <main className="flex min-h w-full relative flex-col items-center justify-center p-3">
        <div className="w-full max-w-[1440px] flex flex-col gap-4">
          <Search />
          <Sort />
          <Items fetchedProducts={fetchedProducts} />
        </div>
      </main>
    </>
  );
}
