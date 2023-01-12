import characterResult from "../characterResult";
import './css/Result.css';

function Result(){
    return(
        <div className="App">
            <div className="TopImageArea">
                <img src={characterResult[0].imgsrc}></img>
            </div>
            <div className="TitleArea">

            </div>
        </div>
        
    )
}

export default Result;