'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

export default function Banners() {
  const autoplayOptions = { delay: 5000, rootNode: (emblaRoot) => emblaRoot.parentElement };
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay(autoplayOptions)]);

  return (
    <div
      className="overflow-hidden w-wull h-[402px]"
      ref={emblaRef}
    >
      <div className="flex h-full embla__container">
        <div className="flex-embla min-w-0 w-full h-[402px] bg-[url('/banner-1.png')] bg-center" />
        <div className="flex-embla min-w-0 w-full h-[402px] bg-[url('/banner-2.png')] bg-center" />
      </div>
    </div>
  );
}
