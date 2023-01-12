import characterResult from "../characterResult";
import './css/Result.css';

function CharacterInfo(info){
    const infoList = [];

    for(var property of info.info){
        infoList.push(<li key={property.id}>{property.content}</li>)
    }
    

    return(
        <div className="InfoList">
            <ul>
                {infoList}
            </ul>  
        </div>
    )
}
function Result(){
    return(
        <div className="App">
            <div className="TopImageArea">
                <img src={characterResult[0].imgsrc} alt='character img'></img>
            </div>
            
            <div className="TitleArea">
                <div className="MainTitle">
                    {characterResult[0].title}
                </div>
                <div className="SubTitle">
                    "{characterResult[0].subTitle}"
                </div>
            </div>

            <div className="InfoArea">
                <CharacterInfo info={characterResult[0].info} />

            </div>

            
        </div>
        
    )
}

export default Result;