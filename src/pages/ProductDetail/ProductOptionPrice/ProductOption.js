import React from 'react';

const ProductOption = props => {
  const { product } = props;
  return PRODUCT.map(info => (
    <option key={info.id}>
      {info.q} {(product?.price * info.q).toLocaleString()}
    </option>
  ));
};

export default ProductOption;

const PRODUCT = [
  { id: 1, q: 1 },
  { id: 2, q: 5 },
  { id: 3, q: 10 },
  { id: 4, q: 30 },
  { id: 5, q: 50 },
];
