import { create } from 'zustand';
import { createCartSlice } from './slices/cartSlice';

export const useStore = create((...a) => ({
  ...createCartSlice(...a),
}))

