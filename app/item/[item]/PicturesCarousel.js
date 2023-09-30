'use client';

import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

import Thumb from './Thumb';

export default function PicturesCarousel({ fetchedImage }) {
  const slidesAngles = [0, 90, 180, 270];

  const slides = slidesAngles.map((angle) => (
    <div
      className="h-full w-full flex-embla"
    >
      <div
        className="h-full w-full"
        style={{
          backgroundImage: `url(${fetchedImage})`, backgroundSize: '35%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', transform: `rotate(${angle}deg)`,
        }}
      />
    </div>
  ));

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel();
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
    watchDrag: false,
  });

  const onThumbClick = useCallback(
    (index) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on('select', onSelect);
    emblaMainApi.on('reInit', onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className="flex flex-col items-center flex-1 w-full h-full max-h-[666px]">
      <div
        className="flex w-full h-full relative overflow-hidden bg-white border-2 border-icon-blue"
        ref={emblaMainRef}
      >
        <div className="flex w-full h-full">
          {slides}
        </div>
      </div>

      <div
        className="flex"
        ref={emblaThumbsRef}
      >
        <div className="flex THUMB">
          {slides.map((img, index) => (
            <Thumb
              onClick={() => onThumbClick(index)}
              selected={index === selectedIndex}
              index={index}
              img={img}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
