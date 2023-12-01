const API = 'https://fakestoreapi.com/products';

const CATEGORIES_ENDPOINT = 'https://fakestoreapi.com/products/categories';

export const getAllProducts = async (searchParams) => {
  const params = new URLSearchParams({
    ...searchParams,
  });
  const queryString = params.toString();

  try {
    const response = await fetch(`${API}?${queryString}`);
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getAllCategories = async () => {
  try {
    const response = await fetch(CATEGORIES_ENDPOINT);
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getIntoCategory = async (category) => {
  try {
    const response = await fetch(`${API}/category/${category}`);
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getItemInfo = async (id) => {
  try {
    const response = await fetch(`${API}/${id}`);
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const userLogin = async (username, password) => {
  try {
    const response = await fetch('https://fakestoreapi.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: `${username}`,
        password: `${password}`,
      }),
    });
    return response;
  } catch (e) {
    console.error(e);
  }
};

export const userSignUp = async (email, username, password) => {
  try {
    const response = await fetch('https://fakestoreapi.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: `${email}`,
        username: `${username}`,
        password: `${password}`,
      }),
    });
    return response;
  } catch (e) {
    console.error(e);
  }
};

export const getUserData = async (id) => {
  try {
    const response = await fetch(`https://fakestoreapi.com/users/${id}`);
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const getAllUsers = async () => {
  try {
    const response = await fetch('https://fakestoreapi.com/users');
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const orderModalHandleNext = (formAddress, formCity, radioAddressID) => {
  const IS_LOGGED = localStorage.getItem('isLogged');
  if (IS_LOGGED) {
    const parsedLoggedData = JSON.parse(localStorage.getItem(IS_LOGGED));
    let updatedAddress = {};

    if (radioAddressID) {
      updatedAddress = { [radioAddressID]: { city: formCity, address: formAddress } };
    } else {
      updatedAddress = { address4: { city: formCity, address: formAddress } };
    }

    const toSetAsNewAddresses = {
      ...parsedLoggedData, addresses: { ...parsedLoggedData.addresses, ...updatedAddress },
    };
    localStorage.setItem(IS_LOGGED, JSON.stringify(toSetAsNewAddresses));

    return updatedAddress;
  }
};

export const getCartMap = () => {
  let cartMap = {};
  const IS_LOGGED = localStorage.getItem('isLogged');
  const isCartMap = localStorage.getItem('cartMap');

  if (IS_LOGGED) {
    cartMap = JSON.parse(localStorage.getItem(IS_LOGGED)).cart;
  } else if (isCartMap) {
    cartMap = JSON.parse(isCartMap);
  }

  return cartMap;
};
