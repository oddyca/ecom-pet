import React from 'react';
import DeleteItem from '../DeleteItem/DeleteItem';
import ChangeQuantity from '../ChangeQuantity/ChangeQuantity';

export default function CartCard({
  img, title, size, price, quantity, id, discount,
}) {
  return (
    <div className="flex justify-between border border-2 bg-white border-stroke-light-blue rounded-lg p-3">
      <div className="flex flex-col sm:flex-row gap-2">
        <div
          style={{
            backgroundImage: `url(${img})`, backgroundSize: '75%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center',
          }}
          className="w-[150px] h-[180px] bg-white rounded-lg"
        />
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h3 className="font-bold">{title}</h3>
            {size === '-' ? '' : <p className="text-sm text-icon-blue">{size}</p>}
          </div>
          <div>
            <h1 className="font-medium text-2xl">{`$${discount ? price - (price * (Number(discount) / 100)) : price}`}</h1>
          </div>
          <ChangeQuantity
            id={id}
            quantity={quantity}
            size={size}
          />
        </div>
      </div>
      <div>
        <DeleteItem
          id={id}
          size={size}
        />
      </div>
    </div>
  );
}
