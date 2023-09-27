'use client';

import React from 'react';
import Link from 'next/link';

export default function HeaderCategories({ categoriesToRender }) {
  const renderCategoriers = () => (
    <ul className="w-max h-max grid grid-cols-4">
      {categoriesToRender.map((category) => (
        <li
          key={category}
          className="hover:bg-[#F5F5F5] py-2 px-[5rem] cursor-pointer text-center"
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
    <div>{renderCategoriers()}</div>
  );
}
