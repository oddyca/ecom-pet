'use client';

import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
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
        const info = await getItemInfo(trimmedID);
        const newInfo = { ...info, size: itemSize };

        return newInfo;
      });

      const DATA = await Promise.all(itemInfo);
      setData(DATA);
      setLoading(!loading);
    };

    fetchData();
  }, []);

  return (
    <>
      <Breadcrumbs
        itemCategory="Cart"
      />
      <main className="flex gap-2 min-h-max w-full relative justify-center mt-6">
        <div className="w-full max-w-[1440px] min-h-[666px] flex justify-center gap-4">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {data.map((item) => (
                <li key={item.title}>{`${item.title}, ${item.size}`}</li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </>

  );
}
