'use client';

import React, { useState, useEffect } from 'react';
import ItemCard from '../ItemCard/ItemCard';

export default function Items({ fetchedProducts, search }) {
  const [renderItems, setRenderItems] = useState([]);

  useEffect(() => {
    if (search) {
      const lowSearchParam = search.toLowerCase();
      const filteredItems = fetchedProducts.filter((item) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        item.title.toLowerCase().includes(lowSearchParam));

      const filteredItemCards = filteredItems.map((item) => (
        <ItemCard
          key={item.title}
          id={item.id}
          img={item.image}
          price={item.price}
          title={item.title}
          category={item.category}
        />
      ));

      setRenderItems(filteredItemCards);
    } else {
      const allItems = fetchedProducts.map((item) => (
        <ItemCard
          key={item.title}
          id={item.id}
          img={item.image}
          price={item.price}
          title={item.title}
          category={item.category}
        />
      ));

      setRenderItems(allItems);
    }
  }, [search, fetchedProducts]);

  return (
    <div className="w-full grid grid-cols-1 lg:gap-y-10 md:grid-cols-2 lg:grid-cols-4 justify-items-center py-5">
      {renderItems}
    </div>
  );
}
