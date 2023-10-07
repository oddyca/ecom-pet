import React from 'react';
import Image from 'next/image';

import { getItemInfo, getAllProducts } from '../../../controller/controller';
import AccordionComponent from './AccordionComponent';
import ShareProduct from './ShareProduct';
import PicturesCarousel from './PicturesCarousel';
import AddToCart from '../../../components/AddToCart/AddToCart';
import AddToFavorite from '../../../components/AddToFavorite/AddToFavorite';
import PickSize from './PickSize';
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import Descritption from './Descritption';
import Recommendations from '../../../components/Recommendations/Recommendations';

export default async function page({ params }) {
  const fetchedInfo = await getItemInfo(params.item);
  const itemsForRecom = await getAllProducts({ limit: 4 });

  return (
    <>
      <Breadcrumbs
        itemCategory={fetchedInfo.category}
        itemName={fetchedInfo.title}
        itemId={fetchedInfo.id}
      />
      <main className="flex flex-col gap-7 h-full w-full relative items-center mt-6">
        <div className="w-full max-w-[1440px] min-h-[600px] h-full flex justify-center gap-4">
          <PicturesCarousel fetchedImage={fetchedInfo.image} />
          <div className="flex flex-1 flex-col gap-4 justify-between w-full h-full">
            <div className="flex flex-col gap-7 w-[60%]">
              <div className="flex flex-col gap-1">
                <h1 className="text-xl font-bold">{fetchedInfo.title}</h1>
                <p>{fetchedInfo.rating.rate}</p>
              </div>
              <div className="flex items-baseline gap-2">
                <h1 className={fetchedInfo.id === 1 || fetchedInfo.id === 2 ? 'line-through text-sm' : 'text-base'}>{`$${fetchedInfo.price}`}</h1>
                <h1 className="text-2xl font-bold">
                  {
                (fetchedInfo.id === 1 || fetchedInfo.id === 2)
                && (
                  <p className={fetchedInfo.id === 1 ? 'font-bold text-[#EC4D37]' : fetchedInfo.id === 2 ? 'font-bold' : ''}>
                    $
                    {
                      fetchedInfo.id === 1 ? Math.round((fetchedInfo.price - (fetchedInfo.price * 0.25)) * 100) / 100 : fetchedInfo.id === 2 ? Math.round((fetchedInfo.price - (fetchedInfo.price * 0.1)) * 100) / 100 : ''
                    }
                  </p>
                )
              }

                </h1>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-gray-400 text-sm">Pick size</p>
                <div className="flex items-center gap-2">
                  {
                    (fetchedInfo.category === "men's clothing" || fetchedInfo.category === "women's clothing")
                    && <PickSize />
                  }
                </div>
              </div>
              <div className="flex gap-3 items-center max-w-[390px]">
                <AddToCart id={fetchedInfo.id} />
                <div className="flex-1 rounded-lg border-2 border-[#2D2D2D] group">
                  <AddToFavorite />
                </div>
              </div>
              <AccordionComponent />
              <ShareProduct />
            </div>
          </div>
        </div>
        <Descritption
          reviews={fetchedInfo.rating.count}
          description={fetchedInfo.description}
        />
        <div className="w-full max-w-[1440px] h-fit py-5 flex justify-center">
          <div className="flex flex-col items-center">
            <h1 className="font-bold">People also viewed</h1>
            <Image
              src="/doublearrow.svg"
              alt="arrows icon"
              width={40}
              height={10}
            />
            <Recommendations itemsForRecom={itemsForRecom} />
          </div>
        </div>
      </main>
    </>
  );
}
