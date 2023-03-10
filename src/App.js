// import logo from './logo.svg';
import React from "react";
import Result from "./pages/Result";
import Test from "./pages/TestPage";
import NotFound from "./pages/NotFound";
import styled from "styled-components";
import "./App.css";
import { isBrowser, isMobile } from "react-device-detect";
import { useEffect } from "react";
import characterResult from "./characterResult";
import kakaoAdfit from "./pages/kakaoAdfit";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
const MainPicArea = styled.div`
width: 350px;
height: 350px;
margin: auto;
`;
const MainPic = styled.img`
width: 100%;
height: 100%;
`;
const TitleArea = styled.div`
width: 100%;
font-size: 1.5rem;
font-weight: 600;

margin: auto;
margin-top: 1.2rem;

text-align: center;
`;

const SubTitleArea = styled.div`
width: 100%;
font-size: 1.2rem;

margin: auto;
margin-top: 1.2rem;
line-height: 1.5rem;
text-align: center;
`;

const StartButton = styled.button`
width: 100%;
padding: 0.5rem 1rem;
margin: auto;
margin-top: 2rem;

border-radius: 20px;

color: #fff;
font-size: 1.2rem;
font-weight: 600;
cursor: pointer;
background-color: #000;
`;

function BrowerMain() {
  const randCharacterNum = Math.floor(Math.random() * 7);
  const BrowserApp = styled.div`
      width: 60vw;
      height: 100vh;
      margin: auto;
      padding-top: 5vh;
    `;
    const KakaoAdfitArea = styled.div`
      width: 300px;
      height: 250px;
      margin: auto;
      margin-top: 5vh;
    `;
  return(
    <BrowserApp>
      <MainPicArea>
        <MainPic
          src={characterResult[randCharacterNum].imgsrc}
          alt="main"
        />
        <TitleArea>나의 신화 속 사랑 유형 알아보기</TitleArea>
        <SubTitleArea>
          신화는 우리의 삶과 맞닿아있습니다. <br></br> 여러분은 어떤
          신의 사랑을 하고 있을까요?
        </SubTitleArea>
        <StartButton
          onClick={() => {
            window.location.href = "/test";
          }}
        >
          시작하기
        </StartButton>
        <KakaoAdfitArea className="adfit"></KakaoAdfitArea>
      </MainPicArea>
    </BrowserApp>
  )
}

function MobileMain(){
  const randCharacterNum = Math.floor(Math.random() * 7);
  const MobileBrowserApp = styled.div`
      width: 98vw;
      height: 100vh;
      margin: auto;
      padding-top: 5vh;
    `;
    const KakaoAdfitArea = styled.div`
      width: 300px;
      height: 250px;
      margin: auto;
      margin-top: 5vh;
    `;

    return (
      <MobileBrowserApp>
      <MainPicArea>
        <MainPic
          src={characterResult[randCharacterNum].imgsrc}
          alt="main"
        />
        <TitleArea>나의 신화 속 사랑 유형 알아보기</TitleArea>
        <SubTitleArea>
          신화는 우리의 삶과 맞닿아있습니다. <br></br> 여러분은 어떤 신의
          사랑을 하고 있을까요?
        </SubTitleArea>
        <StartButton
          onClick={() => {
            window.location.href = "/test";
          }}
        >
          시작하기
        </StartButton>
        <KakaoAdfitArea className="adfit"></KakaoAdfitArea>
      </MainPicArea>
    </MobileBrowserApp>
    )
}
function App() {
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });

  if (isBrowser) {
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<BrowerMain />} />
            <Route path="/result" element={<Result />}></Route>
            <Route path="/test" element={<Test />}></Route>
            <Route path="/*" element={<NotFound />}></Route>
          </Routes>
        </BrowserRouter>
    );
  }

  if (isMobile) {
    
    return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<MobileMain />} />
        <Route path="/result" element={<Result />}></Route>
        <Route path="/test" element={<Test />}></Route>
        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
    );
  }
}

export default App;
