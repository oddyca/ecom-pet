'use client';

import React, { useEffect, useState } from 'react';
import useStore from '../../controller/store/store';

export default function ItemsInCart() {
  const { cart } = useStore();
  const [cartSize, setCartSize] = useState(0);

  useEffect(() => {
    const IS_LOGGED = localStorage.getItem('isLogged');
    let cartMap = {};

    if (IS_LOGGED) {
      cartMap = JSON.parse(localStorage.getItem(IS_LOGGED))[cart];
    } else {
      const isCartMap = JSON.parse(localStorage.getItem('cartMap'));
      cartMap = isCartMap || {};
    }

    const cartValues = Object.keys(cartMap);
    const calcCartSize = cartValues?.reduce((sum, current) => sum + cartMap[current], 0);
    setCartSize(calcCartSize);
  }, []);

  useEffect(() => {
    const values = [...cart.values()];
    const liveCartSize = values.reduce((sum, current) => (sum + current.quantity), 0);
    setCartSize(liveCartSize);
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
