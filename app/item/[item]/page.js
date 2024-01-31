import React from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

import { getItemInfo, getAllProducts } from '../../../controller/serverController';
import AccordionComponent from './components/AccordionComponent/AccordionComponent';
import ShareProduct from './components/ShareProduct/ShareProduct';
import PicturesCarousel from './components/PicturesCarousel/PicturesCarousel';
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import Descritption from './components/Description/Descritption';
import Recommendations from '../../../components/Recommendations/Recommendations';

const DynamicForm = dynamic(() => import('../../../components/Form/Form'), {
  ssr: false,
});

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
        <div className="w-full max-w-[1440px] min-h-[600px] h-full flex flex-col px-4 items-stretch md:items-center lg:p-0 lg:flex-row  lg:justify-center gap-4">
          <PicturesCarousel fetchedImage={fetchedInfo.image} />
          <div className="flex flex-1 flex-col gap-4 justify-between w-full h-full">
            <div className="flex flex-col gap-7 w-full md:w-[60%]">
              <div className="flex flex-col gap-1">
                <h1 className="text-xl font-bold">{fetchedInfo.title}</h1>
                <div className="flex items-center gap-2 w-full h-fit">
                  <div className="w-[80px] h-[16px]">
                    <div
                      style={{
                        backgroundImage: "url('/rating-empty.svg')", backgroundSize: '16px', backgroundRepeat: 'repeat-x', height: '16px',
                      }}
                    >
                      <div
                        style={{
                          backgroundImage: "url('/rating-full.svg')", backgroundSize: '16px', width: `${(fetchedInfo.rating.rate / 5) * 100}%`, backgroundRepeat: 'repeat-x', height: '16px',
                        }}
                      />
                    </div>
                  </div>
                  <p>{fetchedInfo.rating.rate}</p>
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <h1 className={fetchedInfo.id === 1 || fetchedInfo.id === 2 ? 'line-through text-sm' : 'text-2xl font-bold'}>{`$${fetchedInfo.price}`}</h1>
                {
                  (fetchedInfo.id === 1 || fetchedInfo.id === 2)
                  && (
                  <h1 className={fetchedInfo.id === 1 ? 'font-bold text-[#EC4D37] text-2xl' : fetchedInfo.id === 2 ? 'font-bold text-2xl' : ''}>
                    $
                      {
                      fetchedInfo.id === 1 ? Math.round((fetchedInfo.price - (fetchedInfo.price * 0.25)) * 100) / 100 : fetchedInfo.id === 2 ? Math.round((fetchedInfo.price - (fetchedInfo.price * 0.1)) * 100) / 100 : ''
                    }

                  </h1>
                  )
                }
              </div>
              <DynamicForm fetchedInfo={fetchedInfo} />
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
