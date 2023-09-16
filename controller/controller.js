const API = 'https://fakestoreapi.com/products';

const CATEGORIES_ENDPOINT = 'https://fakestoreapi.com/products/categories';

export const getAllProducts = async () => {
  const params = new URLSearchParams({
    limit: 10,
  });

  const queryString = params.toString();

  try {
    const response = await fetch(`${API}${queryString}`);
    const data = await response.json();
    return data;
  } catch (e) {
    throw new Error(e);
  }
};

export const getAllCategories = async () => {
  try {
    const response = await fetch(CATEGORIES_ENDPOINT);
    const data = await response.json();
    return data;
  } catch (e) {
    throw new Error(e);
  }
}

export const sortProducts = async (url, sortBy) => {
  const params = new URLSearchParams({
    sort: sortBy === 'desc' ? 'desc' : 'asc',
  });

  const queryString = params.toString();

  try {
    const response = await fetch(`${url}${queryString}`);
    const data = await response.json();
    return data;
  } catch (e) {
    throw new Error(e);
  }
};
