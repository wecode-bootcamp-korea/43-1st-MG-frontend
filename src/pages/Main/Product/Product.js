import React from 'react';
import { useNavigate } from 'react-router-dom';

import Basket from '../../../assets/images/main/basket.png';
import './Product.scss';

const Product = props => {
  const navigate = useNavigate();
  const { productDetail, setIsOpenModal } = props;

  const moveToProductDetail = id => {
    navigate(`/productDetail/${id}`);
  };

  const openModal = () => {
    setIsOpenModal(prev => !prev);
  };
  return (
    <div className="product" id={productDetail.products_id}>
      <img
        className="thumbnail"
        src={`${PRODUCT_PATH}/${productDetail.thumbnail}.jpg`}
        alt="product-thumbnail"
        onClick={e => moveToProductDetail(productDetail.products_id)}
      />
      <button className="btnBasket">
        <img
          className="imgBasket"
          src={Basket}
          alt="addToBasket"
          onClick={openModal}
        />
      </button>
      <p className="title" onClick={e => moveToProductDetail(productDetail.id)}>
        {productDetail.products_name}
      </p>
      <p className="price">{productDetail.price.toLocaleString('ko-KR')}원</p>
    </div>
  );
};

export default Product;
const PRODUCT_PATH = 'http://localhost:3000/images/products';
