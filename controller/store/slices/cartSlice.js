const createCartSlice = (set) => ({
  cart: new Map(),
  addToCart: (id, size = '-') => set((state) => {
    const key = `${id}${size}`;

    let cartMap;
    const IS_LOGGED = localStorage.getItem('isLogged');
    const isCartMap = localStorage.getItem('cartMap');

    if (IS_LOGGED) {
      const loggedCart = JSON.parse(localStorage.getItem(IS_LOGGED))['cart'];
      cartMap = new Map(Object.entries(loggedCart));
    } else if (!IS_LOGGED && isCartMap) {
      const lsCartMap = JSON.parse(localStorage.getItem('cartMap'));
      cartMap = new Map(Object.entries(lsCartMap));
    } else (!IS_LOGGED && !isCartMap) {
      localStorage.setItem('cartMap', '{}')
      cartMap = new Map();
    }

    const isFoundInCart = cartMap.has(key);
    const foundItem = cartMap.get(key);

    if (isFoundInCart) {
      foundItem.quantity += 1;
    } else {
      cartMap.set(key, { quantity: 1 });
    }

    const cartJSON = {
      [key]: cartMap.get(key).quantity,
    };
    
    if (isCartMap) {
      loggedCart.setItem('cartMap', JSON.stringify(cartJSON))
    } else {
      const loggedUser = JSON.parse(localStorage.getItem(IS_LOGGED));
      localStorage.setItem(IS_LOGGED, JSON.stringify({...loggedUser, cart: {...cartJSON}}))
    };
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

  resetCart: () => set(() => {
    const lsCartItems = Object.keys(localStorage);
    lsCartItems.forEach((key) => {
      if (key.length <= 3) localStorage.removeItem(key);
    });
    return ({ cart: new Map() });
  }),
});

export default createCartSlice;
