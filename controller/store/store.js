'use client';

import { create } from 'zustand';
import createCartSlice from './slices/cartSlice';
import createFavSlice from './slices/favSlice';
import isLoggedSlice from './slices/isLoggedSlice';

const useStore = create((...a) => ({
  ...createCartSlice(...a),
  ...createFavSlice(...a),
  ...isLoggedSlice(...a),
}));

export default useStore;
