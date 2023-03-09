import React, { useState } from 'react';
import './ShoppingBasket.scss';
import cartImg from '../../assets/images/shopping-cart.png';
import Count from '../components/Count/Count';
import { Product } from './component/Product';

const ShoppingBasket = () => {
  const [count, setCount] = useState(1);
  return (
    <div className="cartContainer">
      <div className="titleArea">
        <p>장바구니</p>
        <img src={cartImg} alt="cart" />
      </div>
      <div className="cartlistContainer">
        <div className="cartChoose">
          <input type="checkbox" />
          <span className="cartChooseAllCheckText">전체선택(2/2)</span>
          <span className="cartBar">|</span>
          <button className="deliteButton">선택삭제</button>
        </div>
        <div className="cartDelivery">
          <span>일반배송</span>
        </div>
        <div className="cartProduct">
          <Product count={count} setCount={setCount} />
          <div className="cartTotalPrice">
            <div className="cartTotalPriceText">
              <span>제품가격</span> <span> 123123원</span>
              <span>+ 배송비 3,000원 = </span> <span>123123132원</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingBasket;
