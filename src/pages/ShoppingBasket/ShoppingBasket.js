/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import './ShoppingBasket.scss';
import cartImg from '../../assets/images/shopping-cart.png';
import { Product } from './component/Product';

const ShoppingBasket = () => {
  const [productList, setProductList] = useState([]);

  const toggleSelected = value => {
    const next = productList.map(product => {
      if (product.productId === value) {
        return { ...product, checkedState: !product.checkedState };
      }
      return product;
    });

    setProductList(next);
  };

  const allCheckButtonChange = e => {
    const next = productList.map(product => {
      if (e.target.checked) return { ...product, checkedState: true };
      else return { ...product, checkedState: false };
    });
    setProductList(next);
  };

  const howManyTrueArray = productList.filter(row => {
    if (row.checkedState)
      return { productId: row.productId, quantity: row.quantity };
  });
  const trueCount = howManyTrueArray.length;

  useEffect(() => {
    fetch('/data/data.json')
      .then(res => res.json())
      .then(data => {
        setProductList(data);
      });
  }, []);

  const totalSumPrice = howManyTrueArray.reduce(
    (acc, cur) => acc + cur.quantity * cur.productPrice,
    0
  );

  return (
    <div className="shoppingbasket">
      <div className="titleArea">
        <p>장바구니</p>
        <img src={cartImg} alt="cart" />
      </div>
      <div className="cartlistContainer">
        <div className="cartChoose">
          <input
            type="checkBox"
            className="checkAllBox"
            onClick={allCheckButtonChange}
          />
          <span className="cartChooseAllCheckText">
            전체선택({trueCount}/{productList.length})
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
                checkedState={item.checkedState}
                toggleSelected={toggleSelected}
              />
            );
          })}

          <div className="cartTotalPrice">
            <div className="cartTotalPriceText">
              <span>제품가격</span>
              <span> {totalSumPrice.toLocaleString()}</span>
              <span>+ 배송비 {DELIV_PRICE.toLocaleString()}원 = </span>
              {(totalSumPrice + DELIV_PRICE).toLocaleString()}원
              <span />
            </div>
          </div>
          <button className="cartItemOrder">구매하기</button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingBasket;

const DELIV_PRICE = 3000;
