import characterResult from "../characterResult";
import './css/Result.css';

function Result(){
    return(
        <div className="App">
            <div className="TopImageArea">
                <img src={characterResult[0].imgsrc}></img>
            </div>
            <div className="TitleArea">
                <div className="MainTitle">
                    {characterResult[0].title}
                </div>
                <div className="SubTitle">
                    "{characterResult[0].subTitle}"
                </div>
            </div>
        </div>
        
    )
}

export default Result;