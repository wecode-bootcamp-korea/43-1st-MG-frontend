import React, { useEffect, useRef, useState } from 'react';
import './Modal.scss';

const Modal = props => {
  const modalRef = useRef();
  const [height, setHeight] = useState(
    document.body.getBoundingClientRect().height
  );
  const { usage, setIsOpenModal } = props;

  const listener = () => {
    setHeight(document.body.getBoundingClientRect().height);
  };

  const handleModal = e => {
    if (e.target.className === 'modal') setIsOpenModal(prev => !prev);
  };

  useEffect(() => {
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  });

  useEffect(() => {
    modalRef.current.style.height =
      document.body.getBoundingClientRect().height.toString() + 'px';
  }, [height]);

  return (
    <div className="modal" name="modal" ref={modalRef} onClick={handleModal}>
      <div className="contents">1</div>
    </div>
  );
};

export default Modal;
