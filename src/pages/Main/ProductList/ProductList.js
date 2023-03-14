import React from 'react';
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
          <Link
            className="pageBtn"
            to={`/cateCode/${cateId}?offset=${i * 10}&limit=${limit}`}
          >
            {i + 1}
          </Link>
        </button>
      );
    }
    return result;
  };

  const listTitle = {
    0: '전체상품',
    1: '여성 영양제',
    2: '남성 영양제',
    3: '아이 영양제',
  };

  return (
    <div className="productList">
      <div className="wrapper">
        <h2 className="title">{listTitle[cateId]}</h2>
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
      <div className="pageNation">page : {loop()}</div>
    </div>
  );
};

export default ProductList;
