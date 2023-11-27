const createCartSlice = (set) => ({
  cart: new Map(),
  addToCart: (id, isLogged, size = '-') => set(() => {
    const key = `${id}${size}`;
    let cartMap;

    if (isLogged) {
      const loggedCart = JSON.parse(localStorage.getItem(isLogged)).cart;
      cartMap = new Map(Object.entries(loggedCart));
    } else if (!isLogged) {
      const isCartMap = localStorage.getItem('cartMap');
      if (isCartMap) {
        const lsCartMap = JSON.parse(isCartMap);
        cartMap = new Map(Object.entries(lsCartMap));
      } else {
        cartMap = new Map();
      }
    }

    const isFoundInCart = cartMap.has(key);
    const foundItem = cartMap.get(key);

    if (isFoundInCart) {
      foundItem.quantity += 1;
    } else {
      cartMap.set(key, { quantity: 1 });
    }

    const cartJSON = {
      ...Object.fromEntries(cartMap),
      [key]: { quantity: cartMap.get(key).quantity },
    };

    if (!isLogged) {
      localStorage.setItem('cartMap', JSON.stringify(cartJSON));
    } else {
      const loggedUser = JSON.parse(localStorage.getItem(isLogged)); // isLogged
      localStorage.setItem(isLogged, JSON.stringify({ ...loggedUser, cart: { ...cartJSON } }));
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

    const cartJSON = JSON.stringify(Array.from(cartMap.entries()));
    localStorage.setItem('cartMap', cartJSON);
    return ({ cart: cartMap });
  }),

  removeFromCart: (id, size = '-') => set((state) => {
    const key = `${id}${size}`;
    const cartMap = new Map(state.cart);
    cartMap.delete(key);

    const cartJSON = JSON.stringify(Array.from(cartMap.entries()));
    localStorage.setItem('cartMap', cartJSON);
    return ({ cart: cartMap });
  }),

  resetCart: () => set(() => ({ cart: new Map() })),
  replaceCart: (newCart) => set(() => {
    const newCartMap = new Map(Object.entries(newCart));
    return ({ cart: newCartMap });
  }),
});

export default createCartSlice;
