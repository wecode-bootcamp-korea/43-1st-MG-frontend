import React, { useState } from 'react';
import { SIGNUP_INPUT_LIST } from './signupInPutList';
import './SignUp.scss';

const SignUp = () => {
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    userName: '',
    gender: 'nothing',
    phoneNumber: '',
    birth: '',
    adress: '',
  });

  const {
    email,
    password,
    passwordConfirm,
    userName,
    phoneNumber,
    birth,
    adress,
  } = inputValue;

  console.log(inputValue);

  const handleInput = e => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

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

  const conditions = {
    emailCheck:
      !email ||
      new RegExp(
        /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
      ).test(email),

    passwordCheck:
      !password ||
      new RegExp(/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})/).test(
        password
      ),
    passwordAgainCheck: !passwordConfirm || password === passwordConfirm,
    userNamecheck: userName.length >= 2,
    phoneNumberCheak: phoneNumber.length >= 10 && phoneNumber.length <= 12,
    birthCheck: birth.length === 6,
    adressCheck: adress.length > 8,
  };

  const activeButton = Object.values(conditions).every(value => value === true);
  console.log('as', activeButton);

  const goToMain = () => {
    if (activeButton && isAllChecked) {
      fetch('http://10.58.52.73:8000/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(inputValue),
      }).then(response => response.json());
      alert('가입이 완료되었습니다. 즐거운 쇼핑 되세요!');
    } else {
      alert('필수 정보를 정확하게 입력 해주세요!');
    }
  };

  return (
    <div className="signUp">
      <h1>회원가입</h1>
      <div className="required">
        <span className="pinkStar">*</span> 필수입력사항
      </div>
      <form className="signUpForm">
        {SIGNUP_INPUT_LIST.map(list => {
          return (
            <div className="inputWarp" key={list.id}>
              {list.title === '성별' ? (
                <>
                  <span className="gentertext">
                    성별<span className="pinkStar">*</span>
                  </span>
                  <div className="gerderList">
                    {GENDER_CHECK.map(gender => {
                      return (
                        <div key={gender.id} className="genderbox">
                          <input
                            type="radio"
                            name="gender"
                            value={gender.value}
                            checked={inputValue.gender === gender.value}
                            onChange={handleInput}
                          />
                          <span className="genderText">{gender.text}</span>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <>
                  <span>
                    {list.title}
                    <span className="pinkStar">*</span>
                  </span>
                  <div className="guideBox">
                    <input
                      className="userInput"
                      value={inputValue[list.name]}
                      name={list.name}
                      placeholder={list.placeholder}
                      onChange={handleInput}
                      type={list.type}
                    />
                    {conditions[list.check] ? (
                      ''
                    ) : (
                      <div className="guide">{list.errorMsg}</div>
                    )}
                  </div>
                  {list.title === '이메일' && <button>중복확인</button>}
                </>
              )}
            </div>
          );
        })}
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

const GENDER_CHECK = [
  { id: 1, text: '남자', value: 'male' },
  { id: 2, text: '여자', value: 'female' },
  { id: 3, text: '선택안함', value: 'nothing' },
];
