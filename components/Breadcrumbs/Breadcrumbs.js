import React from 'react';
import Link from 'next/link';

export default function Breadcrumbs({
  itemCategory, itemName, itemId, misc,
}) {
  return (
    <div className="flex justify-start items-center lg:gap-[4rem] gap-6 w-full h-fit mt-6 py-2 lg:px-[5rem] px-8 bg-stroke-light-blue text-link-blue text-md lg:text-sm">
      <Link
        href="/"
        className="hover:text-icon-blue"
      >
        Home
      </Link>
      {itemCategory && (
        <>
          <span>/</span>
          <Link
            href={`/category/${itemCategory}`}
            className="hover:text-icon-blue"
          >
            {itemCategory}
          </Link>
        </>
      )}
      {itemId && (
        <>
          <span>/</span>
          <Link
            href={`/item/${itemId}`}
            className="text-red"
          >
            {itemName}
          </Link>
        </>
      )}
      {misc && (
        <>
          <span>/</span>
          <Link
            href={`/${misc.toLowerCase()}`}
            className="hover:text-icon-blue"
          >
            {misc}
          </Link>
        </>
      )}
    </div>
  );
}
