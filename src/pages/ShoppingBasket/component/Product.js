import React, { useEffect, useState } from 'react';
import closeImg from '../../../assets/images/cross.png';
import './Product.scss';

export const Product = ({
  data, //객체 하나하나의 값
  productList, // 배열 전체
  setProductList,
}) => {
  const handleCount = value => {
    if (Number(data.productStock) + value === 0) return;

    const newArray = productList.map(product => {
      const { productId, productStock } = product;
      if (productId === data.productId)
        return { ...product, productStock: productStock + value };
      return product;
    });
    setProductList(newArray);
  };

  function onRemove(id) {
    setProductList(productList.filter(item => item.productId !== id));
  }

  return (
    <div className="inCartProducts" key={data.productId}>
      <input className="inCartCheck" type="checkbox" value={data.productId} />
      <img src="./images/github.png" alt="productImage" />
      <div product className="inCartProductName">
        <span className="productNameText">{data.productName}</span>
        <span className="productInfo">
          1개:&nbsp;&nbsp;{data.productPrice.toLocaleString()}원
        </span>
      </div>
      <div className="count">
        <div className="countInput">
          <button
            onClick={() => {
              handleCount(-1);
            }}
          >
            -
          </button>
          <div className="countInputText">{data.productStock}</div>
          <button
            onClick={() => {
              handleCount(1);
            }}
          >
            +
          </button>
        </div>
      </div>
      <div className="productAllprice">
        {(data.productPrice * data.productStock).toLocaleString()}원
      </div>
      <img
        name={data.productId}
        className="productdelite"
        src={closeImg}
        alt="삭제버튼"
        onClick={() => onRemove(data.productId)}
      />
    </div>
  );
};
