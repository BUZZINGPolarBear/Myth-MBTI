import {useRef, useState} from 'react';
import questions from "../questions";
import styles from './css/TestPage.module.css';
import {useEffect } from "react";
import styled from 'styled-components';
import {BrowserView, MobileView, isBrowser, isMobile} from "react-device-detect";


function Test(){
    let [questionNumber, setQuestionNumber] = useState(0);
    const percentageBar = useRef(null); 
    useEffect(() => {
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
    

    const firstAnswerClicked = () => {
        if(questionNumber === 0) localStorage.clear();
        setQuestionNumber(questionNumber+1);
        percentageBar.current.style.width = `${(questionNumber+1)*8.3}%`;

        localStorage.setItem('hj', Number(localStorage.getItem('hj'))+questions.questions[questionNumber].firstAnswerScore.hj);
        localStorage.setItem('jj', Number(localStorage.getItem('jj'))+questions.questions[questionNumber].firstAnswerScore.jj);
        localStorage.setItem('b', Number(localStorage.getItem('b'))+questions.questions[questionNumber].firstAnswerScore.b);
        localStorage.setItem('realistic', Number(localStorage.getItem('realistic'))+questions.questions[questionNumber].firstAnswerScore.realistic);
        localStorage.setItem('hs', Number(localStorage.getItem('hs'))+questions.questions[questionNumber].firstAnswerScore.hs);
        
        if(questions.questions[questionNumber].mbti.type === 'e') localStorage.setItem('e', Number(localStorage.getItem('e'))+questions.questions[questionNumber].mbti.score);
        if(questions.questions[questionNumber].mbti.type === 'n') localStorage.setItem('n', Number(localStorage.getItem('n'))+questions.questions[questionNumber].mbti.score);
        if(questions.questions[questionNumber].mbti.type === 't') localStorage.setItem('t', Number(localStorage.getItem('t'))+questions.questions[questionNumber].mbti.score);
        if(questions.questions[questionNumber].mbti.type === 'p') localStorage.setItem('p', Number(localStorage.getItem('p'))+questions.questions[questionNumber].mbti.score);

        if(questions.questions[questionNumber].firstAnswerScore.fixed != null)localStorage.setItem('fixed', questions.questions[questionNumber].firstAnswerScore.fixed);

        if(questionNumber === 11){
            window.location.href = '/result';
        }
    }
    const secondAnswerClicked = () => {
        if(questionNumber === 0) localStorage.clear();
        setQuestionNumber(questionNumber+1);
        percentageBar.current.style.width = `${(questionNumber+1)*8.3}%`;

        localStorage.setItem('hj', Number(localStorage.getItem('hj'))+questions.questions[questionNumber].secondAnswerScore.hj);
        localStorage.setItem('jj', Number(localStorage.getItem('jj'))+questions.questions[questionNumber].secondAnswerScore.jj);
        localStorage.setItem('b', Number(localStorage.getItem('b'))+questions.questions[questionNumber].secondAnswerScore.b);
        localStorage.setItem('realistic', Number(localStorage.getItem('realistic'))+questions.questions[questionNumber].secondAnswerScore.realistic);
        localStorage.setItem('hs', Number(localStorage.getItem('hs'))+questions.questions[questionNumber].secondAnswerScore.hs);
        
        if(questions.questions[questionNumber].mbti.type === 'e') localStorage.setItem('e', Number(localStorage.getItem('e'))-questions.questions[questionNumber].mbti.score);
        if(questions.questions[questionNumber].mbti.type === 'n') localStorage.setItem('n', Number(localStorage.getItem('n'))-questions.questions[questionNumber].mbti.score);
        if(questions.questions[questionNumber].mbti.type === 't') localStorage.setItem('t', Number(localStorage.getItem('t'))-questions.questions[questionNumber].mbti.score);
        if(questions.questions[questionNumber].mbti.type === 'p') localStorage.setItem('p', Number(localStorage.getItem('p'))-questions.questions[questionNumber].mbti.score);

        if(questions.questions[questionNumber].firstAnswerScore.fixed != null)localStorage.setItem('fixed', questions.questions[questionNumber].secondAnswerScore.fixed);

        if(questionNumber === 11){
            window.location.href = '/result';
        }
    }

    const KakaoAdfitArea = styled.div`
      width: 300px;
      height: 250px;
      margin: auto;
      margin-top: 10vh;
      background-color: #000;
    `
    return(
        
        <div className={styles.App}>
            
            <div className={styles.MainQuestion}>
                <div className={styles.Question}>{questions.questions[questionNumber].question}</div>
            </div>

            <div className="AnswerArea">
                <div className={isMobile ? styles.FirstAnswer : styles.BrowserFirstAnswer} onClick={firstAnswerClicked}>
                    {questions.questions[questionNumber].firstAnswer}
                </div>
                <div className={isMobile ? styles.SecondAnswer : styles.BrowserSecondAnswer} onClick={secondAnswerClicked}>
                    {questions.questions[questionNumber].secondAnswer}
                </div>
            </div>

            <div className={styles.PercentageArea}>
                <div className={styles.PercentageBar}></div>
                <div className={styles.RealPercentage} ref={percentageBar}></div>
                
            </div>
            <div className={styles.Percentage}>{questionNumber+1}/12</div>
            <KakaoAdfitArea className='adfit'></KakaoAdfitArea>
        </div>   
    )
}

export default Test;