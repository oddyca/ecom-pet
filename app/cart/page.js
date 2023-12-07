'use client';

import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import CartCard from './CartCard/CartCard';
import Order from './Order/Order';

import useStore from '../../controller/store/store';
import { getItemInfo, getCartMap } from '../../controller/controller';

export default function Cart() {
  const [data, setData] = useState([]);
  const { cart, replaceCart } = useStore();
  const [cartItemsIds, setCartItemsIds] = useState([]);
  const [cartSize, setCartSize] = useState(0);
  const [cartMap, setCartMap] = useState({});

  const fetchData = async () => {
    const itemInfo = cartItemsIds.map(async (id) => {
      const trimmedID = id.match(/\d+/)[0];
      const itemSize = id.match(/\D+/)[0];
      const itemQuantity = cartMap[id].quantity;
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
    const keys = Object.keys(Object.fromEntries(cart));
    let innerCartMap = {};

    if (keys.length === 0 && cartItemsIds.length === 0) {
      innerCartMap = getCartMap();
      setCartMap(innerCartMap);
      const cartKeys = Object.keys(innerCartMap);

      if (cartKeys.length > 0) {
        replaceCart(innerCartMap);
        setCartItemsIds(cartKeys);
      }
    } else {
      innerCartMap = Object.fromEntries(cart);
      setCartMap(Object.fromEntries(cart));
      const cartKeys = Object.keys(innerCartMap);
      setCartItemsIds(cartKeys);
    }
  }, [cart]);

  useEffect(() => {
    const calcCartSize = cartItemsIds?.reduce((sum, current) => sum + cartMap[current].quantity, 0);
    setCartSize(calcCartSize);
    fetchData();
  }, [cartMap, cartItemsIds]);

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
