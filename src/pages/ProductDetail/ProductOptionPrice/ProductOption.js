import React from 'react';
import { calculatePercentage } from '../../../functions/commonFunc';

const ProductOption = props => {
  const { product, setTotalPrice, setFinalQuantity } = props;
  const calculateTotalPrice = e => {
    let selectedEvent = e.target.value;
    setFinalQuantity(Number(e.target[selectedEvent].innerText.split('개 ')[0]));
    setTotalPrice(e.target[selectedEvent].innerText.split('개 ')[1]);
  };
  return (
    <select className="boxChoice" onChange={calculateTotalPrice}>
      <option value="0">-[필수] 옵션을 선택해 주세요.</option>
      {PRODUCT.map(info => (
        <option key={info.id} value={info.id}>
          {info.quantity}개{' '}
          {`${calculatePercentage(
            info.quantity,
            product?.price * info.quantity
          ).toLocaleString()}`}
          원
        </option>
      ))}
    </select>
  );
};

export default ProductOption;

const PRODUCT = [
  { id: 1, quantity: 1 },
  { id: 2, quantity: 5 },
  { id: 3, quantity: 10 },
  { id: 4, quantity: 30 },
  { id: 5, quantity: 50 },
];
