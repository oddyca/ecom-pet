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
