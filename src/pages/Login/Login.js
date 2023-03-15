import React, { useState } from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
  });
  const { email, password } = inputValue;

  const handleInput = e => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };
  const isValid = email.includes('@' && '.com') && password.length >= 5;

  const goToMain = () => {
    console.log(email, password);
    if (isValid) {
      fetch('http://10.58.52.209:3000/users/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8', //필수로 넣어야함
        },
        body: JSON.stringify({
          // 자바스크립트를 json 형태로 보내는 것
          email: inputValue.email,
          password: inputValue.password,
        }),
      }) //요청
        .then(response => response.json())
        .then(response => {
          if (response.ACCESS_TOKEN) {
            localStorage.setItem('login-token', response.ACCESS_TOKEN);
          }
        // .then(data => console.log(data));
      navigate('/main');
    }); else {
      alert('로그인 정보를 올바르게 입력하세요');
    };
  };

  return (
    <div className="login">
      <div className="loginWelcome">
        <p>로그인 및 회원가입을 시작합니다.</p>
      </div>
      <form className="loginMain">
        <div>
          <input
            className="loginMainInputId"
            type="text"
            placeholder="이메일을 입력해주세요"
            name="email"
            value={email}
            onChange={handleInput}
          />
          <br />
          <input
            className="loginMainInputPw"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            name="password"
            value={password}
            onChange={handleInput}
          />
        </div>
        <div>
          <button
            className={isValid ? 'buttonLogin' : 'buttonLoginDisabled'}
            disabled={email === '' || password === '' ? true : false}
            onClick={goToMain}
          >
            로그인
          </button>
          <br />
          <button
            className="loginButtonMake"
            onClick={() => {
              navigate('/signup');
            }}
          >
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
};
export default Login;
