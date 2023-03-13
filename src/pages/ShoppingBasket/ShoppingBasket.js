/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import './ShoppingBasket.scss';
import cartImg from '../../assets/images/shopping-cart.png';
import { Product } from './component/Product';

const ShoppingBasket = () => {
  const [productList, setProductList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectProductList, setSelectProductList] = useState([]);

  useEffect(() => {
    fetch('/data/data.json', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        setProductList(data);
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
          <input type="checkBox" className="checkAllBox" />
          <span className="cartChooseAllCheckText">
            전체선택(2/{productList.length})
          </span>
          <span className="cartBar">|</span>
        </div>
        <div className="cartDelivery">
          <span>일반배송</span>
        </div>
        <div className="cartProduct">
          {productList.map(item => {
            return (
              <Product
                data={item}
                productList={productList}
                setProductList={setProductList}
                totalPrice={totalPrice}
                setTotalPrice={setTotalPrice}
                selectProductList={selectProductList}
                setSelectProductList={setSelectProductList}
              />
            );
          })}

          <div className="cartTotalPrice">
            <div className="cartTotalPriceText">
              <span>제품가격</span>
              <span> {totalPrice.toLocaleString()}</span>
              <span>+ 배송비 {DELIV_PRICE.toLocaleString()}원 = </span>
              {(totalPrice + DELIV_PRICE).toLocaleString()}원
              <span />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingBasket;

const DELIV_PRICE = 3000;
