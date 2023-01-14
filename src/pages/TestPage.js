import {useRef, useState} from 'react';
import questions from "../questions";
import styles from './css/TestPage.module.css';

localStorage.setItem('hj', 0);
localStorage.setItem('jj', 0);
localStorage.setItem('b', 0);
localStorage.setItem('realistic', 0);
localStorage.setItem('hs', 0);
localStorage.setItem('fixed', null);
localStorage.setItem('e', 0);
localStorage.setItem('n', 0);
localStorage.setItem('t', 0);
localStorage.setItem('p', 0);

function Test(){
    let [questionNumber, setQuestionNumber] = useState(0);
    const percentageBar = useRef(null);

    const firstAnswerClicked = () => {
        setQuestionNumber(questionNumber+1);
        percentageBar.current.style.width = `${(questionNumber+1)*8.3}%`;

        localStorage.setItem('hj', Number(localStorage.getItem('hj'))+questions.questions[questionNumber].firstAnswerScore.hj);
        localStorage.setItem('jj', Number(localStorage.getItem('jj'))+questions.questions[questionNumber].firstAnswerScore.jj);
        localStorage.setItem('b', Number(localStorage.getItem('b'))+questions.questions[questionNumber].firstAnswerScore.b);
        localStorage.setItem('realistic', Number(localStorage.getItem('realistic'))+questions.questions[questionNumber].firstAnswerScore.realistic);
        localStorage.setItem('hs', Number(localStorage.getItem('hs'))+questions.questions[questionNumber].firstAnswerScore.hs);
        
        if(questions.questions[questionNumber].mbti.type === 'e') localStorage.setItem('e', Number(localStorage.getItem('e'))+questions.questions[questionNumber].mbti.score);
        
        localStorage.setItem('n', Number(localStorage.getItem('n'))+questions.questions[questionNumber].firstAnswerScore.n);
        localStorage.setItem('t', Number(localStorage.getItem('t'))+questions.questions[questionNumber].firstAnswerScore.t);
        localStorage.setItem('p', Number(localStorage.getItem('p'))+questions.questions[questionNumber].firstAnswerScore.p);
        if(questions.questions[questionNumber].firstAnswerScore.fixed != null)localStorage.setItem('fixed', questions.questions[questionNumber].firstAnswerScore.fixed);

        if(questionNumber === 11){
            window.location.href = '/result';
        }
    }
    const secondAnswerClicked = () => {
        setQuestionNumber(questionNumber+1);
        percentageBar.current.style.width = `${(questionNumber+1)*8.3}%`;

        localStorage.setItem('hj', Number(localStorage.getItem('hj'))+questions.questions[questionNumber].firstAnswerScore.hj);
        localStorage.setItem('jj', Number(localStorage.getItem('jj'))+questions.questions[questionNumber].firstAnswerScore.jj);
        localStorage.setItem('b', Number(localStorage.getItem('b'))+questions.questions[questionNumber].firstAnswerScore.b);
        localStorage.setItem('realistic', Number(localStorage.getItem('realistic'))+questions.questions[questionNumber].firstAnswerScore.realistic);
        localStorage.setItem('hs', Number(localStorage.getItem('hs'))+questions.questions[questionNumber].firstAnswerScore.hs);
        
        localStorage.setItem('e', Number(localStorage.getItem('e'))+questions.questions[questionNumber].firstAnswerScore.e);
        localStorage.setItem('n', Number(localStorage.getItem('n'))+questions.questions[questionNumber].firstAnswerScore.n);
        localStorage.setItem('t', Number(localStorage.getItem('t'))+questions.questions[questionNumber].firstAnswerScore.t);
        localStorage.setItem('p', Number(localStorage.getItem('p'))+questions.questions[questionNumber].firstAnswerScore.p);
        if(questions.questions[questionNumber].firstAnswerScore.fixed != null)localStorage.setItem('fixed', questions.questions[questionNumber].firstAnswerScore.fixed);

        if(questionNumber === 11){
            window.location.href = '/result';
        }
    }
    return(
        <div className={styles.App}>
            <div className={styles.MainQuestion}>
                <div className={styles.Question}>{questions.questions[questionNumber].question}</div>
            </div>

            <div className={styles.AnswerArea}>
                <div className={styles.FirstAnswer} onClick={firstAnswerClicked}>
                    {questions.questions[questionNumber].firstAnswer}
                </div>
                <div className={styles.SecondAnswer} onClick={secondAnswerClicked}>
                {questions.questions[questionNumber].secondAnswer}
                </div>
            </div>

            <div className={styles.PercentageArea}>
                <div className={styles.PercentageBar}></div>
                <div className={styles.RealPercentage} ref={percentageBar}></div>
                
            </div>
            <div className={styles.Percentage}>{questionNumber+1}/12</div>
        </div>   
    )
}

export default Test;