import React from 'react';
import Image from 'next/image';

export default function Items({ fetchedProducts }) {
  const renderItems = fetchedProducts.map((item, id) => (
    <div
      key={id}
    >
      <Image
        src={item.image}
        width={128}
        height={64}
        alt="item image"
      />
      <p>{item.price}</p>
      <h3>{item.title}</h3>
      <p>{item.category}</p>
    </div>
  ));

  return (
    <div className="grid gap-4 grid-cols-4">

      {renderItems}

    </div>
  );
}
