import {useRef, useState} from 'react';
import characterResult from "../characterResult";
import './css/Result.css';

let characterId = 7;
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

function ShowMythHistory(characterIdx){
    const showFullBtnClicked = useRef(null);
    const fullMythDiv = useRef(null);
    const fullStoryTitle = useRef(null);
    const [showFullHistoryMsg, setShowFullHistoryMsg] = useState(`더보기`);
    var titleArrow = '^';
    var title = '신화 이야기 더 자세히 보기';

    const onShowFullBtnClicked = () =>{
        if(showFullBtnClicked.current.style.display === 'none'){
            setShowFullHistoryMsg('접기');
            fullMythDiv.current.style.top = '5vh';
            showFullBtnClicked.current.style.display = 'block';
        }
        else{
            setShowFullHistoryMsg('더보기');
            fullMythDiv.current.style.top = '95vh';
            showFullBtnClicked.current.style.display = 'none';
        }
    } 

    if(showFullHistoryMsg === '접기'){
        titleArrow = 'v';
        title = '접기';
    }
    return(
        <div className="FullMythStory" ref={fullMythDiv} >
            <div className="FullStoryTitle" onClick={onShowFullBtnClicked} ref={fullStoryTitle}>
                <>{titleArrow} <br></br> {title}</>
            </div>
            <div className="InnerStory" ref={showFullBtnClicked} dangerouslySetInnerHTML={{__html: characterResult[characterId].story}}>
                
            </div>
        </div>  
    )
}

function MinusList(characterIdx){
    const minusList = [];

    for(var property of characterIdx.characterIdx){
        minusList.push(<li key={property.id}> {property.content}</li>);
    }
    return(
        <ul className="PlusMinusList" style={{textAlign: 'right'}}>
            {minusList}
        </ul>

    )
}

function Result(){
    return(
        <div className="App">
            <ShowCharacterImg characterIdx={characterId} />
            
            <ShowTitleArea characterIdx={characterId} />

            <div className="InfoArea">
                <CharacterInfo info={characterResult[characterId].info} />
            </div>

            <div className="PlusMinusArea">
                    <div id="PlusTitle">장점</div>
                    <PlusList characterIdx={characterResult[characterId].plus} />
                    <div id="MinusTitle">단점</div>
                    <MinusList characterIdx={characterResult[characterId].minus} />
            </div>
            <div className="SimilarOppositeArea">
                <div id="SimilarArea">
                    <div className="SimilarOppositeTitle">비슷한 유형</div>
                    <div className="SimilarOppositeContent">{characterResult[characterId].similarTo}</div>
                </div>
                <div id="OppositeArea">
                    <div className="SimilarOppositeTitle">반대 유형</div>
                    <div className="SimilarOppositeContent" >{characterResult[characterId].oppositTo}</div>
                </div>
            </div>      
             
             <ShowMythHistory characterIdx={characterId} />
        </div>
        
        
    )
}

export default Result;