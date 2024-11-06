import React, { useEffect } from 'react';
import './Healthcare.css';
import { Route, Routes, useNavigate, useSearchParams } from 'react-router-dom';
import Main from 'src/views/Main';
import Community from './views/Community';
import SignUp from './views/SignUp';
import { ACCESS_TOKEN, BOARD_LIST_PATH, MAIN_ABSOLUTE_PATH, MAIN_PATH, ROOT_PATH, SIGN_UP_PATH, SNS_SUCCESS_PATH, OTHERS_PATH, CUSTOMER_MYPAGE_DETAIL_ABSOLUTE_PATH, SIGN_UP_ABSOLUTE_PATH, POST_PATH } from './constant';

import { useCookies } from 'react-cookie';
import { useSignInCustomerStroe } from './stores';
import { GetSignInResponseDto } from './apis/dto/response/customer';
import { ResponseDto } from './apis/dto/response';
import { getSignInRequest } from './apis';
import Mypage from './views/Mypage';
import Post from './views/Community/Post';
import { Dayjs } from 'dayjs';

// component: root path 컴포넌트 //
function Index(){

  // state: 쿠키 상태 //
  const[cookies] = useCookies();

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // effect: 마운트 시 경로 이동 effect //
  useEffect(()=> {
      navigator(MAIN_ABSOLUTE_PATH);
  }, []);

  // render: root path 컴포넌트 렌더링 //
  return(
    <></>
  )
}

// component: Sns sucess 컴포넌트 //
function SnsSuccess(){

  // state: Query Parmeter 상태 //
  const [queryParam] = useSearchParams();
  const accessToken = queryParam.get('accessToken');
  const expiration = queryParam.get('expiration');

  // state: cookie 상태 //
  const [cookies, setCookies] = useCookies();

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // effect: Sns Success 컴포넌트 로드시 accessToken과 expiration을 확인하고 로그인 처리 //
  useEffect(()=>{
    if(accessToken && expiration) {
      const expires = new Date(Date.now() + Number(expiration) * 1000);
      setCookies(ACCESS_TOKEN, accessToken, {path: ROOT_PATH, expires});

      navigator(MAIN_ABSOLUTE_PATH);
    }
      else navigator(SIGN_UP_ABSOLUTE_PATH);
  }, []);

  // render: Sns success 컴포넌트 렌더링 //
  return <></>
}


// component: Healthcare 컴포넌트 //
export default function Healthcare() {

  // state: 로그인 유저 정보 상태 //
  const {signInCustomer, setSignInCustomer} = useSignInCustomerStroe();

  // state: cookie 상태 //
  const [cookies, setCookie, removeCookie] = useCookies();

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // function: get sign in 요청 함수 //
  const getSignInResponse = (responseBody:  GetSignInResponseDto | ResponseDto | null) => {
    const message = 
        !responseBody ? '로그인 유저 정보를 불러오는데 문제가 발생했습니다.':
        responseBody.code === 'NI' ? '로그인 유저 정보가 존재하지 않습니다.':
        responseBody.code === 'AF' ? '잘못된 접근입니다.' :
        responseBody.code === 'DBE' ? '로그인 유저 정보를 불러오는데 문제가 발생했습니다.': '';
          
    const isSuccessed = responseBody !== null && responseBody.code === 'SU';

    if(!isSuccessed) {
      alert(message);
      removeCookie(ACCESS_TOKEN, {path: ROOT_PATH});
      navigator(MAIN_ABSOLUTE_PATH);
      return;
    }

    const {userId, name, nickname, profileImage, personalGoals} = responseBody as GetSignInResponseDto;
    setSignInCustomer({userId, name, nickname, profileImage, personalGoals});

  }

  // effect: cookie의 accessToken 값이 변경될 때마다 로그인 유저 정보를 요청하는 함수 //
  useEffect(() => {
    const accessToken = cookies[ACCESS_TOKEN];
    if(accessToken) getSignInRequest(accessToken).then(getSignInResponse)
      else setSignInCustomer(null);
  }, [cookies[ACCESS_TOKEN]]);

  return (
    <Routes>
      <Route index element={<Index />} />
      <Route path={MAIN_PATH} element={<Main/>} />
      <Route path={SIGN_UP_PATH} element={<SignUp />} />
      <Route path={CUSTOMER_MYPAGE_DETAIL_ABSOLUTE_PATH(':userId')} element={<Mypage />} />
      <Route path={BOARD_LIST_PATH} element={<Community />} />
      <Route path={POST_PATH} element={<Post />} />
      <Route path={SNS_SUCCESS_PATH} element={<SnsSuccess/>} />
      <Route path={OTHERS_PATH} element={<Index />} />
    </Routes>
  );
}
