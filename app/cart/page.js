'use client';

import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import CartCard from './CartCard/CartCard';

import useStore from '../../controller/store/store';
import { getItemInfo } from '../../controller/controller';

export default function Cart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cart } = useStore();
  const cartItemsIds = [...cart.keys()];

  useEffect(() => {
    const fetchData = async () => {
      const itemInfo = cartItemsIds.map(async (id) => {
        const trimmedID = id.slice(0, id.length - 1);
        const itemSize = id.at(-1);
        const itemQuantity = cart.get(id).quantity;
        const info = await getItemInfo(trimmedID);
        const newInfo = { ...info, size: itemSize, quantity: itemQuantity };
        return newInfo;
      });

      const DATA = await Promise.all(itemInfo);
      setData(DATA);
      setLoading(!loading);
    };

    fetchData();
  }, [cart.size]);

  return (
    <>
      <Breadcrumbs
        itemCategory="Cart"
      />
      <main className="flex gap-2 min-h-max w-full relative justify-center mt-6">
        <div className="w-full max-w-[1440px] min-h-[666px] flex justify-start gap-4">
          <div className="flex flex-col gap-5 w-full">
            <h1 className="text-2xl font-bold">
              {' '}
              My cart
              {' '}
              <span className="text-sm text-icon-blue font-normal">
                {`${cart.size} ${cart.size !== 1 ? 'items' : 'item'}`}
              </span>
            </h1>
            <ul className="w-full flex flex-col gap-3">
              {data.map((item) => (
                <CartCard
                  key={item.title}
                  img={item.image}
                  title={item.title}
                  size={item.size}
                  price={item.price}
                  quantity={item.quantity}
                  id={item.id}
                />
              ))}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}
