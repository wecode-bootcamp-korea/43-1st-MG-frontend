export const BASE_URL = 'http://43.201.21.111:3000';

export const APIS = {
  signUp: `${BASE_URL}/users/signup`,
  signIn: `${BASE_URL}/users/signin`,
  productsCount: `${BASE_URL}/products/categories/product-count`,
  productsDetail: `${BASE_URL}/products`,
  deleteCartAll: `${BASE_URL}/cart/all`,
  updateCartCount: `${BASE_URL}/cart`,
  selectedCartDelete: `${BASE_URL}/users/cart/delete`,
  payment: `${BASE_URL}/orders`,
};
