import React from 'react';
import closeImg from '../../../assets/images/cross.png';
import { APIS } from '../../../config';
import './Product.scss';

export const Product = ({
  data,
  productList,
  setProductList,
  checkedState,
  toggleSelected,
}) => {
  //수량변경 fetch
  const handleCount = value => {
    if (Number(data.quantity) + value === 0) return;
    const newArray = productList.map(product => {
      const { productId, quantity } = product;
      if (productId === data.productId)
        return { ...product, quantity: quantity + value };
      return product;
    });
    setProductList(newArray);
    fetch(`${APIS.updateCartCount}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: localStorage.getItem('login-token'),
      },
      body: JSON.stringify({
        productId: data.productId,
        quantity: data.quantity,
      }),
    });
  };

  //선택삭제 fetch작성
  function onRemove(id) {
    setProductList(productList.filter(item => item.productId !== id));
    fetch(`${APIS.updateCartCount}?productId=${data.productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: localStorage.getItem('login-token'),
      },
    })
      .then(response => response.json())
      .then(data => alert('선택하신 상품이 삭제되었습니다.'));
  }

  return (
    <div className="inCartProducts">
      <input
        key={data.productId}
        className="inCartCheck"
        type="checkbox"
        value={data.productId}
        checked={checkedState}
        onChange={() => toggleSelected(data.productId)}
      />
      <img src={data.productThumbnail} alt="productImage" />

      <div product className="inCartProductName">
        <span className="productNameText">{data.productName}</span>
        <span className="productInfo">
          1개:&nbsp;&nbsp;{data.price.toLocaleString()}원
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
        {(data.price * data.quantity).toLocaleString()}원
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
