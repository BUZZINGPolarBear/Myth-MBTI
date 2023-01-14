import {useRef, useState} from 'react';
import questions from "../questions";
import './css/TestPage.css';



function Test(){
    return(
        <div className='App'>
            <div className='MainQuestion'>
                <div className='Question'>hello world!</div>
            </div>

            <div className='AnswerArea'>
                <div className='FirstAnswer'>
                    AAA
                </div>
                <div className='SecondAnswer'>
                    BBB
                </div>
            </div>
        </div>   
    )
}

export default Test;