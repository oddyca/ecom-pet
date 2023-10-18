const createCartSlice = (set) => ({
  cart: new Map(),
  addToCart: (id, size = '-') => set((state) => {
    const key = `${id}${size}`;
    const cartMap = new Map(state.cart);
    const isFoundInCart = cartMap.has(key);
    const foundItem = cartMap.get(key);

    console.log('____KEY', key);
    console.log('____foundItem', foundItem);

    if (isFoundInCart) {
      foundItem.quantity += 1;
    } else {
      cartMap.set(key, { ...foundItem, quantity: 1 });
    }

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

    return ({ cart: cartMap });
  }),

  removeFromCart: (id, size = '-') => set((state) => {
    const key = `${id}${size}`;
    const cartMap = new Map(state.cart);
    cartMap.delete(key);
    return ({ cart: cartMap });
  }),
});

export default createCartSlice;
