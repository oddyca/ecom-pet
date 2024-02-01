import { userLogin, userSignUp } from './serverController';

export const handleSignInSubmit = async (
  data,
  event,
  setServerError,
  setIsLoading,
  hash,
  SALT,
  replaceCart,
  replaceFavs,
  setIsLogged,
  router,
  reset,
) => {
  event.preventDefault();

  setServerError('');
  setIsLoading(true);

  const username = data.signinUsername;
  const password = data.signinPassword;

  const wasSignedUp = localStorage.getItem(`signup-${username}`);
  if (wasSignedUp) {
    const signedUpData = JSON.parse(wasSignedUp);
    const hashedSaltedPswd = await hash(password, SALT);
    if (hashedSaltedPswd === signedUpData.password) {
      setIsLoading(false);
      localStorage.setItem('isLogged', `signup-${username}`);
      const loggedCart = signedUpData.cart;
      const loggedFavs = signedUpData.favorites;
      replaceCart(loggedCart);
      replaceFavs(loggedFavs);
      localStorage.removeItem('cartMap');
      localStorage.removeItem('favSet');
      setIsLogged();
      router.push('/profile');
    } else {
      setIsLoading(false);
      setServerError('Wrong password');
    }
  } else {
    const response = await userLogin(username, password);
    setIsLoading(false);

    if (response.ok) {
      localStorage.setItem('isLogged', username);
      const userLSData = localStorage.getItem(username);
      if (!userLSData) {
        localStorage.setItem(username, JSON.stringify({
          name: `${username}`,
          favorites: [],
          cart: {},
          addresses: {},
        }));
      } else {
        const loggedUser = JSON.parse(userLSData);
        const loggedCart = loggedUser.cart;
        const loggedFavs = loggedUser.favorites;

        replaceCart(loggedCart);
        replaceFavs(loggedFavs);
      }
      setIsLogged();
      localStorage.removeItem('cartMap');
      localStorage.removeItem('favSet');
      router.push('/profile');
    } else {
      setServerError(await response.text());
    }
  }
  reset();
};

export const handleSignUpSubmit = async (
  data,
  event,
  setServerError,
  setIsLoading,
  setSelected,
  hash,
  SALT,
  resetSignup,
) => {
  event.preventDefault();

  const email = data.signupEmail;
  const username = data.signupUsername;
  const password = data.signupPassword;

  if (localStorage.getItem(`signup-${username}`)) {
    setServerError('This username is already taken');
    return;
  }

  setIsLoading(true);
  const response = await userSignUp(email, username, password);
  setIsLoading(false);

  if (response.ok) {
    setSelected('login');
    const hashedPswd = await hash(password, SALT);
    localStorage.setItem(`signup-${username}`, JSON.stringify({
      name: `signup-${username}`,
      email,
      password: hashedPswd,
      favorites: [],
      cart: {},
      addresses: {},
    }));
  } else {
    setServerError(await response.text());
  }

  resetSignup();
};

export const orderModalHandleNext = (formAddress, formCity, radioAddressID, isLogged) => {
  if (isLogged) {
    const parsedLoggedData = JSON.parse(localStorage.getItem(isLogged));
    const storedAddresses = parsedLoggedData.addresses;
    const storedAddressesKeys = Object.keys(storedAddresses);
    const storedLength = storedAddressesKeys.length;
    let updatedAddress = {};

    if (radioAddressID) {
      updatedAddress = {
        ...storedAddresses, [radioAddressID]: { city: formCity, address: formAddress },
      };
    } else if (storedLength < 3 && !radioAddressID) {
      updatedAddress = {
        ...storedAddresses, [`address${storedLength + 1}`]: { city: formCity, address: formAddress },
      };
    } else {
      updatedAddress = { address4: { city: formCity, address: formAddress } };
    }

    const toSetAsNewAddresses = {
      ...parsedLoggedData, addresses: { ...storedAddresses, ...updatedAddress },
    };
    localStorage.setItem(isLogged, JSON.stringify(toSetAsNewAddresses));

    return updatedAddress;
  }
  return { address: { city: formCity, address: formAddress } };
};

export const getCartFav = () => {
  let cartMap = {};
  let favSet = [];

  const isLogged = localStorage.getItem('isLogged');
  const isCartMap = localStorage.getItem('cartMap');
  const isFavSet = JSON.parse(localStorage.getItem('favSet'));

  if (isLogged) {
    cartMap = JSON.parse(localStorage.getItem(isLogged)).cart;
    favSet = JSON.parse(localStorage.getItem(isLogged)).favorites;
  } else if (isCartMap) {
    cartMap = JSON.parse(isCartMap);
  }

  if (isFavSet && isFavSet.length > 0) {
    favSet = isFavSet;
  }

  return [cartMap, favSet];
};

export const replaceInLocalStorage = (cart) => {
  const isLogged = localStorage.getItem('isLogged');
  const isLoggedOut = localStorage.getItem('cartMap');
  const mapToObj = Object.fromEntries(cart.entries());

  if (isLogged && !isLoggedOut) {
    const loggedUser = JSON.parse(localStorage.getItem(isLogged));
    const updatedLoggedUser = { ...loggedUser, cart: { ...mapToObj } };

    localStorage.setItem(isLogged, JSON.stringify(updatedLoggedUser));
  } else if (isLoggedOut || (!isLogged && !isLoggedOut)) {
    localStorage.setItem('cartMap', JSON.stringify(mapToObj));
  }
};

export const replaceFavsInLocalStorage = (favs) => {
  const isLogged = localStorage.getItem('isLogged');
  const isLoggedOut = localStorage.getItem('favSet');
  const favsArr = [...favs];

  if (isLogged && !isLoggedOut) {
    const loggedUser = JSON.parse(localStorage.getItem(isLogged));
    const updatedLoggedUser = { ...loggedUser, favorites: favsArr };

    localStorage.setItem(isLogged, JSON.stringify(updatedLoggedUser));
  } else if (isLoggedOut || (!isLogged && !isLoggedOut)) {
    localStorage.setItem('favSet', JSON.stringify(favsArr));
  }
};

export const addToPurchaseHistory = (imgs) => {
  const purchaseDate = new Date();
  const isLogged = localStorage.getItem('isLogged');
  const loggedUser = JSON.parse(localStorage.getItem(isLogged));

  const imgsToArray = Array.from(imgs);
  const purchaseObj = {
    [purchaseDate]: [...imgsToArray],
  };

  loggedUser.purchaseHistory = { ...loggedUser.purchaseHistory, ...purchaseObj };
  localStorage.setItem(isLogged, JSON.stringify(loggedUser));
};
