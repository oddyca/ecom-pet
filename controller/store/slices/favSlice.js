const createFavSlice = (set) => ({
  favorites: new Set(),
  addToFavs: (id) => set((state) => {
    const favSet = new Set(state.favorites);
    const isFoundInfavorites = favSet.has(id);

    if (!isFoundInfavorites) {
      favSet.add(id);
      localStorage.setItem(`${id}`, 'inFavs');
    } else {
      favSet.delete(id);
      localStorage.removeItem(`${id}`);
    }

    return ({ favorites: favSet });
  }),
});

export default createFavSlice;
