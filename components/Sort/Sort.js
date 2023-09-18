'use client';

import React from 'react';
import { Select, SelectItem, Image } from '@nextui-org/react';
import NextImage from 'next/image';

export default function Sort() {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Select
        label="Sort by price"
        className="max-w-xs"
        variant="bordered"
        color="white"
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
        >
          Low to low
        </SelectItem>
      </Select>
    </div>
  );
}
