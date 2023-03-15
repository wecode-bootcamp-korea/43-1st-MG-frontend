import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import ImgSlide from './ImgSlide/ImgSlide';
import ProductList from './ProductList/ProductList';
import './Main.scss';
import Modal from '../../components/Modal/Modal';

const Main = () => {
  const navigate = useNavigate();

  const params = useParams();
  const cateId = params.id ? Number(params.id) : 0;

  const [productsData, setProductsData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [cateTotalCount, setCateTotalCount] = useState([]);

  let totalCount = 0;
  if (cateTotalCount.length > 0) {
    //카테고리별 총 개수
    totalCount = cateTotalCount.filter(cate => cate.id === cateId)[0].count;
  }

  const loginToken = localStorage.getItem('login-token');

  let offset = searchParams.get('offset')
    ? Number(searchParams.get('offset'))
    : 0;
  let limit = 10;

  const url = `http://10.58.52.209:3000/products?categoryId=${cateId}&offset=${offset}&limit=${limit}`;
  //const url = `/data/productsData${cateId}&${offset}&${limit}.json`;
  const getAllProdData = () => {
    fetch(url, {
      method: 'GET',
      headers: { 'Content-type': 'application/json' },
    })
      .then(res => {
        if (res.ok) return res.json();
        else throw new Error('통신 에러 발생 !');
      })
      .then(data => {
        if (data.data.length > 0) {
          if (offset === 0) {
            document.documentElement.scrollTop = 0;
            setProductsData(data.data);
          } else {
            setProductsData([...productsData, ...data.data]);
          }
        }
      })
      .catch(err => alert(err));
  };

  useEffect(() => {
    getAllProdData();
  }, [cateId, offset]);

  //카테고리별 상품 개수 조회
  useEffect(() => {
    fetch('http://10.58.52.209:3000/products/categories/product-count', {
      method: 'GET',
      headers: { 'Content-type': 'application/json' },
    })
      .then(res => {
        if (res.ok) return res.json();
        else throw new Error(res);
      })
      .then(data => {
        const cateCnt = [];
        const cateAll = { id: 0, count: 0 };

        for (let countOfCate of data.data) {
          const dataOne = {};
          dataOne.id = countOfCate.categoryId;
          dataOne.count = Number(countOfCate.count);
          cateAll.count += Number(countOfCate.count);

          //cateTotalCount에 카테고리별 상품 수량 설정
          cateCnt.push(dataOne);
        }

        //cateTotalCount에 [전체 상품]에 대한 수량 설정 (man + women + child)
        cateCnt.push(cateAll);

        setCateTotalCount(cateCnt);
      });
  }, []);

  //무한스크롤을 적용해보자..
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (
        document.body.scrollHeight - document.documentElement.scrollTop <=
        1420
      ) {
        const nextOffset = offset + limit;
        if (nextOffset < totalCount) {
          navigate(`/cateCode/${cateId}?offset=${nextOffset}&limit=${limit}`);
        }
      }
    });
  }, [productsData]);

  return (
    <article className="main">
      <section className="slide">
        <ImgSlide />
      </section>
      <section className="products">
        <ProductList
          cateId={cateId}
          filteredProducts={productsData}
          limit={limit}
          setIsOpenModal={setIsOpenModal}
          loginToken={loginToken}
          cateTotalCount={cateTotalCount}
        />
      </section>
      {isOpenModal && (
        <Modal usage="mainCart" setIsOpenModal={setIsOpenModal} />
      )}
    </article>
  );
};

export default Main;
