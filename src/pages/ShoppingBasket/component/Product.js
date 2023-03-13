import React, { useEffect, useState } from 'react';
import closeImg from '../../../assets/images/cross.png';
import './Product.scss';

export const Product = ({ data, setData, setTotalPrice }) => {
  const [count, setCount] = useState(data.productStock);
  const [choosecount, setChoosecount] = useState(false);

  if (count < 1) {
    setCount(1);
  }

  useEffect(() => {
    setTotalPrice(prev => (prev += data.productPrice * count));
  }, []);

  const handlePrice = e => {
    const { name } = e.target;

    if (name === 'plus') {
      setCount(count + 1);
      setTotalPrice(prev => prev + data.productPrice);
    } else {
      setCount(count - 1);
      if (count > 1) {
        setTotalPrice(prev => prev - data.productPrice);
      }
    }
  };

  return (
    <div className="inCartProducts">
      <input className="inCartCheck" type="checkbox" />
      <img src="./images/github.png" alt="productImage" />
      <div product className="inCartProductName">
        <span className="productNameText">{data.productName}</span>
        <span className="productInfo">{count}개</span>
      </div>
      <div className="count">
        <div className="countInput">
          <button name="munus" onClick={handlePrice}>
            -
          </button>
          <div className="countInputText">{count}</div>
          <button name="plus" onClick={handlePrice}>
            +
          </button>
        </div>
      </div>
      <div className="productAllprice">
        {(data.productPrice * count).toLocaleString()}원
      </div>
      <img className="productdelite" src={closeImg} alt="삭제버튼" />
    </div>
  );
};
