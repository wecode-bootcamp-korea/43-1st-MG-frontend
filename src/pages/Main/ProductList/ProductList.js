import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Product from '../Product/Product';
import './ProductList.scss';

const ProductList = props => {
  const { cateId, filteredProducts, limit, location, setIsOpenModal } = props;
  const loop = () => {
    const result = [];
    for (let i = 0; i < 3; i++) {
      result.push(
        <button>
          <Link to={`/cateCode/${cateId}?offset=${i * 10}&limit=${limit}`}>
            {i + 1}
          </Link>
        </button>
      );
    }
    return result;
  };

  let title = '';
  switch (cateId) {
    case 0:
      title = '전체상품';
      break;
    case 1:
      title = '여성 영양제';
      break;
    case 2:
      title = '남성 영양제';
      break;
    case 3:
      title = '아이 영양제';
      break;
    default:
      title = '전체상품';
      break;
  }
  return (
    <div className="productList">
      <div className="wrapper">
        <h2 className="title">{title}</h2>
        <div className="products">
          {filteredProducts.map(productDetail => (
            <Product
              key={productDetail.products_id}
              productDetail={productDetail}
              location={location}
              setIsOpenModal={setIsOpenModal}
            />
          ))}
        </div>
      </div>
      <div>{loop()}</div>
    </div>
  );
};

export default ProductList;
