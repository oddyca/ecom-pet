'use client';

import React, { useEffect, useState } from 'react';
import useStore from '../../controller/store/store';
import { getCartFav } from '../../controller/controller';

export default function ItemsInCart() {
  const { cart } = useStore();
  const [cartSize, setCartSize] = useState(0);

  useEffect(() => {
    const storeCartKeys = Object.keys(Object.fromEntries(cart));
    let cartMap = {};
    if (storeCartKeys.length === 0) {
      [cartMap] = getCartFav();
      const cartValues = Object.keys(cartMap);
      const calcCartSize = cartValues?.reduce((sum, current) => sum + cartMap[current].quantity, 0);
      setCartSize(calcCartSize);
    } else {
      // eslint-disable-next-line max-len
      const liveCartSize = storeCartKeys.reduce((sum, current) => sum + cart.get(current).quantity, 0);
      setCartSize(liveCartSize);
    }
  }, [cart]);

  return (
    <>
      {
        cartSize !== 0
        && (
          <div className="absolute rounded-full grid place-items-center top-[-.75rem] right-[-1rem] bg-black text-white text-sm h-5 w-5">
            {
              cartSize <= 9 ? cartSize : '9+'
            }
          </div>
        )
      }
    </>
  );
}
