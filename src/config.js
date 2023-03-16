export const BASE_URL = 'http://10.58.52.209:3000';

export const APIS = {
  cart: `${BASE_URL}/users/cart`,
  signUp: `${BASE_URL}/users/signup`,
  signIn: `${BASE_URL}/users/signin`,
  productsCount: `${BASE_URL}/products/categories/product-count`,
  productsDetail: `${BASE_URL}/products`,
  deleteCartAll: `${BASE_URL}/users/cart/deleteAll`,
  purchase: `${BASE_URL}/users/orders`,
  updateCartCount: `${BASE_URL}/users/orders`,
  selectedCartDelete: `${BASE_URL}/users/cart/delete`,
};
