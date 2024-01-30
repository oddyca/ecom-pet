'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoadMore() {
  const router = useRouter();
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    if (searchParams.has('limit')) {
      setIsFullyLoaded(true);
    }
  }, []);

  const handleClick = () => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('limit', 20);
    setIsFullyLoaded(true);

    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
    router.push(newPathname, { scroll: false });
  };

  return (
    <>
      {!isFullyLoaded
      && (
      <button
        className="border-2 border-black px-3 py-2 w-max self-center mt-5 hover:border-[#555555] active:bg-[#2D2D2D] active:text-white"
        type="button"
        onClick={handleClick}
      >
        LOAD MORE
      </button>
      )}
    </>
  );
}
