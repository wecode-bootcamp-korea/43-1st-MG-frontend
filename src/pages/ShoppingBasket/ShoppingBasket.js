/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import { Product } from './component/Product';
import { APIS } from '../../config';
import Modal from '../../components/Modal/Modal';
import cartImg from '../../assets/images/shopping-cart.png';
import './ShoppingBasket.scss';

const ShoppingBasket = () => {
  const [productList, setProductList] = useState([]);
  const [point, setPoint] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);

  //데이터 불러오기 fetch
  useEffect(() => {
    fetch('/data/cartListData.json')
      .then(res => res.json())
      .then(data => {
        setPoint(Number(data.data[0].point));
        setProductList(data.data[0].products);
      });
  }, []);

  const toggleSelected = value => {
    const next = productList.map(product => {
      if (product.productId === value) {
        return { ...product, checkedState: !product.checkedState };
      }
      return product;
    });

    setProductList(next);
  };

  const allCheckButtonChange = e => {
    const next = productList.map(product => {
      if (e.target.checked) return { ...product, checkedState: true };
      else return { ...product, checkedState: false };
    });
    setProductList(next);
  };

  //전체삭제 fetch작성
  const handleAllDelete = () => {
    fetch(`${APIS.deleteCartAll}`, {
      method: 'GET',
      headers: { Authorization: localStorage.getItem('login-token') },
    })
      .then(response => response.json())
      .then(data => alert('장바구니의 모든 상품이 삭제되었습니다.'));
    const allDelete = productList.map(item => item.productId);
    setProductList(productList.filter(item => item.productId === allDelete));
  };

  const howManyTrueArray = productList.filter(
    ({ checkedState = false }) => checkedState
  );

  const trueCount = howManyTrueArray.length;
  //구매하기 fetch
  const orderCartItems = () => {
    fetch(`${APIS.payment}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: localStorage.getItem('login-token'),
      },
      body: JSON.stringify({ totalPrice: totalSumPrice + DELIV_PRICE }),
    })
      .then(response => response.json())
      .then(data => console.log(data));

    setIsOpenModal(prev => !prev);
  };
  console.log(howManyTrueArray);
  const totalSumPrice = howManyTrueArray.reduce(
    (acc, cur) => acc + cur.quantity * cur.price,
    0
  );

  return (
    <div className="shoppingbasket">
      <div className="titleArea">
        <p>장바구니</p>
        <img src={cartImg} alt="cart" />
      </div>
      <div className="cartlistContainer">
        <div className="cartChoose">
          <input
            type="checkBox"
            className="checkAllBox"
            onClick={allCheckButtonChange}
          />
          <span className="cartChooseAllCheckText">
            전체선택({trueCount}/{productList.length})
          </span>
          <span className="cartBar">|</span>
          <button
            className="cartChooseAllCheckDelete"
            onClick={handleAllDelete}
          >
            전체삭제
          </button>
        </div>
        <div className="cartDelivery">
          <span>일반배송</span>
        </div>
        <div className="cartProduct">
          {productList.map(item => {
            return (
              <Product
                data={item}
                productList={productList}
                setProductList={setProductList}
                checkedState={item.checkedState}
                toggleSelected={toggleSelected}
              />
            );
          })}

          <div className="cartTotalPrice">
            <div className="cartTotalPriceText">
              <div className="cartPoint">
                <span>보유 적립금 </span>
                <span>{point.toLocaleString()}원 </span>
              </div>
              <div className="minus">
                <span>-</span>
                <span>-</span>
              </div>
              <div className="lastCartTotalPrice">
                <span>제품가격 + 배송비 </span>
                {(totalSumPrice + DELIV_PRICE).toLocaleString()}원
                <span />
              </div>
              <div className="remainsPoint">
                <span>사용 후 잔여 적립금 </span>
                <span className="cartRemainsPoint">
                  {' '}
                  {(point - (totalSumPrice + DELIV_PRICE)).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
          <button className="cartItemOrder" onClick={orderCartItems}>
            구매하기
          </button>
          {isOpenModal && <Modal setIsOpenModal={setIsOpenModal} />}
        </div>
      </div>
    </div>
  );
};

export default ShoppingBasket;

const DELIV_PRICE = 3000;
