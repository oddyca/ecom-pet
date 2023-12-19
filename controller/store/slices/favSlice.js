'use client';

import { getCartFav } from '../../controller';

const createFavSlice = (set) => {
  const initialFav = getCartFav()[1];
  const initialFavSet = new Set(Object.entries(initialFav));
  return {
    favorites: initialFavSet,

    replaceFavs: (favsFromLS) => set(() => ({ favorites: new Set(Object.entries(favsFromLS)) })),

    addToFavs: (id) => set((state) => {
      const freshFavSet = new Set(state.favorites);
      const isFoundInfavorites = freshFavSet.has(id);

      if (!isFoundInfavorites) {
        freshFavSet.add(id);
      } else {
        freshFavSet.delete(id);
      }

      return ({ favorites: freshFavSet });
    }),

    resetFavs: () => {
      set(() => ({ favorites: new Set() }));
    },
  };
};

export default createFavSlice;
