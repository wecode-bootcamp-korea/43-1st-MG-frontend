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
    address: '',
    point: 0,
  });

  const {
    email,
    password,
    passwordConfirm,
    userName,
    phoneNumber,
    birth,
    address,
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
    adressCheck: address.length > 8,
  };

  const activeButton = Object.values(conditions).every(value => value === true);

  const goToMain = () => {
    if (activeButton && isAllChecked) {
      fetch('http://10.58.52.215:3000/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(inputValue),
      }).then(response => response.json());
      alert('????????? ?????????????????????. ????????? ?????? ?????????!');
    } else {
      alert('?????? ????????? ???????????? ?????? ????????????!');
    }
  };

  return (
    <div className="signUp">
      <h1>????????????</h1>
      <div className="required">
        <span className="pinkStar">*</span> ??????????????????
      </div>
      <form className="signUpForm">
        {SIGNUP_INPUT_LIST.map(list => {
          return (
            <div className="inputWarp" key={list.id}>
              {list.title === '??????' ? (
                <>
                  <span className="gentertext">
                    ??????<span className="pinkStar">*</span>
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
                  {list.title === '?????????' && <button>????????????</button>}
                </>
              )}
            </div>
          );
        })}
      </form>
      <div className="agreeArea">
        <div className="agreeInfo">
          ?????????????????? <span className="pinkStar">*</span>
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
              <span className="text">?????? ???????????????</span>
            </p>
            <span className="textAbout">
              ??????????????? ???????????? ?????? ????????? ???????????? ??? ???????????? ????????????
              ????????? ??? ????????????.
            </span>
          </div>
          <p className="check1">
            <input
              type="checkbox"
              name="agree"
              checked={agree}
              onChange={handleCheckBox}
            />
            <span>[??????] ???????????? ??????</span>
          </p>
          <p className="check1">
            <input
              type="checkbox"
              name="userInfo"
              checked={userInfo}
              onChange={handleCheckBox}
            />
            <span>[??????] ???????????? ?????? ??? ?????? ??????</span>
          </p>
          <p className="check1">
            <input
              type="checkbox"
              name="age"
              checked={age}
              onChange={handleCheckBox}
            />
            <span>[??????] ????????? ??? 14??? ???????????????.</span>
          </p>
        </div>
      </div>
      <button onClick={goToMain} className="joinButton">
        ????????????
      </button>
    </div>
  );
};

export default SignUp;

const GENDER_CHECK = [
  { id: 1, text: '??????', value: 'male' },
  { id: 2, text: '??????', value: 'female' },
  { id: 3, text: '????????????', value: 'nothing' },
];
