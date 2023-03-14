import React, { useEffect, useState } from 'react';
import './ProductDetail.scss';
import Share from '../../assets/images/share.png';
import question from '../../assets/images/question.png';
import plover from '../../assets/images/plover.png';
import { useParams } from 'react-router-dom';
import ProductOption from './ProductOptionPrice/ProductOption';

const ProductDetail = () => {
  const params = useParams();
  const { productId } = params;

  const [product, setProduct] = useState();
  console.log(product);
  useEffect(() => {
    fetch(`/data/${productId}.json`)
      .then(response => response.json())
      .then(result => setProduct(result.data));
  }, [productId]);
  return (
    <div className="productDetail">
      <div className="productExplain">
        <section className="productImg">
          <h2 className="screen_out">제품 상세페이지</h2>
          <img className="imgPlover" src={plover} alt="github" />
        </section>
        <div className="productGuide">
          <div className="guideName"> {product?.categoryId}</div>
          <div className="guideSubName">
            {/* 면역.피로개선 홍삼 */}
            {product?.productName}
            <img className="subNameShare" src={Share} alt="share" />
          </div>
          <div className="guideExplain">
            {/* 면역력 증진과 피로개선에 도움 */}
            {product?.description}
          </div>
          <div className="guideSend">
            배송비 정책
            <img className="sendNameQuestion" src={question} alt="share" />
          </div>
          <div className="guideQuantity">
            <div className="quantityBox">
              <span>수량</span>
              <select className="boxChoice">
                <option selected>-[필수] 옵션을 선택해 주세요.</option>
                <ProductOption product={product} />
              </select>
            </div>
          </div>
          <div className="guideTotal">
            총 제품금액
            <em>123</em>
          </div>
          <div className="guideButton">
            <button className="buttonBasket" type="button">
              장바구니
            </button>
            <button className="buttonBuy" type="button">
              구매하기
            </button>
          </div>
        </div>
      </div>
    </div>
    // )}}
  );
};

export default ProductDetail;
