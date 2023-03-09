import React from 'react';
import './Product.scss';

const Product = props => {
  const { productDetail } = props;
  return (
    <div className="product" id={productDetail.id}>
      <img
        className="thumbnail"
        src={`${PRODUCT_PATH}/${productDetail.thumbnail}`}
        alt="product-thumbnail"
      />
      <p className="title">{productDetail.name}</p>
      <p className="price">{productDetail.price}</p>
    </div>
  );
};

export default Product;
const PRODUCT_PATH = 'http://localhost:3000/images/products';
