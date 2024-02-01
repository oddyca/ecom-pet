const createFavSlice = (set, get) => ({
  favorites: new Set(),

  replaceFavs: (favsFromLS) => set(() => {
    const storedFavs = get().favorites;
    const newFav = storedFavs.size === 0 ? new Set(favsFromLS) : storedFavs;
    return { favorites: newFav };
  }),

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
});
export default createFavSlice;
