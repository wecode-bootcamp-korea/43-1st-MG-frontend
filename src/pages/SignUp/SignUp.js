import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.scss';

const SignUp = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
    passwordAgain: '',
    name: '',
    phoneNumber: '',
    birthday: '',
    adress: '',
  });
  const {
    email,
    password,
    passwordAgain,
    name,
    phoneNumber,
    birthday,
    adress,
  } = inputValue;

  const handleInput = e => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const goToMain = () => {
    if (
      emailCheck &&
      passwordCheck &&
      passwordCheckAgain &&
      namecheck &&
      phoneNumberCheak &&
      birthdayCheck &&
      adressCheck &&
      isAllChecked
    ) {
      navigate('/');
    } else {
      alert('필수 정보를 정확하게 입력 해주세요');
    }
  };

  const emailCheck =
    !email || (email.includes('@', 5) && email.includes('.com', 9));
  const passwordCheck =
    !password ||
    new RegExp(/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})/).test(
      password
    );
  const passwordCheckAgain = !passwordAgain || password === passwordAgain;
  const namecheck = name.length >= 2;
  const phoneNumberCheak = phoneNumber.length >= 10 && phoneNumber.length <= 12;
  const birthdayCheck = birthday.length === 6;
  const adressCheck = adress.length > 8;

  const [isButtonWork, setIsButtonWork] = useState({
    agree: false,
    userInfo: false,
    age: false,
  });
  const { agree, userInfo, age } = isButtonWork;

  const isAllChecked = Object.values(isButtonWork).every(
    value => value === true
  );

  const handleCheckBox = e => {
    setIsButtonWork(prev => ({
      ...prev,
      [e.target.name]: !prev[e.target.name],
    }));
  };

  const handleAllCheck = () => {
    const checkboxKeys = Object.keys(isButtonWork);
    checkboxKeys.forEach(list => {
      return setIsButtonWork(prev => ({ ...prev, [list]: !isAllChecked }));
    });
  };

  return (
    <div className="container">
      <h1>회원가입</h1>
      <div className="required">
        <span className="pinkStar">*</span> 필수입력사항
      </div>
      <form className="signUpForm">
        <div className="email">
          <span>
            이메일<span className="pinkStar">*</span>
          </span>
          <div className="guideBox">
            <input
              value={email}
              name="email"
              placeholder="예: wisely@wisely.com"
              onChange={handleInput}
            />
            {emailCheck ? (
              ''
            ) : (
              <div className="guide">이메일 형식으로 입력해 주세요</div>
            )}
          </div>
          <button>중복확인</button>
        </div>
        <div className="password">
          <span>
            비밀번호<span className="pinkStar">*</span>
          </span>
          <div className="guideBox">
            <input
              value={password}
              name="password"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              onChange={handleInput}
            />
            {passwordCheck ? (
              ''
            ) : (
              <div className="guide">
                (영문 대소문자/숫자/특수문자 중 2가지 이상 조합. 10자~16자)
              </div>
            )}
          </div>
        </div>
        <div className="passwordCheck">
          <span>
            비밀번호확인<span className="pinkStar">*</span>
          </span>
          <div className="guideBox">
            <input
              name="passwordAgain"
              value={passwordAgain}
              type="password"
              placeholder="비밀번호를 한번 더 입력해주세요"
              onChange={handleInput}
            />
            {passwordCheckAgain ? (
              ''
            ) : (
              <div className="guide">동일한 비밀번호로 입력해 주세요</div>
            )}
          </div>
        </div>
        <div className="name">
          <span>
            이름<span className="pinkStar">*</span>
          </span>
          <input
            value={name}
            name="name"
            placeholder="이름을 입력해주세요"
            onChange={handleInput}
          />
        </div>
        <div className="gender">
          <span className="gentertext">
            성별<span className="pinkStar">*</span>
          </span>
          <div className="gerderList">
            <div className="genderbox">
              <input type="radio" name="gender" />
              <span className="genderText">남자</span>
            </div>
            <div className="genderbox">
              <input type="radio" name="gender" />
              <span className="genderText">여자</span>
            </div>
            <div className="genderbox">
              <input type="radio" name="gender" />
              <span className="genderText">선택안함</span>
            </div>
          </div>
        </div>
        <div className="phoneNumber">
          <span>
            휴대전화<span className="pinkStar">*</span>
          </span>
          <input
            value={phoneNumber}
            name="phoneNumber"
            type="number"
            placeholder="예: 01012345678"
            onChange={handleInput}
          />
          <button>중복확인</button>
        </div>
        <div className="birthday">
          <span>
            생년월일<span className="pinkStar">*</span>
          </span>
          <input
            value={birthday}
            name="birthday"
            type="number"
            placeholder="예: 950105,  6자리 입력"
            onChange={handleInput}
          />
        </div>
        <div className="adress">
          <span>
            주소<span className="pinkStar">*</span>
          </span>
          <input
            value={adress}
            name="adress"
            placeholder="도로명 주소로 입력해주세요"
            onChange={handleInput}
          />
        </div>
      </form>
      <div className="agreeArea">
        <div className="agreeInfo">
          이용약관동의 <span className="pinkStar">*</span>
        </div>

        <div className="agreeList">
          <div className="areeListCheckAll">
            <p className="check">
              <input
                type="checkbox"
                name="all"
                checked={isAllChecked}
                onChange={handleAllCheck}
              />
              <span className="text">전체 동의합니다</span>
            </p>
            <span className="textAbout">
              선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를
              이용할 수 있습니다.
            </span>
          </div>
          <p className="check1">
            <input
              type="checkbox"
              name="agree"
              checked={agree}
              onChange={handleCheckBox}
            />
            <span>[필수] 이용약관 동의</span>
          </p>
          <p className="check1">
            <input
              type="checkbox"
              name="userInfo"
              checked={userInfo}
              onChange={handleCheckBox}
            />
            <span>[필수] 개인정보 수집 및 이용 동의</span>
          </p>
          <p className="check1">
            <input
              type="checkbox"
              name="age"
              checked={age}
              onChange={handleCheckBox}
            />
            <span>[필수] 본인은 만 14세 이상입니다.</span>
          </p>
        </div>
      </div>
      <button onClick={goToMain} className="joinButton">
        가입하기
      </button>
    </div>
  );
};

export default SignUp;
