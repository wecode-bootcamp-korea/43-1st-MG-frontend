import React from 'react';
import closeImg from '../../../assets/images/cross.png';
import './Product.scss';

export const Product = ({
  data,
  productList,
  setProductList,
  checkedState,
  toggleSelected,
}) => {
  const handleCount = value => {
    if (Number(data.quantity) + value === 0) return;

    const newArray = productList.map(product => {
      const { productId, quantity } = product;
      if (productId === data.productId)
        return { ...product, quantity: quantity + value };
      return product;
    });
    setProductList(newArray);
  };

  // function onRemove(id) {
  //   setProductList(productList.filter(item => item.productId !== id));

  function onRemove(id) {
    fetch('http://10.58.52.215:3000', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify(
        setProductList(productList.filter(item => item.productId !== id))
      ),
    }).then(response => response.json());
  }

  return (
    <div className="inCartProducts" key={data.productId}>
      <input
        className="inCartCheck"
        type="checkbox"
        value={data.productId}
        checked={checkedState}
        onChange={() => toggleSelected(data.productId)}
      />
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
          <div className="countInputText">{data.quantity}</div>
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
        {(data.productPrice * data.quantity).toLocaleString()}원
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
