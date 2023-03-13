import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import ImgSlide from './ImgSlide/ImgSlide';
import ProductList from './ProductList/ProductList';
import './Main.scss';

const Main = () => {
  const [productsData, setProductsData] = useState([]);
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const cateId = params.id ? Number(params.id) : 0;
  let offset = searchParams.get('offset')
    ? Number(searchParams.get('offset'))
    : 0;
  let limit = 10;

  //실제 통신
  //const prdUrl = `http://10.58.52.79:3000/products?categoryId=${cateId}&offset=${offset}&limit=${limit}`;

  //dev 통신
  const devUrl = `/data/productsData${cateId}&${offset}&${limit}.json`;

  useEffect(() => {
    fetch(devUrl, {
      method: 'GET',
      headers: { 'Content-type': 'application/json' },
    })
      .then(res => {
        if (res.ok) return res.json();
        else throw new Error('통신 에러 발생 !');
      })
      .then(data => {
        if (data.data.length > 0) {
          setProductsData(data.data);
        }
      })
      .catch(err => alert(err));
  }, [offset]);

  const filteredProducts = productsData.filter(product => {
    if (cateId) return product.category_id === cateId;
    else return productsData;
  });

  return (
    <article className="main">
      <section className="slide">
        <ImgSlide />
      </section>
      <section className="products">
        <ProductList
          cateId={cateId}
          filteredProducts={filteredProducts}
          limit={limit}
        />
      </section>
    </article>
  );
};

export default Main;
