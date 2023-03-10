import React, { useState } from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    id: '',
    pw: '',
  });

  const handleInput = e => {
    const { name, value } = e.target;
    setInputValue(prev => ({ ...prev, [name]: value }));
  };
  const id = inputValue.id;
  const pw = inputValue.pw;

  const isValid = id.includes('@' && '.com') && pw.length >= 5;

  const goToMain = () => {
    if (isValid) {
      navigate('/main');
    } else {
      alert('로그인 정보를 올바르게 입력하세요');
    }
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
            name="id"
            value={id}
            onChange={handleInput}
          />
          <br />
          <input
            className="loginMainInputPw"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            name="pw"
            value={pw}
            onChange={handleInput}
          />
        </div>
        <div>
          <button
            className={isValid ? 'buttonLogin' : 'buttonLoginDisabled'}
            disabled={id === '' || pw === '' ? true : false}
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
