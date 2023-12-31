import React from 'react';
import ItemCard from '../ItemCard/ItemCard';

export default function Items({ fetchedProducts }) {
  const renderItems = fetchedProducts.map((item) => (
    <ItemCard
      key={item.title}
      id={item.id}
      img={item.image}
      price={item.price}
      title={item.title}
      category={item.category}
    />
  ));

  return (
    <div className="w-full grid gap-y-10 grid-cols-4 justify-items-center py-5">
      {renderItems}
    </div>
  );
}
