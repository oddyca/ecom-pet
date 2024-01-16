import React from 'react';

import Search from '../components/Search/Search';
import Items from '../components/Items/Items';
import LoadMore from '../components/LoadMore/LoadMore';
import Sort from '../components/Sort/Sort';
import { getAllProducts } from '../controller/serverController';

export default async function Home({ searchParams }) {
  const fetchedProducts = await getAllProducts({
    ...searchParams,
    limit: searchParams.limit || 10,
  });

  return (
    <>
      <main className="flex min-h w-full relative flex-col items-center justify-center p-3">
        <div className="w-full max-w-[1440px] flex flex-col gap-4">
          <Search />
          <Sort />
          <Items fetchedProducts={fetchedProducts} />
          <LoadMore limit={searchParams.limit} />
        </div>
      </main>
    </>
  );
}
