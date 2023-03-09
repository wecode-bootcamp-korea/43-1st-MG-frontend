import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ImgSlide from './ImgSlide/ImgSlide';
import ProductList from './ProductList/ProductList';
import './Main.scss';

const Main = () => {
  const [productsData, setProductsData] = useState([]);
  const params = useParams();
  const cateId = Number(params.id);

  useEffect(() => {
    fetch('/data/productsData.json', {
      method: 'GET',
      headers: { 'Content-type': 'application/json' },
    })
      .then(res => {
        if (res.ok) return res.json();
        else throw new Error('통신 에러 발생 !');
      })
      .then(data => setProductsData(data))
      .catch(err => alert(err));
  }, []);

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
        <ProductList cateId={cateId} filteredProducts={filteredProducts} />
      </section>
    </article>
  );
};

export default Main;
