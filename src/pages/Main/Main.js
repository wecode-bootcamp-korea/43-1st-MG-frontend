import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import ImgSlide from './ImgSlide/ImgSlide';
import ProductList from './ProductList/ProductList';
import Modal from '../../components/Modal/Modal';
import { APIS } from '../../config';
import './Main.scss';

const Main = () => {
  const navigate = useNavigate();

  const params = useParams();
  const cateId = params.id ? Number(params.id) : 0;
  const searchKeyword = params.keyword ? params.keyword : '';

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

  const getAllProdData = () => {
    let url = '';
    if (searchKeyword)
      url = `${APIS.productsDetail}?categoryId=0&offset=0&limit=100000`;
    else
      url = `${APIS.productsDetail}?categoryId=${cateId}&offset=${offset}&limit=${limit}`;
    //const url = `/data/productsData${cateId}&${offset}&${limit}.json`;

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
          if (searchKeyword !== '') {
            const filteredProducts = data.data.filter(data =>
              data.products_name.includes(searchKeyword)
            );

            setProductsData(filteredProducts);
          } else if (offset === 0) {
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
  }, [cateId, offset, searchKeyword]);

  //카테고리별 상품 개수 조회
  useEffect(() => {
    fetch(`${APIS.productsCount}`, {
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

  const scrollListener = () => {
    if (
      document.body.scrollHeight - document.documentElement.scrollTop <=
      1420
    ) {
      const nextOffset = offset + limit;
      if (nextOffset < totalCount) {
        navigate(`/cateCode/${cateId}?offset=${nextOffset}&limit=${limit}`);
      }
    }
  };
  //무한스크롤을 적용해보자..
  useEffect(() => {
    if (!searchKeyword) {
      window.addEventListener('scroll', scrollListener);
      return () => window.removeEventListener('scroll', scrollListener);
    }
  }, [productsData]);
  return (
    <article className="main">
      <section className="slide">
        <ImgSlide />
      </section>
      <section className="products">
        {productsData && (
          <ProductList
            cateId={cateId}
            filteredProducts={productsData}
            limit={limit}
            setIsOpenModal={setIsOpenModal}
            loginToken={loginToken}
            cateTotalCount={cateTotalCount}
            searchKeyword={searchKeyword}
          />
        )}
      </section>
      {isOpenModal && (
        <Modal usage="mainCart" setIsOpenModal={setIsOpenModal} />
      )}
    </article>
  );
};

export default Main;
