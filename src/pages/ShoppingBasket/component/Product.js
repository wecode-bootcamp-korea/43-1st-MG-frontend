import React, { useState } from 'react';
import closeImg from '../../../assets/images/cross.png';
import './Product.scss';

export const Product = ({ data, setData }) => {
  const [count, setCount] = useState(1);
  if (count < 1) {
    setCount(1);
  }

  return (
    <div className="inCartProducts">
      <input className="inCartproductCheck" type="checkbox" />
      <img src="./images/github.png" alt="productImage" />
      <div product className="inCartProductName">
        <span className="productNameText">{data.productName}</span>
        <span className="productInfo">{count}개</span>
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
      <div className="productAllprice">
        {data.productPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
      </div>
      <img className="productdelite" src={closeImg} alt="삭제버튼" />
    </div>
  );
};
