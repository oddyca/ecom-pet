const createCartSlice = (set) => ({
  cart: new Map(),
  addToCart: (id) => set((state) => {
    const cartMap = state.cart;
    const isFoundInCart = cartMap.has(id);
    const foundItem = cartMap.get(id);

    if (isFoundInCart) {
      foundItem.quantity += 1;
    } else {
      cartMap.set(`${id}`, { ...foundItem, quantity: 1 });
    }

    return ({ cart: cartMap });
  }),

  removeFromCart: (id) => set((state) => {
    const cartMap = state.cart;
    cartMap.delete(id);
    return ({ cart: cartMap });
  }),
});

export default createCartSlice;
