'use client';

import React from 'react';
import ItemCard from '../ItemCard/ItemCard';

export default function Items({ fetchedProducts }) {
  const renderItems = fetchedProducts.map((item) => (
    <ItemCard
      key={item.title} // ADD: OnClick to open modal
      itemID={item.id}
      img={item.image}
      price={item.price}
      title={item.title}
      category={item.category}
    />
  ));

  return (
    <div className="grid gap-10 grid-cols-4 self-center py-5">
      {renderItems}
    </div>
  );
}
