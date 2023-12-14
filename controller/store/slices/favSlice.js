const createFavSlice = (set) => ({
  favorites: new Set(),

  updateFavs: (favsFromLS) => set(() => ({ favorites: new Set(Object.entries(favsFromLS)) })),

  addToFavs: (id) => set((state) => {
    const favSet = new Set(state.favorites);
    const isFoundInfavorites = favSet.has(id);

    if (!isFoundInfavorites) {
      favSet.add(id);
    } else {
      favSet.delete(id);
    }

    return ({ favorites: favSet });
  }),

  resetFavs: () => {
    set(() => ({ favorites: new Set() }));
  },
});

export default createFavSlice;
