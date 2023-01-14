import {useRef, useState} from 'react';
import questions from "../questions";
import './css/TestPage.css';



function Test(){
    let [questionNumber, setQuestionNumber] = useState(0);
    const percentageBar = useRef(null);

    const firstAnswerClicked = () => {
        setQuestionNumber(questionNumber+1);
        percentageBar.current.style.width = `${(questionNumber+1)*8.3}%`;
    }
    const secondAnswerClicked = () => {
        setQuestionNumber(questionNumber+1);
        percentageBar.current.style.width = `${(questionNumber+1)*8.3}%`;
    }
    return(
        <div className='App'>
            <div className='MainQuestion'>
                <div className='Question'>{questions.questions[questionNumber].question}</div>
            </div>

            <div className='AnswerArea'>
                <div className='FirstAnswer' onClick={firstAnswerClicked}>
                    {questions.questions[questionNumber].firstAnswer}
                </div>
                <div className='SecondAnswer' onClick={secondAnswerClicked}>
                {questions.questions[questionNumber].secondAnswer}
                </div>
            </div>

            <div className='PercentageArea'>
                <div className='PercentageBar'></div>
                <div className='RealPercentage' ref={percentageBar}></div>
                
            </div>
            <div className='Percentage'>{questionNumber+1}/12</div>
        </div>   
    )
}

export default Test;