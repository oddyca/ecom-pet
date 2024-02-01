import React from 'react';
import Link from 'next/link';
import { getAllCategories } from '../../controller/serverController';

export default async function HeaderCategories() {
  const allCategories = async () => {
    const fetchedCategories = await getAllCategories();
    const categoriesArr = fetchedCategories.reverse();

    return categoriesArr;
  };

  const categoriesToRender = await allCategories();

  const renderCategoriers = () => (
    <ul className="w-fit h-fit grid grid-cols-2 gap-2 sm:gap-0 sm:grid-cols-4 lg:grid-cols-4">
      {categoriesToRender.map((category) => (
        <li
          key={category}
          className="hover:bg-[#F5F5F5] py-2 px-1 lg:px-[5rem] sm:px-3 cursor-pointer text-start sm:text-center"
        >
          <Link
            href={`/category/${category}`}
            className="bg-none outline-none"
          >
            { category }
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <div>
      {categoriesToRender && renderCategoriers()}
    </div>
  );
}
