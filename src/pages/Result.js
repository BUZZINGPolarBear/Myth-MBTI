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

function ShowTitleArea(characterIdx){
    const characterIdxAsNum = Number(characterIdx.characterIdx);
    
    return(
        <div className="TitleArea">
            <div className="MainTitle">
                {characterResult[characterIdxAsNum].title}
            </div>
            <div className="SubTitle">
                "{characterResult[characterIdxAsNum].subTitle}"
            </div>
        </div>
    )
}

function ShowCharacterImg(characterIdx){
    const characterIdxAsNum = Number(characterIdx.characterIdx);
    return(
        <div className="TopImageArea">
            <img src={characterResult[characterIdxAsNum].imgsrc} alt='character img'></img>
        </div>
    )
}

function PlusList(characterIdx){
    const plusList = [];

    for(var property of characterIdx.characterIdx){
        plusList.push(<li key={property.id}> {property.content} </li>);
    }
    return(
        <ul className="PlusMinusList">
            {plusList}
        </ul>

    )
}

function MinusList(characterIdx){
    const minusList = [];

    for(var property of characterIdx.characterIdx){
        minusList.push(<li key={property.id}> {property.content}</li>);
    }
    return(
        <ul className="PlusMinusList">
            {minusList}
        </ul>

    )
}

function Result(){
    return(
        <div className="App">
            <ShowCharacterImg characterIdx={0} />
            
            <ShowTitleArea characterIdx={0} />

            <div className="InfoArea">
                <CharacterInfo info={characterResult[0].info} />
            </div>

            <div className="PlusMinusArea">
                    <div id="PlusTitle">장점</div>
                    <PlusList characterIdx={characterResult[0].plus} />
                    <div id="MinusTitle">단점</div>
                    <MinusList characterIdx={characterResult[0].minus} />
                </div>

            
        </div>
        
    )
}

export default Result;