import React from 'react';
import Link from 'next/link';

export default function Breadcrumbs({ itemCategory, itemName, itemId }) {
  return (
    <div className="flex justify-start gap-[4rem] w-full h-fit mt-6 py-2 px-[5rem] bg-stroke-light-blue text-link-blue text-sm">
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
    </div>
  );
}
