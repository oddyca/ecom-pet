import React from 'react';

import Header from '../components/Header/Header';
import Banners from '../components/Banners/Banners';
import Search from '../components/Search/Search';

import { getAllCategories } from '../controller/controller';

export default async function Home() {
  const renderAllCategories = async () => {
    const fetchedCategories = await getAllCategories();

    const allCategories = fetchedCategories.map((elem, id) => (
      <a href="#" key={id}>{elem}</a> // on click - fetch request (by creating new pathname and pusing through router hook from next/navigation) and scroll
    )).reverse();

    return (<>{ allCategories }</>);
  };

  const categoriesToRender = await renderAllCategories();

  return (
    <>
      <Header categoriesToRender={categoriesToRender} />
      <Banners />
      <main className="flex min-h max-w-[1440px] relative flex-col items-center justify-between p-3">
        <div className="z-10 max-w-5xl w-full items-center justify-between text-sm lg:flex">
          <Search />
        </div>
      </main>
    </>

  );
}
