const createCartSlice = (set, get) => ({
  cart: new Map(),

  addToCart: (id, size = '-') => set((state) => {
    const key = `${id}${size}`;
    const cartMap = new Map(state.cart);

    const isFoundInCart = cartMap.has(key);
    const foundItem = cartMap.get(key);
    if (isFoundInCart) {
      foundItem.quantity += 1;
    } else {
      cartMap.set(key, { quantity: 1 });
    }

    return { cart: cartMap };
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
    return { cart: cartMap };
  }),

  removeFromCart: (id, size = '-') => set((state) => {
    const key = `${id}${size}`;
    const cartMap = new Map(state.cart);
    const isFoundInCart = cartMap.has(key);

    if (isFoundInCart) cartMap.delete(key);
    return { cart: cartMap };
  }),

  resetCart: () => set(() => ({ cart: new Map() })),
  replaceCart: (cartFromLS) => set(() => {
    const storedCart = get().cart;
    const newCart = storedCart.size === 0 ? new Map(Object.entries(cartFromLS)) : storedCart;
    return ({ cart: newCart });
  }),
});
export default createCartSlice;
