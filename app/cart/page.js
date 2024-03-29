/* eslint-disable max-len */

'use client';

import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import CartCard from './CartCard/CartCard';
import Order from './Order/Order';

import useStore from '../../controller/store/store';
import { getItemInfo } from '../../controller/serverController';

export default function Cart() {
  const [data, setData] = useState([]);
  const { cart } = useStore();
  const [cartSize, setCartSize] = useState(0);

  const fetchData = async (cartItemsIds) => {
    const itemInfo = cartItemsIds.map(async (id) => {
      const trimmedID = id.match(/\d+/)[0];
      const itemSize = id.match(/\D+/)[0];
      const itemQuantity = cart.get(id).quantity;
      const info = await getItemInfo(trimmedID);
      const newInfo = {
        ...info,
        size: itemSize === '-' ? '-' : itemSize,
        quantity: itemQuantity,
        discount: trimmedID === '1' ? '25' : trimmedID === '2' ? '10' : '',
      };

      return newInfo;
    });

    const fetchedData = await Promise.all(itemInfo);
    setData(fetchedData);
  };

  useEffect(() => {
    const cartItemsIds = [...cart.keys()];
    const calcCartSize = cartItemsIds?.reduce((sum, current) => sum + cart.get(current).quantity, 0);
    setCartSize(calcCartSize);
    fetchData(cartItemsIds);
  }, [cart]);

  return (
    <>
      <Breadcrumbs
        misc="Cart"
      />
      <main className="flex justify-center min-h-max w-full relative mt-6">
        <div className="w-full max-w-[1440px] min-h-[666px] flex flex-col px-3 md:px-0 md:grid md:grid-cols-3 gap-5">
          <div className="flex flex-col col-span-2 gap-5 w-full">
            <h1 className="text-2xl font-bold">
              {' '}
              My cart
              {' '}
              <span className="text-sm text-icon-blue font-normal">
                {`${cartSize} ${cartSize !== 1 ? 'items' : 'item'}`}
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
                  discount={item.discount}
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
