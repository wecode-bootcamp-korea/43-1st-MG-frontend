import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductOption from './ProductOptionPrice/ProductOption';
import Share from '../../assets/images/share.png';
import question from '../../assets/images/question.png';
import { APIS } from '../../config';
import './ProductDetail.scss';

const ProductDetail = () => {
  const params = useParams();
  const { id } = params;

  const navigate = useNavigate();

  const [product, setProduct] = useState();
  const [totalPrice, setTotalPrice] = useState('');
  const [finalQuantity, setFinalQuantity] = useState(0);

  const cartBtnClick = () => {
    fetch(`${APIS.updateCartCount}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: localStorage.getItem('login-token'),
      },
      body: JSON.stringify({
        productId: id,
        quantity: finalQuantity,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === '"CREATE_CART"') {
          navigate('/shoppingBasket');
        }
      });
  };

  // useEffect(() => {
  //   fetch(`/data/${productId}.json`)
  //     .then(response => response.json())
  //     .then(result => setProduct(result[0]));
  // }, [productId]);
  console.log(`${APIS.productsDetail}/${id}`);
  useEffect(() => {
    fetch(`${APIS.productsDetail}/${id}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setProduct(data.data[0]);
      });
  }, [id]);

  return (
    <div className="productDetail">
      <div className="productExplain">
        <section className="productImg">
          <h2 className="screen_out">제품 상세페이지</h2>
          {product && (
            <img
              className="imgPlover"
              src={`${product.thumbnail}`}
              alt="github"
            />
          )}
        </section>
        <div className="productGuide">
          <div className="guideName"> {product?.categoryName}</div>
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
              <ProductOption
                product={product}
                setTotalPrice={setTotalPrice}
                setFinalQuantity={setFinalQuantity}
              />
            </div>
          </div>
          <div className="guideTotal">
            총 제품금액 :{totalPrice}
            <em />
          </div>
          <div className="guideButton">
            <button
              className="buttonBasket"
              type="button"
              onClick={() => {
                cartBtnClick();
                navigate('/shoppingBasket');
              }}
            >
              장바구니 담기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
const BASE_URL = 'http://localhost:3000/images/products';
