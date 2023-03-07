import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Modal from './components/Modal/Modal';
import Nav from './components/Nav/Nav';
import Login from './pages/Login/Login';
import Main from './pages/Main/Main';
import Payment from './pages/Payment/Payment';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import ShoppingBasket from './pages/ShoppingBasket/ShoppingBasket';
import SignUp from './pages/SignUp/SignUp';

const Router = () => {
  //Nav 검색키워드
  const [searchKeyword, setSearchKeyword] = useState('');
  //장바구니에 담긴 상품 수
  const [basket, setBasket] = useState([]);
  //Nav에서 선택한 카테고리 - 초기 값 All. 카테고리를 클릭할 때마다 main컴포넌트에서 리스팅되는 상품이 달라진다.
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <BrowserRouter>
      <Nav
        setSearchKeyword={setSearchKeyword}
        basket={basket}
        setSelectedCategory={setSelectedCategory}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Main
              searchKeyword={searchKeyword}
              setBasket={setBasket}
              selectedCategory={selectedCategory}
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/productDetail" element={<ProductDetail />} />
        <Route
          path="/shoppingBasket"
          element={<ShoppingBasket basket={basket} setBasket={setBasket} />}
        />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
