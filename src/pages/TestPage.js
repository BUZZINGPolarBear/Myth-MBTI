import {useRef, useState} from 'react';
import questions from "../questions";
import styles from './css/TestPage.module.css';



function Test(){
    let [questionNumber, setQuestionNumber] = useState(0);
    const percentageBar = useRef(null);

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
        
        if(questions.questions[questionNumber].mbti.type === 'e') localStorage.setItem('e', Number(localStorage.getItem('e'))+questions.questions[questionNumber].mbti.score);
        if(questions.questions[questionNumber].mbti.type === 'n') localStorage.setItem('n', Number(localStorage.getItem('n'))+questions.questions[questionNumber].mbti.score);
        if(questions.questions[questionNumber].mbti.type === 't') localStorage.setItem('t', Number(localStorage.getItem('t'))+questions.questions[questionNumber].mbti.score);
        if(questions.questions[questionNumber].mbti.type === 'p') localStorage.setItem('p', Number(localStorage.getItem('p'))+questions.questions[questionNumber].mbti.score);

        if(questions.questions[questionNumber].firstAnswerScore.fixed != null)localStorage.setItem('fixed', questions.questions[questionNumber].secondAnswerScore.fixed);

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