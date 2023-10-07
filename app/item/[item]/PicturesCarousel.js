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
    <div className="flex flex-col gap-2 items-center flex-1 max-w-[666px] h-full max-h-[666px]">
      <div
        className="flex w-full h-[400px] relative overflow-hidden bg-white border-2 border-stroke-light-blue rounded-lg"
        ref={emblaMainRef}
      >
        <div className="flex w-full h-full">
          {slides}
        </div>
      </div>
      <div
        className="flex w-full"
        ref={emblaThumbsRef}
      >
        <div className="flex gap-2 w-full">
          {slides.map((img, index) => (
            <Thumb
              onClick={() => onThumbClick(index)}
              selected={index === selectedIndex}
              index={index}
              img={img}
              key={slidesAngles[index]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
