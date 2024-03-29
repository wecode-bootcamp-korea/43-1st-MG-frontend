import React from 'react';
import Product from '../Product/Product';
import './ProductList.scss';

const ProductList = props => {
  const {
    cateId,
    filteredProducts,
    setIsOpenModal,
    loginToken,
    searchKeyword,
    setCartProduct,
  } = props;

  const listTitle = {
    0: '전체상품',
    1: '남성 영양제',
    2: '여성 영양제',
    3: '아이 영양제',
  };

  return (
    <div className="productList">
      <div className="wrapper">
        <h2 className="title">
          {searchKeyword
            ? `'${searchKeyword}'에 대한 검색 결과`
            : listTitle[cateId]}
        </h2>
        <div className="products">
          {filteredProducts.map(productDetail => (
            <Product
              key={productDetail.products_id}
              productDetail={productDetail}
              setIsOpenModal={setIsOpenModal}
              loginToken={loginToken}
              setCartProduct={setCartProduct}
            />
          ))}
        </div>
      </div>
      {/* <div className="pageNation">page : {loop()}</div> */}
    </div>
  );
};

export default ProductList;
