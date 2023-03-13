import React, { useEffect, useState } from 'react';
import closeImg from '../../../assets/images/cross.png';
import './Product.scss';

export const Product = ({
  data,
  productList,
  setProductList,
  setTotalPrice,
}) => {
  const [count, setCount] = useState(data.productStock);
  const [isCheck, setsetProductList] = useState(false);

  if (count < 1) {
    setCount(1);
  }

  useEffect(() => {
    setTotalPrice(prev => (prev += data.productPrice * count));
  }, []);
  const handleName = e => {
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
          <button name="minus" onClick={handleName}>
            -
          </button>
          <div className="countInputText">{count}</div>
          <button name="plus" onClick={handleName}>
            +
          </button>
        </div>
      </div>
      <div className="productAllprice">
        {(data.productPrice * count).toLocaleString()}원
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
