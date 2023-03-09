import React, { useState } from 'react';
import closeImg from '../../../assets/images/cross.png';
import './Product.scss';

export const Product = props => {
  const { count, setCount } = props;
  if (count < 1) {
    setCount(1);
  }

  return (
    <div className="inCartProducts">
      <input className="inCartproductCheck" type="checkbox" />
      <img src="./images/github.png" alt="productImage" />
      <div product className="inCartProductName">
        <span className="productNameText">활력충전 멀티비타민</span>
        <span className="productInfo">1개</span>
      </div>
      <div className="count">
        <div className="countInput">
          <button
            onClick={() => {
              setCount(count - 1);
            }}
          >
            -
          </button>
          <div className="countInputText">{count}</div>
          <button
            onClick={() => {
              setCount(count + 1);
            }}
          >
            +
          </button>
        </div>
      </div>
      <div className="productAllprice">4,900원</div>
      <img className="productdelite" src={closeImg} alt="삭제버튼" />
    </div>
  );
};
