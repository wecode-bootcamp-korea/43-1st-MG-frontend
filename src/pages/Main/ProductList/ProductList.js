import React from 'react';
import Product from '../Product/Product';
import './ProductList.scss';

const ProductList = props => {
  const { cateId, filteredProducts } = props;

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
      <div className="productListWrapper">
        <h2 className="productListTitle">{title}</h2>
        <div className="products">
          {filteredProducts.map(productDetail => (
            <Product key={productDetail.id} productDetail={productDetail} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
