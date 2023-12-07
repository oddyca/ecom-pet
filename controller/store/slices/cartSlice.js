const updateCart = (key, cartMap, isLogged) => {
  const isFoundInCart = cartMap.has(key);
  const foundItem = cartMap.get(key);

  if (isFoundInCart) {
    if (foundItem.quantity > 1) {
      foundItem.quantity -= 1;
    } else {
      cartMap.delete(key);
    }
  }

  const cartJSON = {
    ...Object.fromEntries(cartMap),
  };

  if (!isLogged) {
    localStorage.setItem('cartMap', JSON.stringify(cartJSON));
  } else {
    const loggedUser = JSON.parse(localStorage.getItem(isLogged));
    localStorage.setItem(isLogged, JSON.stringify({ ...loggedUser, cart: { ...cartJSON } }));
  }

  return { cart: cartMap };
};

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
      const lsCartMap = JSON.parse(isCartMap);
      cartMap = new Map(Object.entries(lsCartMap));
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
    };

    if (!isLogged) {
      localStorage.setItem('cartMap', JSON.stringify(cartJSON));
    } else {
      const loggedUser = JSON.parse(localStorage.getItem(isLogged));
      localStorage.setItem(isLogged, JSON.stringify({ ...loggedUser, cart: { ...cartJSON } }));
    }

    return { cart: cartMap };
  }),

  decreaseAmount: (id, isLogged, size = '-') => set(() => {
    const key = `${id}${size}`;
    let cartMap;

    if (isLogged) {
      const loggedCart = JSON.parse(localStorage.getItem(isLogged)).cart;
      cartMap = new Map(Object.entries(loggedCart));
    } else if (!isLogged) {
      const isCartMap = localStorage.getItem('cartMap');
      const lsCartMap = JSON.parse(isCartMap);
      cartMap = new Map(Object.entries(lsCartMap));
    }

    return updateCart(key, cartMap, isLogged);
  }),

  removeFromCart: (id, isLogged, size = '-') => set(() => {
    const key = `${id}${size}`;
    let cartMap;

    if (isLogged) {
      const loggedCart = JSON.parse(localStorage.getItem(isLogged)).cart;
      cartMap = new Map(Object.entries(loggedCart));
    } else if (!isLogged) {
      const isCartMap = localStorage.getItem('cartMap');
      const lsCartMap = JSON.parse(isCartMap);
      cartMap = new Map(Object.entries(lsCartMap));
    }

    cartMap.delete(key);
    return updateCart(key, cartMap, isLogged);
  }),

  resetCart: () => set(() => ({ cart: new Map() })),
  replaceCart: (newCart) => set(() => {
    const newCartMap = new Map(Object.entries(newCart));
    return ({ cart: newCartMap });
  }),
});

export default createCartSlice;
