const createCartSlice = (set) => ({
  cart: new Map(),
  addToCart: (id, size) => set((state) => {
    const cartMap = state.cart;
    const isFoundInCart = cartMap.has(`${id}${size}`);
    const foundItem = cartMap.get(`${id}${size}`);

    if (isFoundInCart) {
      foundItem.quantity += 1;
    } else {
      cartMap.set(`${id}${size}`, { ...foundItem, quantity: 1 });
    }

    return ({ cart: cartMap });
  }),

  removeFromCart: (id, size) => set((state) => {
    const cartMap = state.cart;
    cartMap.delete(`${id}${size}`);
    return ({ cart: cartMap });
  }),
});

export default createCartSlice;
