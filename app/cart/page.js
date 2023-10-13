'use client';

import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import CartCard from './CartCard/CartCard';
import Order from './Order/Order';

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
        const newInfo = {
          ...info,
          size: itemSize,
          quantity: itemQuantity,
          sale: trimmedID === '1' ? '25' : trimmedID === '2' ? '10' : '',
        };
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
      <main className="flex justify-center min-h-max w-full relative mt-6">
        <div className="w-full max-w-[1440px] min-h-[666px] grid grid-cols-3 gap-5">
          <div className="flex flex-col col-span-2 gap-5 w-full">
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
          <div className="flex flex-col gap-5">
            <h1 className="text-2xl font-bold">Total order</h1>
            <Order items={data} />
          </div>
        </div>
      </main>
    </>
  );
}
