import React from 'react';

export default function Page() {
  return (
    <main className="flex min-h w-full relative flex-col items-center justify-center p-5 mt-3">
      <div className="w-full max-w-[1440px] min-h-[666px] grid">
        <div className="h-full w-full flex justify-center items-center">
          <h1 className="text-5xl font-bold">Please note</h1>
        </div>
        <div className="h-full w-full flex justify-center items-start">
          {/* eslint-disable-next-line max-len */}
          <p className="max-w-[50%]">This is a mock e-commerce project for learning purposes, and any information provided here is for demonstration only and does not represent real accounts, orders, or payment details.</p>
        </div>
      </div>
    </main>
  );
}
