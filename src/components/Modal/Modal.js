import React, { useEffect, useRef, useState } from 'react';
import MainCart from './components/MainCart/MainCart';
import Order from './components/Order/Order';
import './Modal.scss';

const Modal = props => {
  const modalRef = useRef();
  const [height, setHeight] = useState(
    document.body.getBoundingClientRect().height
  );

  //usage : 모달창을 어떤 목적으로 사용할 것인지 구분하기 위한 변수
  const { /*usage,*/ setIsOpenModal, data } = props;

  //메인 - 장바구니 개발중
  //나중에 usage는 삭제하고 props에서 받아 씁시다!
  const usage = 'order';

  const listener = () => {
    setHeight(document.body.getBoundingClientRect().height);
  };

  const handleModal = e => {
    if (e.target.className === 'modal') setIsOpenModal(prev => !prev);
  };

  useEffect(() => {
    //화면 크기가 달라질 때마다 모달 크기도 조절한다.
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  });

  useEffect(() => {
    modalRef.current.style.height =
      document.body.getBoundingClientRect().height.toString() + 'px';
  }, [height]);

  return (
    <div className="modal" name="modal" ref={modalRef} onClick={handleModal}>
      <article className="contents">
        {usage === 'mainCart' ? (
          <MainCart data={data} setIsOpenModal={setIsOpenModal} />
        ) : (
          <Order />
        )}
      </article>
    </div>
  );
};

export default Modal;
