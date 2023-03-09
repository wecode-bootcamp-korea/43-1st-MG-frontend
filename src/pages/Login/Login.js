import React, { useState } from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [active, setActive] = useState(false);
  const navigate = useNavigate();

  const saveUserId = e => {
    setId(e.target.value);
  };
  console.log(id);

  const saveUserPw = e => {
    setPw(e.target.value);
  };
  console.log(pw);

  const goToMain = () => {
    if (id.includes('@' && '.com') && pw.length >= 5) {
      navigate('/main');
    }
  };

  const activeIsPassedLogin = () => {
    return id.includes('@' && '.com') && pw.length >= 5
      ? setActive(true)
      : setActive(false);
  };
  return (
    <div className="login">
      <div className="loginWelcome">
        <p>
          <strong>로그인 및 회원가입을</strong>
          <br />
          <strong>시작합니다.</strong>
        </p>
      </div>
      <form className="loginMain">
        <div>
          <input
            className="loginMainInputId"
            type="text"
            placeholder="이메일을 입력해주세요"
            onChange={saveUserId}
          />
          <br />
          <input
            className="loginMainInputPw"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            onChange={saveUserPw}
            onKeyUp={activeIsPassedLogin}
          />
        </div>
        <div>
          <button
            className={active ? 'buttonLogin' : 'buttonLoginDisabled'}
            disabled={id === '' || pw === '' ? true : false}
            onClick={goToMain}
            onKeyUp={activeIsPassedLogin}
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
