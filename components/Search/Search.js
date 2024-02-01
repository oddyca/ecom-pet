'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Search() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete('limit');
    searchParams.set('search', searchValue);

    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
    router.push(newPathname, { scroll: false });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-3 w-full outline-none"
    >
      <div className="relative flex items-center text-stroke-light-blue focus-within:stroke-icon-blue focus-within:text-icon-blue">
        <svg
          className="w-4 h-4 fill-none stroke-current absolute ml-3 "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m13 13 6 6M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14Z"
          />
        </svg>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="outline-none w-full py-[10px] px-[36px] border-none bg-white ring-2 ring-stroke-blue focus:ring-icon-blue rounded-[10px]"
          type="text"
          placeholder="Search items"
        />
      </div>
    </form>
  );
}
