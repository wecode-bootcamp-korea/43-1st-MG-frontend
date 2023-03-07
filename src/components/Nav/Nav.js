import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HomeLogo from '../../assets/images/nav/home-logo.svg';
import Basket from '../../assets/images/nav/shopping-bag.png';
import Search from '../../assets/images/nav/search.png';
import './Nav.scss';

const Nav = props => {
  const navigate = useNavigate();
  const { setSearchKeyword, basket } = props;
  const [inputSearchVal, setInputSearchVal] = useState('');
  let isLogined = localStorage.getItem('signup_token') ? true : false;

  const handleSearch = e => {
    if (e.type === 'click' || e.keyCode === 13) {
      setSearchKeyword(inputSearchVal);
    }
  };

  const logout = () => {
    localStorage.removeItem('signup_token');
    navigate('/');
  };
  return (
    <header className="nav">
      <div className="header">
        <div className="signUpLoginCs">
          <ul>
            <li>
              {isLogined ? (
                //마이페이지는 추후에 추가 구현
                <Link className="link">마이페이지</Link>
              ) : (
                <Link className="link" to="/signUp">
                  회원가입
                </Link>
              )}
            </li>
            <li>
              {isLogined ? (
                <Link className="link" onClick={logout}>
                  로그아웃
                </Link>
              ) : (
                <Link className="link" to="/login">
                  로그인
                </Link>
              )}
            </li>
            <li>
              <Link className="link" to="/">
                고객센터
              </Link>
            </li>
          </ul>
        </div>
        <div className="main">
          <div>
            <Link to="/">
              <img src={HomeLogo} alt="home-logo" />
            </Link>
          </div>
          <div className="searchArea">
            <input
              type="text"
              name="search"
              className="search"
              onChange={e => setInputSearchVal(e.target.value)}
              onKeyUp={handleSearch}
            />
            <img
              src={Search}
              className="searchIcon"
              alt="searchIcon"
              onClick={handleSearch}
            />
          </div>
          <div className="basket">
            <img src={Basket} alt="basket" />
            {basket.length > 0 && (
              <span className="basketCount">{basket.length}</span>
            )}
          </div>
        </div>
      </div>
      <div className="headerCate">
        <div className="cateMenu">
          {CATE_LIST.map(cate => (
            <div className={`menu ${cate.cn}`} key={cate.id}>
              {cate.name}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Nav;

const CATE_LIST = [
  { id: 1, name: 'All' },
  { id: 2, name: 'Women' },
  { id: 3, name: 'Man' },
  { id: 4, name: 'Child' },
];
