import React, { useEffect, useRef, useState } from 'react';
import leftArrow from '../../../assets/images/slide/left-arrow.png';
import rightArrow from '../../../assets/images/slide/right-arrow.png';
import './ImgSlide.scss';

const ImgSlide = () => {
  const slideRef = useRef(null);
  const [currentImgOrder, setCurrentImgOrder] = useState(0);
  const [imgWidth, setImgWidth] = useState(0);
  const [slideData, setSlideData] = useState([]);
  const slideRange = currentImgOrder * imgWidth;

  useEffect(() => {
    setImgWidth(slideRef.current.offsetWidth);
  }, [imgWidth]);

  useEffect(() => {
    fetch('/data/slideData.json', { method: 'GET' })
      .then(res => res.json())
      .then(data => setSlideData(data));
  }, []);

  useEffect(() => {
    slideRef.current.style.transition = 'all 0.5s ease-in-out';
    slideRef.current.style.transform = `translateX(-${slideRange}px)`;
  }, [currentImgOrder, slideRange, imgWidth]);

  const moveToNextSlide = () => {
    if (currentImgOrder === slideData.length - 1) return;
    setCurrentImgOrder(currentImgOrder + 1);
  };

  const moveToPrevSlide = () => {
    if (currentImgOrder === 0) return;
    setCurrentImgOrder(currentImgOrder - 1);
  };
  return (
    <div className="imgslide">
      <div className="slideWrapper" ref={slideRef}>
        {slideData.map(item => (
          <img key={item.id} src={`${IMG_PATH}/${item.imgSrc}`} alt="pillImg" />
        ))}
      </div>

      <button onClick={moveToPrevSlide}>
        <img className="leftArrow" src={leftArrow} alt="leftImg" />
      </button>

      <button onClick={moveToNextSlide}>
        <img className="rightArrow" src={rightArrow} alt="rightImg" />
      </button>
    </div>
  );
};

export default ImgSlide;

const IMG_PATH = 'images/slide';
