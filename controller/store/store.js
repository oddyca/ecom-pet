import { create } from 'zustand';
import createCartSlice from './slices/cartSlice';

const useStore = create((...a) => ({
  ...createCartSlice(...a),
}));

export default useStore;
