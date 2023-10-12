import React from 'react';

export default function LoadingPage() {
  return (
    <main className="flex flex-col gap-7 h-full w-full relative items-center mt-6">
      <div className="w-full max-w-[1440px] min-h-[600px] h-full flex justify-center items-center gap-4">
        <div className="flex gap-2 text-black">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </div>
      </div>
    </main>
  );
}
