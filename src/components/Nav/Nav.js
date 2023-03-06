import React from 'react';
import HomeLogo from '../../assets/images/nav/home-logo.svg';
import Basket from '../../assets/images/nav/shopping-bag.png';
import './Nav.scss';

const Nav = () => {
  return (
    <header className="nav">
      <div className="header">
        <div className="signUpLoginCs">
          <ul>
            <li>회원가입</li>
            <li>로그인</li>
            <li>고객센터</li>
          </ul>
        </div>
        <div className="main">
          <div>
            <img src={HomeLogo} alt="home-logo" />
          </div>
          <div className="searchArea">
            <input type="text" className="search" />
          </div>
          <div className="icons">
            <img src={Basket} alt="basket" />
          </div>
        </div>
      </div>
      <div className="headerCate" />
    </header>
  );
};

export default Nav;
