import React from 'react';
import Image from 'next/image';

import { getItemInfo } from '../../../controller/controller';
import AccordionComponent from './AccordionComponent';
import ShareProduct from './ShareProduct';
import PicturesCarousel from './PicturesCarousel';

export default async function page({ params }) {
  const fetchedInfo = await getItemInfo(params.item);

  const renderAdditionalInfo = () => {
    const sizes = ['S', 'M', 'L', 'XL'];

    return (sizes.map((size) => (
      <div
        key={size}
        className="grid place-items-center py-1 px-3 bg-white rounded-sm border-2 border-stroke-light-blue"
      >
        {size}
      </div>
    )));
  };

  return (
    <main className="flex gap-2 min-h-max w-full relative justify-center">
      <div className="w-full max-w-[1440px] min-h-[666px] flex justify-center gap-4">
        <PicturesCarousel fetchedImage={fetchedInfo.image} />
        <div className="flex flex-1 flex-col gap-4 justify-between w-full">
          <div className="flex flex-col gap-7 w-[60%]">
            <div className="flex flex-col gap-1">
              <h1 className="text-xl font-bold">{fetchedInfo.title}</h1>
              <p>{fetchedInfo.rating.rate}</p>
            </div>
            <h1 className="text-2xl font-bold">{`$${fetchedInfo.price}`}</h1>
            <div className="flex flex-col gap-1">
              <p className="text-gray-400 text-sm">Pick size</p>
              <div className="flex items-center gap-2">
                {
              (fetchedInfo.category === "men's clothing" || fetchedInfo.category === "women's clothing")
              && (
                <>
                  {renderAdditionalInfo()}
                </>
              )
            }
              </div>

            </div>
            <AccordionComponent />
            <ShareProduct />
          </div>
        </div>
      </div>
    </main>
  );
}
