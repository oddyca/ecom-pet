import React from 'react';
import Sort from '../../../components/Sort/Sort';
import Search from '../../../components/Search/Search';
import Items from '../../../components/Items/Items';
import { getIntoCategory } from '../../../controller/controller';
// IF ![...categories].includes(param) => 404
export default async function page({ params }) {
  const fetchedProducts = await getIntoCategory(params.category);
  return (
    <>
      <Search />
      <Sort />
      <Items fetchedProducts={fetchedProducts} />
    </>
  );
}
