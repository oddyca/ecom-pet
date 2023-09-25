import React from 'react';

import Header from '../components/Header/Header';
import Banners from '../components/Banners/Banners';
import Search from '../components/Search/Search';
import Items from '../components/Items/Items';
import LoadMore from '../components/LoadMore/LoadMore';

import { getAllProducts, getAllCategories } from '../controller/controller';
import Sort from '../components/Sort/Sort';

export default async function Home({ searchParams }) {
  const fetchedProducts = await getAllProducts({
    ...searchParams,
    limit: searchParams.limit || 10,
  });
  const renderAllCategories = async () => {
    const fetchedCategories = await getAllCategories();
    const allCategories = fetchedCategories.reverse();

    return (<>{ allCategories }</>);
  };

  const categoriesToRender = await renderAllCategories();

  return (
    <>
      <Header categoriesToRender={categoriesToRender} />
      <Banners />
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
