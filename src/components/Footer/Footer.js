import React from 'react';
import { useNavigate } from 'react-router-dom';
import KakaoTalk from '../../assets/images/footer/kakao-talk.png';
import './Footer.scss';

const Footer = () => {
  const loginToken = localStorage.getItem('signup_token');
  const navigate = useNavigate();
  const handleLink = id => {
    if (id === 1) {
      //로그인 or 로그아웃
      if (!loginToken) navigate('/login');
      else {
        localStorage.removeItem('signup_token');
        navigate('/');
      }
    } else {
      navigate('/');
    }
  };
  return (
    <div className="footer">
      <div className="container">
        <div className="top">
          <ul>
            {loginToken ? (
              <>
                {FOOTER_TOP_ITEMS_LOGINED.map(footerTopItem => {
                  return (
                    <span
                      key={footerTopItem.id}
                      onClick={() => handleLink(footerTopItem.id)}
                      className="footerTopItem"
                    >
                      <li>{footerTopItem.text}</li>
                    </span>
                  );
                })}
              </>
            ) : (
              <>
                {FOOTER_TOP_ITEMS_NOT_LOGINED.map(footerTopItem => {
                  return (
                    <span
                      key={footerTopItem.id}
                      onClick={() => handleLink(footerTopItem.id)}
                      className="footerTopItem"
                    >
                      <li>{footerTopItem.text}</li>
                    </span>
                  );
                })}
              </>
            )}
          </ul>
        </div>
        <hr />
        <div className="middle">
          <div className="companyInfo">
            <pre>
              (주)wecode 사업자정보 <br />
              <br />
              서울특별시 강남구 테헤란로 427, 10층(삼성동) 대표자: 송은우
              <br />
              사업자 등록번호: 530-81-01310, 통신판매업신고번호:
              2022-서울강남-06094
              <br />
              개인정보보호책임자: 송은우
              <br />
              E-mail: abcd1234@naver.com
              <br />
              제휴문의: efgh1234@naver.com
            </pre>
            <div className="footerBottom">
              {FOOTER_BOTTOM_ITEMS.map(footerBottomItem => (
                <span className="footerBottomItem" key={footerBottomItem.id}>
                  {footerBottomItem.text}
                </span>
              ))}
            </div>
          </div>
          <div className="consult">
            <img
              className="kakaoTalkImg"
              src={KakaoTalk}
              alt="kakaoTalkImage"
            />
            <p className="kakaoTalkChannel">카카오톡 채널 '위클리'</p>
            <div className="cs">
              <span>고객센터|1111-2222</span>
              <div>
                <span>[ 평일 ] 오전 10시 ~ 오후 9시</span>
                <span>[ 점심시간 ] 오후 12시 ~ 1시 반</span>
              </div>
            </div>
            <p className="copyright">
              ©2023. Wecode Company, Co., Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

const FOOTER_TOP_ITEMS_NOT_LOGINED = [
  { id: 1, text: '로그인' },
  { id: 2, text: '고객센터' },
  { id: 3, text: '브랜드 스토리' },
  { id: 4, text: '블로그' },
  { id: 5, text: '인재채용' },
];

const FOOTER_TOP_ITEMS_LOGINED = [
  { id: 1, text: '로그아웃' },
  { id: 2, text: '고객센터' },
  { id: 3, text: '브랜드 스토리' },
  { id: 4, text: '블로그' },
  { id: 5, text: '인재채용' },
];

const FOOTER_BOTTOM_ITEMS = [
  { id: 1, text: '개인정보 처리 방침' },
  { id: 2, text: '이용안내' },
  { id: 3, text: '사업자정보확인' },
  { id: 4, text: '이용약관' },
  { id: 5, text: '이메일무단수집거부' },
];
