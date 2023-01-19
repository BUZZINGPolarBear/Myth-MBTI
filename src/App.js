// import logo from './logo.svg';
import {Route} from "react-router-dom";
import Result from "./pages/Result";
import Test from "./pages/TestPage";
import styled from 'styled-components';
import './App.css';
import {isBrowser, isMobile} from "react-device-detect";
import {useEffect } from "react";
import characterResult from "./characterResult";
import kakaoAdfit from "./pages/kakaoAdfit";

function App() {
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
    let ins = document.createElement('ins');
    let scr = document.createElement('script');
    ins.className = 'kakao_ad_area';
    ins.style = "display:none; width:100%;";
    scr.async = 'true';
    scr.type = "text/javascript";
    scr.src = "//t1.daumcdn.net/kas/static/ba.min.js";
    ins.setAttribute('data-ad-width','300');
    ins.setAttribute('data-ad-height','250');
    ins.setAttribute('data-ad-unit','DAN-fAXiJ2rJLl5H09SG');
    document.querySelector('.adfit').appendChild(ins);
    document.querySelector('.adfit').appendChild(scr);
  });

  const MainPicArea = styled.div`
      width: 350px;
      height: 350px;
      margin: auto;
    `
  const MainPic = styled.img`
    width: 100%;
    height: 100%;
  `
  const TitleArea = styled.div`
    width: 100%;
    font-size: 1.5rem;
    font-weight: 600;

    margin: auto;
    margin-top: 1.2rem;
    
    text-align: center;
  `

  const SubTitleArea = styled.div`
    width: 100%;
    font-size: 1.2rem;

    margin: auto;
    margin-top: 1.2rem;
    line-height: 1.5rem;
    text-align: center;
  `

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
  `

  const randCharacterNum = Math.floor(Math.random() * 7);
  if(isBrowser){
    const BrowserApp = styled.div`
      width: 60vw;
      height: 100vh;
      margin:auto;
      padding-top: 5vh;
    `
    
    return(
      <div>
        
        <Route exact path="/">
          <BrowserApp>
            <MainPicArea>
              <MainPic src={characterResult[randCharacterNum].imgsrc} alt='main' />
              <TitleArea>나의 신화 속 사랑 유형 알아보기</TitleArea>
              <SubTitleArea>신화는 우리의 삶과 맞닿아있습니다. <br></br> 여러분은 어떤 신의 사랑을 하고 있을까요?</SubTitleArea>
              <StartButton onClick={() => {window.location.href = '/test'}}>시작하기</StartButton>
            </MainPicArea>
            <div className = "adfit"></div>
          </BrowserApp>
        </Route>
        <Route exact path="/result">
          <Result />
        </Route>
        <Route exact path="/test">
          <Test />
        </Route>
      </div>
    )
  }

  if(isMobile){
    const MobileBrowserApp = styled.div`
      width: 98vw;
      height: 100vh;
      margin:auto;
      padding-top: 5vh;
    `
    
    return(
      <div>
        
        <Route exact path="/">
          <MobileBrowserApp>
            <MainPicArea>
              <MainPic src={characterResult[randCharacterNum].imgsrc} alt='main' />
              <TitleArea>나의 신화 속 사랑 유형 알아보기</TitleArea>
              <SubTitleArea>신화는 우리의 삶과 맞닿아있습니다. <br></br> 여러분은 어떤 신의 사랑을 하고 있을까요?</SubTitleArea>
              <StartButton onClick={() => {window.location.href = '/test'}}>시작하기</StartButton>
            </MainPicArea>
            <div className = "adfit"></div>
          </MobileBrowserApp>
        </Route>
        <Route exact path="/result">
          <Result />
        </Route>
        <Route exact path="/test">
          <Test />
        </Route>
      </div>
    )
  }
}

export default App;
