import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <div className="w-full py-5 px-3 bg-white border-t-2 border-stroke-light-blue flex justify-center mt-5">
      <div className="w-full max-w-[1440px] flex justify-between items-center">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="logo image"
            width={100}
            height={90}
          />
        </Link>
        <div className="flex gap-3">
          <Link
            href="https://www.linkedin.com/in/siarhei-prakapovich-511466213/"
            target="_blank"
            className="hover:scale-125 duration-100"
          >
            <Image
              src="/linkedin.svg"
              width={24}
              height={24}
              alt="linkedin logo"
            />
          </Link>
          <Link
            href="https://t.me/emilsin"
            target="_blank"
            className="hover:scale-125 duration-100"
          >
            <Image
              src="/telegram.svg"
              width={24}
              height={24}
              alt="telegram logo"
            />
          </Link>
          <Link
            href="https://github.com/oddyca"
            target="_blank"
            className="hover:scale-125 duration-100"
          >
            <Image
              src="/github.svg"
              width={24}
              height={24}
              alt="github logo"
            />
          </Link>
        </div>
        <p className="text-small text-icon-blue">© 2023</p>
      </div>
    </div>
  );
}
