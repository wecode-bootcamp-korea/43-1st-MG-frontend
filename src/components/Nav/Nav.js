import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HomeLogo from '../../assets/images/nav/weeklyLogo.png';
import Basket from '../../assets/images/nav/shopping-bag.png';
import Search from '../../assets/images/nav/search.png';
import './Nav.scss';

const Nav = props => {
  const searchRef = useRef();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [basket, setBasket] = useState(
    JSON.parse(localStorage.getItem('basket')) || []
  );

  const [inputSearchVal, setInputSearchVal] = useState('');
  const navigate = useNavigate();
  const loginToken = localStorage.getItem('signup_token');

  const handleSearch = e => {
    if (e.type === 'click' || e.keyCode === 13) {
      setSearchKeyword(inputSearchVal);
      navigate(`/search/${inputSearchVal}`);
    }
  };

  const handleLink = (e, path) => {
    if (e.target.title === '로그아웃') {
      localStorage.removeItem('login-token');
      navigate('/');
    } else {
      navigate(path);
    }
  };

  const getCartListFetch = () => {
    fetch('http://10.58.52.209:3000/users/cart', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: loginToken,
      },
    })
      .then(response => response.json())
      .then(data => setBasket(data.data[0].products));
  };

  useEffect(() => {
    if (loginToken) getCartListFetch();
  }, []);

  const removeSearchKeyword = () => {
    searchRef.current.value = '';
  };

  return (
    <header className="nav">
      <div className="header">
        <div className="signUpLoginCs">
          <ul>
            {loginToken ? (
              <>
                {LOGIN_USER_LIST.map(list => {
                  return (
                    <li key={list.id}>
                      <span
                        className="link"
                        title={list.title}
                        onClick={e => handleLink(e, list.path)}
                      >
                        {list.title}
                      </span>
                    </li>
                  );
                })}
              </>
            ) : (
              <>
                {SIGNUP_USER_LIST.map(list => {
                  return (
                    <li key={list.id}>
                      <Link className="link" to={list.path}>
                        {list.title}
                      </Link>
                    </li>
                  );
                })}
              </>
            )}
            <li>
              <Link className="link" to="/">
                고객센터
              </Link>
            </li>
          </ul>
        </div>
        <div className="main">
          <div>
            <Link className="home" to="/">
              <img className="logo" src={HomeLogo} alt="home-logo" />
            </Link>
          </div>
          <div className="searchArea">
            <input
              type="text"
              name="search"
              className="search"
              onChange={e => setInputSearchVal(e.target.value)}
              onKeyUp={handleSearch}
              ref={searchRef}
            />
            <img
              src={Search}
              className="searchIcon"
              alt="searchIcon"
              onClick={handleSearch}
            />
          </div>
          <div className="basket">
            <Link to="/shoppingBasket">
              <img src={Basket} alt="basket" />
            </Link>
            {basket && <span className="basketCount">{basket.length}</span>}
          </div>
        </div>
      </div>
      <div className="headerCate">
        <div className="cateMenu">
          {CATE_LIST.map(cate => (
            <div className="menu" key={cate.id}>
              <span onClick={removeSearchKeyword}>
                <Link
                  className="link"
                  to={`/cateCode/${cate.id}?offset=0&limit=10`}
                >
                  <span className="cateName">{cate.name}</span>
                </Link>
              </span>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Nav;

const LOGIN_USER_LIST = [
  { id: 1, title: '마이페이지', path: '/' },
  { id: 2, title: '로그아웃', path: '/' },
];

const SIGNUP_USER_LIST = [
  { id: 1, title: '회원가입', path: '/signUp' },
  { id: 2, title: '로그인', path: '/login' },
];

const CATE_LIST = [
  { id: 0, name: 'All' },
  { id: 1, name: 'Man' },
  { id: 2, name: 'Woman' },
  { id: 3, name: 'Kids' },
];
