'use client';

import React, { useState } from 'react';

export default function Descritption({ reviews, description }) {
  const [openDesc, setOpenDesc] = useState(true);

  return (
    <div className="flex flex-col gap-2 items-center w-full max-w-[1440px]">
      <div className="w-full flex justify-center gap-5">
        <button
          type="button"
          className={openDesc ? 'font-bold' : ''}
          onClick={() => setOpenDesc(!openDesc)}
        >
          Descritption
        </button>
        <button
          type="button"
          className={!openDesc ? 'font-bold' : ''}
          onClick={() => setOpenDesc(!openDesc)}
        >
          Reviews
          {' '}
          <span className="text-icon-blue text-sm">
            (
            {reviews}
            )
          </span>
        </button>
      </div>
      <div className="flex justify-center items-center border-y-2 py-5 w-full">
        {
          openDesc
            ? (
              <>
                { description }
              </>
            )
            : (
              <div>Reviews</div>
            )
        }
      </div>
    </div>
  );
}
