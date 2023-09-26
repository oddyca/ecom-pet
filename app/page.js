import React from 'react';

import Search from '../components/Search/Search';
import Items from '../components/Items/Items';
import LoadMore from '../components/LoadMore/LoadMore';
import Sort from '../components/Sort/Sort';
import { getAllProducts } from '../controller/controller';

export default async function Home({ searchParams }) {
  const fetchedProducts = await getAllProducts({
    ...searchParams,
    limit: searchParams.limit || 10,
  });

  return (
    <>
      <Search />
      <Sort />
      <Items fetchedProducts={fetchedProducts} />
      <LoadMore limit={searchParams.limit} />
    </>
  );
}
