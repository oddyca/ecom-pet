import { getCartFav } from '../../clientController';

const createCartSlice = (set) => {
  const initialCart = getCartFav()[0];
  const initialCartMap = new Map(Object.entries(initialCart));

  return {
    cart: initialCartMap,

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
    replaceCart: (newCart) => set(() => {
      const newCartMap = new Map(Object.entries(newCart));
      return ({ cart: newCartMap });
    }),
  };
};

export default createCartSlice;
