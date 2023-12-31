import Link from 'next/link';
import React from 'react';

export default function NotFound() {
  return (
    <main className="text-center min-h-[666px] flex flex-col items-center justify-center gap-4 p-3">
      <h1 className="text-5xl text-icon-blue font-bold">Oops!</h1>
      <h2 className="text-xl text-black">404 | The page not found</h2>
      <p className="text-black">
        Return to
        {' '}
        <Link
          href="/"
          className="text-link-blue hover:text-icon-blue"
        >
          main page
        </Link>
      </p>
    </main>
  );
}
