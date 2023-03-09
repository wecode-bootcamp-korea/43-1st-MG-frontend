import React, { useState } from 'react';
import './ShoppingBasket.scss';
import Count from '../components/Count/Count';

const ShoppingBasket = () => {
  const [count, setCount] = useState(1);
  return (
    <div className="cartContainer">
      <div className="titleArea">
        <p>장바구니</p>
      </div>
      <div className="cartlistContainer">
        <div className="cartChoose">
          <input type="checkbox" />
          <span className="cartChooseAllCheckText">전체선택(2/2)</span>
          <span className="cartBar">|</span>
          <button className="deliteButton">선택삭제</button>
        </div>
        <div className="cartDelivery">
          <span>일반배송</span>
        </div>
        <div className="cartProduct">
          {/* 상품 컴포넌트 들어올 자리 */}
          <div className="inCartProducts">
            <input className="inCartproductCheck" type="checkbox" />
            <img src="./images/github.png" alt="productImage" />
            <div product className="inCartProductName">
              <span className="productNameText">활력충전 멀티비타민</span>
              <span className="productInfo">1개</span>
            </div>
            <Count count={count} setCount={setCount} />
            <div className="productallprice">총금액</div>
            <div className="productdelite">삭제버튼</div>
          </div>
          {/* 추후 삭제 */}
          <div className="inCartProducts">
            <input className="productCheck" type="checkbox" />
            <img src="./images/github.png" alt="productImage" />
            <span className="productName">상품명</span>
            <div className="productcount">카운트</div>
            <div className="productallprice">총금액</div>
            <div className="productdelite">삭제버튼</div>
          </div>
        </div>

        <div className="cartTotalPrice">
          <div className="cartTotalPriceText">
            <span>제품가격</span> <span> 123123원</span>{' '}
            <span>+ 배송비 3,000원 = </span> <span>123123132원</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingBasket;
