'use client';

import React, { useEffect, useState } from 'react';
import useStore from '../../../controller/store/store';
import { getCartFav, replaceInLocalStorage } from '../../../controller/clientController';

export default function ItemsInCart() {
  const { cart, replaceCart } = useStore();
  const [cartSize, setCartSize] = useState(0);

  useEffect(() => {
    const cartFromLS = getCartFav()[0];
    replaceCart(cartFromLS);
  }, []);

  useEffect(() => {
    const storeCartKeys = Object.keys(Object.fromEntries(cart));
    // eslint-disable-next-line max-len
    const liveCartSize = storeCartKeys.reduce((sum, current) => sum + cart.get(current).quantity, 0);
    replaceInLocalStorage(cart);
    setCartSize(liveCartSize);
  }, [cart]);

  return (
    <>
      {
        cartSize !== 0
          && (
            <div className="absolute rounded-full grid place-items-center lg:top-[-.75rem] lg:right-[-1rem] bg-black text-white text-sm h-5 w-5 -top-3 -right-4">
              {
              cartSize <= 9 ? cartSize : '9+'
            }
            </div>
          )
      }
    </>
  );
}
