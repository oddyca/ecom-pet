'use client';

import React from 'react';
import { Select, SelectItem, Image } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import NextImage from 'next/image';

export default function Sort() {
  const router = useRouter();

  const handleUpdateParams = (sortDirection) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('sort', `${sortDirection}`);

    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
    router.push(newPathname, { scroll: false });
  };

  return (
    <div className="sort-light flex w-full flex-wrap md:flex-nowrap gap-4">
      <Select
        label="Sort by price"
        className="max-w-xs"
        variant="faded"
        color="primary"
      >
        <SelectItem
          key="descending"
          startContent={(
            <Image
              as={NextImage}
              src="/desc.svg"
              alt="descending icon"
              width={19}
              height={14}
              radius="none"
            />
          )}
          onClick={() => handleUpdateParams('desc')}
        >
          High to low
        </SelectItem>
        <SelectItem
          key="ascending"
          startContent={(
            <Image
              as={NextImage}
              src="/asc.svg"
              alt="ascending icon"
              width={19}
              height={14}
              radius="none"
            />
          )}
          onClick={() => handleUpdateParams('asc')}
        >
          Low to low
        </SelectItem>
      </Select>
    </div>
  );
}
