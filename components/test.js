'use client'

import React from 'react';
import { useStore } from '../controller/store/store';

export default function Test() {

  const itemsCount = useStore((state) => state.cart.size)
  // const addToCart = useStore((state) => state.addBear)


  return (
    <div>{itemsCount}</div>
  )
}
