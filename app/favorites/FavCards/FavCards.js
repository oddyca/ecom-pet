'use client';

import React, { useEffect, useState } from 'react';
import useStore from '../../../controller/store/store';
import { getItemInfo } from '../../../controller/controller';

import ItemCard from '../../../components/ItemCard/ItemCard';

export default function FavCards() {
  const [data, setData] = useState([]);
  const { favorites } = useStore();
  const favItemsIds = [...favorites.values()];

  useEffect(() => {
    const fetchData = async () => {
      const itemInfo = favItemsIds.map(async (id) => {
        const info = await getItemInfo(id);
        return info;
      });

      const DATA = await Promise.all(itemInfo);
      setData(DATA);
    };

    fetchData();
  }, [favorites]);
  return (
    <>
      {favorites.size > 0
        ? (
          <div className="w-full grid gap-10 grid-cols-4 self-center py-5">
            {data.map((item) => (
              <ItemCard
                key={item.title}
                id={item.id}
                img={item.image}
                price={item.price}
                title={item.title}
                category={item.category}
              />
            ))}
          </div>
        )
        : <p className="text-icon-blue self-center">Nothing in favorites</p>}
    </>

  );
}
