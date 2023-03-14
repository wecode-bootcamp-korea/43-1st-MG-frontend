import React, { useState } from 'react';
import { calculatePercentage } from '../../../../functions/commonFunc';
import './MainCart.scss';

const MainCart = props => {
  //const {data, setIsOpenModal} = props;
  //우선 dev에서는 data를 만들어서 사용
  const data = { id: 1, name: '비타민D', price: 3000 };
  const { setIsOpenModal } = props;

  const [count, setCount] = useState(0);

  const handleSelect = e => {
    setCount(prev => prev + Number(e.target.value));
  };

  const handleBtn = e => {
    const { name } = e.target;
    if (name === 'btnMinus') {
      if (count === 1) return;
      else setCount(count - 1);
    } else {
      setCount(count + 1);
    }
  };

  return (
    <div className="mainCart">
      {count > 0 && (
        <div className="cartList">
          <p>{data.name}</p>
          <div className="countBtn">
            <button className="btnMinus" name="btnMinus" onClick={handleBtn}>
              -
            </button>
            <span className="quantity">{count}</span>
            <button className="btnPlus" name="btnPlus" onClick={handleBtn}>
              +
            </button>
          </div>
        </div>
      )}

      <div className="options">
        <select className="inputOptionSelect" onChange={handleSelect}>
          {OPTIONS.map(opt => {
            return (
              <option key={opt.id} value={opt.count}>
                {opt.text}
              </option>
            );
          })}
        </select>
      </div>

      <div className="totalPriceWrapper">
        <span className="txtTotalTitle">합계</span>
        <span className="txtTotalPrice">
          {calculatePercentage(count, count * data.price).toLocaleString()}원
        </span>
      </div>

      <div className="cartBtnWrapper">
        <button
          className="cancel"
          onClick={() => setIsOpenModal(prev => !prev)}
        >
          취소
        </button>
        <button className="cart">장바구니 담기</button>
      </div>
    </div>
  );
};

export default MainCart;

const OPTIONS = [
  { id: 1, count: 0, text: '-[필수] 옵션을 선택해 주세요.' },
  { id: 2, count: 1, text: '1개' },
  { id: 3, count: 5, text: '5개' },
  { id: 4, count: 10, text: '10개' },
  { id: 5, count: 30, text: '30개' },
  { id: 6, count: 50, text: '50개' },
];
