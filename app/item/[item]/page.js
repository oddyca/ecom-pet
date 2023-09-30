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
        className="grid place-items-center py-1 px-2 bg-white rounded-sm border-stroke-light-blue"
      >
        {size}
      </div>
    )));
  };

  return (
    <main className="flex gap-2 min-h-max w-full relative justify-center">
      <div className="w-full max-w-[1440px] flex justify-center">
        <PicturesCarousel fetchedImage={fetchedInfo.image} />
        <div className="flex flex-1 flex-col gap-4 w-full">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <h1>{fetchedInfo.title}</h1>
              <p>{fetchedInfo.rating.rate}</p>
            </div>
            <h1>{`$${fetchedInfo.price}`}</h1>
            <div>
              {
              (fetchedInfo.category === "men's clothing" || fetchedInfo.category === "women's clothing")
              && (
                <>
                  <p className="text-grey">Pick size</p>
                  {renderAdditionalInfo()}
                </>
              )
            }
            </div>
            <AccordionComponent />
            <ShareProduct />
          </div>
        </div>
      </div>
    </main>
  );
}
