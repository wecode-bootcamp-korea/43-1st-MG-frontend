/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import './ShoppingBasket.scss';
import cartImg from '../../assets/images/shopping-cart.png';
import { Product } from './component/Product';

const ShoppingBasket = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/data/data.json', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        setData(data);
      });
  }, []);

  return (
    <div className="cartContainer">
      <div className="titleArea">
        <p>장바구니</p>
        <img src={cartImg} alt="cart" />
      </div>
      <div className="cartlistContainer">
        <div className="cartChoose">
          <input type="checkbox" />
          <span className="cartChooseAllCheckText">
            전체선택(2/{data.length})
          </span>
          <span className="cartBar">|</span>
          <button className="deliteButton">선택삭제</button>
        </div>
        <div className="cartDelivery">
          <span>일반배송</span>
        </div>
        <div className="cartProduct">
          {data.map(data => {
            return <Product data={data} setData={setData} />;
          })}

          <div className="cartTotalPrice">
            <div className="cartTotalPriceText">
              <span>제품가격</span>
              <span> 123123원</span>
              <span>+ 배송비 3,000원 = </span> <span>123123132원</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingBasket;
