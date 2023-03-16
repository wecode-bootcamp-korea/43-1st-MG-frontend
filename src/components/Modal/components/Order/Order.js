import React, { useEffect, useState } from 'react';
import './Order.scss';

const Order = () => {
  const [cartList, setCartList] = useState([]);

  useEffect(() => {
    fetch('/data/data.json')
      .then(res => res.json())
      .then(data => {
        setCartList(data);
      });
  }, []);

  const onclick = () => {
    fetch('http://10.58.52.215:3000/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({ productID: 123, quentity: 5 }),
    })
      .then(response => response.json())
      //응답 alert 띄우기
      .then(data => console.log(data));
  };

  return (
    <div className="order">
      <div className="orderListMain">주문상품 정보 / 총 3개</div>
      <div className="sendproduct">
        {/* {cartList.map(item => {
          return ( */}
        <div className="cartListMap">
          <div className="cartListProductMap">상품명:1</div>
          <div className="cartListQuentityMap">수량:1</div>
        </div>
        <div className="cartListMap">
          <div>상품명:1</div>
          <div>수량:1</div>
        </div>
        <div className="cartListMap">
          <div>상품명:1</div>
          <div>수량:1</div>
        </div>
        {/* //   );
        // })} */}
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
      <button onClick={onclick}>구매하기</button>
    </div>
  );
};

export default Order;
