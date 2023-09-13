export const createCartSlice = (set) => ({
  cart: new Map(),
  addToCart: (item) => set((state) => {
    const cartMap = state.cart;
    const isFoundInCart = cartMap.has(item.id);
    const foundItem = cartMap.get(item.id);

    if (isFoundInCart) {
      foundItem.quantity += 1;
    } else {
      cartMap.set(`${item.id}`, { ...foundItem, quantity: 1 });
    }

    return ({ cart: cartMap })
  }),
  
  removeFromCart: (itemId) => set((state) => {
    const cartMap = state.cart;
    cartMap.delete(itemId);
    return ({ cart: cartMap });
  }),
})