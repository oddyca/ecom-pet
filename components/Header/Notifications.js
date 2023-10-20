'use client';

import React, { useState } from 'react';
import {
  Popover, PopoverTrigger, PopoverContent,
} from '@nextui-org/react';
import Image from 'next/image';

export default function Notifications() {
  const [hasOpened, setHasOpened] = useState(false);

  return (
    <>
      {!hasOpened && <div className="absolute rounded-full grid place-items-center top-[-.25rem] right-[-.25rem] bg-red text-white text-sm h-5 w-5">2</div>}
      <Popover
        placement="bottom"
        showArrow
      >
        <PopoverTrigger>
          <button
            type="button"
            className="w-[40px] h-[40px] rounded-full bg-white border-2 border-stroke-blue grid place-content-center"
            onClick={() => setHasOpened(true)}
          >
            <Image
              src="/bell-icon.svg"
              alt="notifications icon"
              width={16}
              height={16}
            />
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="px-1 py-2 divide-y-1">
            <div className="py-1 border-bottom">
              <div className="text-tiny text-icon-blue">
                New Promocode
                (10% off)
              </div>
              <div className="font-bold text-lg">QUICK10</div>
            </div>
            <div className="py-1 border-bottom">
              <div className="text-tiny text-icon-blue">
                New Promocode
                (5% off)
              </div>
              <div className="font-bold text-lg">QUICK5</div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>

  );
}
