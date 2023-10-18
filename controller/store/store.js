import { create } from 'zustand';
import createCartSlice from './slices/cartSlice';
import createFavSlice from './slices/favSlice';

const useStore = create((...a) => ({
  ...createCartSlice(...a),
  ...createFavSlice(...a),
}));

export default useStore;
