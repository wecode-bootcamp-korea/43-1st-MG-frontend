import React from 'react';
import './Order.scss';

const Order = () => {
  return (
    <div className="order">
      <div className="orderListMain">주문상품 정보 / 총 3개</div>
      <div className="sendproduct">
        <div>
          <div>상품명:1</div>
          <div>수량:1</div>
        </div>
        <div>
          <div>상품명:1</div>
          <div>수량:1</div>
        </div>
        <div>
          <div>상품명:1</div>
          <div>수량:1</div>
        </div>
      </div>
      <div className="orderListInfo">
        <div className="orderListInfoKey">
          <p>총 상품금액</p>
          <p>배송비</p>
          <p>사용가능 적립금</p>
          <div className="lastprice">총 결제금액</div>
        </div>
        <div className="orderListInfoValue">
          <p>147,000원</p>
          <p>+ 3,000원</p>
          <p>200,000원</p>
          <div className="lastpriceValue">150,000원</div>
        </div>
      </div>
      <button>구매하기</button>
    </div>
  );
};

export default Order;
