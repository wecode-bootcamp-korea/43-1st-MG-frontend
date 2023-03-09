import React from 'react';
import { useNavigate } from 'react-router-dom';
import Basket from '../../../assets/images/main/basket.png';
import './Product.scss';

const Product = props => {
  const navigate = useNavigate();
  const { productDetail, basketList, setBasketList } = props;

  const moveToProductDetail = id => {
    navigate(`/productDetail/${id}`);
  };

  const addToBasket = () => {
    let basketData = basketList.length > 0 ? basketList : [];

    if (basketData.filter(item => item.id === productDetail.id).length > 0) {
      basketData.map(item => {
        if (item.id === productDetail.id) {
          return (item.quantity += 1);
        } else return null;
      });
    } else {
      basketData.push({ id: productDetail.id, quantity: 1 });
    }

    localStorage.setItem('basket', JSON.stringify(basketData));
    alert('상품이 장바구니에 추가되었습니다.');
    setBasketList(basketData);
  };

  return (
    <div className="product" id={productDetail.id}>
      <img
        className="thumbnail"
        src={`${PRODUCT_PATH}/${productDetail.thumbnail}`}
        alt="product-thumbnail"
        onClick={e => moveToProductDetail(productDetail.id)}
      />
      <button className="btnBasket" onClick={addToBasket}>
        <img className="imgBasket" src={Basket} alt="addToBasket" />
      </button>
      <p className="title" onClick={e => moveToProductDetail(productDetail.id)}>
        {productDetail.name}
      </p>
      <p className="price">{productDetail.price.toLocaleString('ko-KR')}원</p>
    </div>
  );
};

export default Product;
const PRODUCT_PATH = 'http://localhost:3000/images/products';
