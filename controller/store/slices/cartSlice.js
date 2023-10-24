const createCartSlice = (set) => ({
  cart: new Map(),
  addToCart: (id, size = '-') => set((state) => {
    const key = `${id}${size}`;
    const cartMap = new Map(state.cart);
    const isFoundInCart = cartMap.has(key);
    const foundItem = cartMap.get(key);

    if (isFoundInCart) {
      foundItem.quantity += 1;
    } else {
      cartMap.set(key, { ...foundItem, quantity: 1 });
    }

    localStorage.setItem(key, `${foundItem.quantity}`);
    return ({ cart: cartMap });
  }),

  decreaseAmount: (id, size = '-') => set((state) => {
    const key = `${id}${size}`;
    const cartMap = new Map(state.cart);
    const isFoundInCart = cartMap.has(key);
    const foundItem = cartMap.get(key);

    if (isFoundInCart) {
      if (foundItem.quantity > 1) {
        foundItem.quantity -= 1;
      } else {
        cartMap.delete(key);
      }
    }

    localStorage.setItem(key, `${foundItem.quantity}`);
    return ({ cart: cartMap });
  }),

  removeFromCart: (id, size = '-') => set((state) => {
    const key = `${id}${size}`;
    const cartMap = new Map(state.cart);
    cartMap.delete(key);

    localStorage.removeItem(key);
    return ({ cart: cartMap });
  }),

  reset: () => set(new Map()),
});

export default createCartSlice;
