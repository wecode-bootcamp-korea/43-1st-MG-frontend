import React, { useEffect, useState } from 'react';
import { APIS } from '../../../../config';
import delivery from '../../../../assets/images/delivery-truck.png';
import './Order.scss';

const Order = ({ setIsOpenModal }) => {
  const onclick = () => {
    setIsOpenModal(prev => !prev);
  };

  return (
    <div className="order">
      <div className="message">
        <p>구매가 완료되었습니다.</p>
        <p>고객님의 건강함이 </p>
        <p>곧 배송될 예정입니다.</p>
        <img src={delivery} />
      </div>
      <div className="boxOk">
        <button className="okBtn" onClick={onclick}>
          확인
        </button>
      </div>
    </div>
  );
};

export default Order;
