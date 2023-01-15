import {useRef, useState} from 'react';
import characterResult from "../characterResult";
import styles from './css/Result.module.css';
import questions from "../questions";

let characterId = getCharacterId();

function getCharacterId(){
    let hj = Number(localStorage.getItem("hj"));
    let jj = Number(localStorage.getItem('jj'));
    let b = Number(localStorage.getItem('b'));
    let realistic = Number(localStorage.getItem('realistic'));
    let hs = Number(localStorage.getItem('hs'));
    let fixed = Number(localStorage.getItem('fixed'));
    let e = Number(localStorage.getItem('e'));
    let n = Number(localStorage.getItem('n'));
    let t = Number(localStorage.getItem('t'));
    let p = Number(localStorage.getItem('p'));

    let threshold = (hj+jj+b+realistic+hs)/5;

    console.log(threshold);

    if(hj > threshold && hs > threshold) return 2;
    if(hj == 0 && hs == 0) return 3;
    if(jj>threshold && realistic>threshold) return 4;
    if(jj>threshold && b>threshold) return 5;
    if(jj>threshold && realistic<-threshold) return 1;
    if(jj>threshold && hs<-threshold) return 0;
    if(hs > threshold && realistic < -threshold) return 6;
    if(hs>threshold && realistic>threshold) return 7;

    if(n>0 && p>0) return 0;
    if(e<0 && p>0) return 1;
    if(e>0 && p<0) return 2;
    if(n<0 && p<0) return 3;
    if(n<0 && t>0) return 4;
    if(t<0 && p>0) return 5;
    if(n>0 && t<0) return 6;
    if(t<0 && p<0) return 7;

    return fixed;


    return 8;

}
function CharacterInfo(info){
    const infoList = [];

    for(var property of info.info){
        infoList.push(<li key={property.id}>{property.content}</li>)
    }
    
    return(
        <div className={styles.InfoList}>
            <ul>
                {infoList}
            </ul>  
        </div>
    )
}

function ShowTitleArea(characterIdx){
    const characterIdxAsNum = Number(characterIdx.characterIdx);
    
    return(
        <div className={styles.TitleArea}>
            <div className={styles.MainTitle}>
                {characterResult[characterIdxAsNum].title}
            </div>
            <div className={styles.SubTitle}>
                "{characterResult[characterIdxAsNum].subTitle}"
            </div>
        </div>
    )
}

function ShowCharacterImg(characterIdx){
    const characterIdxAsNum = Number(characterIdx.characterIdx);
    return(
        <div className={styles.TopImageArea}>
            <img src={characterResult[characterIdxAsNum].imgsrc} alt='character img'></img>
        </div>
    )
}

function PlusList(characterIdx){
    const plusList = [];

    for(var property of characterIdx.characterIdx){
        plusList.push(<div key={property.id}> {property.content} </div>);
    }
    return(
        <div className={styles.PlusMinusList}>
            {plusList}
        </div>

    )
}

function MinusList(characterIdx){
    const minusList = [];

    for(var property of characterIdx.characterIdx){
        minusList.push(<div key={property.id}> {property.content}</div>);
    }
    return(
        <div className={styles.PlusMinusList}>
            {minusList}
        </div>

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
        <div className={styles.FullMythStory} ref={fullMythDiv} >
            <div className={styles.FullStoryTitle} onClick={onShowFullBtnClicked} ref={fullStoryTitle}>
                <>{titleArrow} <br></br> {title}</>
            </div>
            <div className={styles.InnerStory} ref={showFullBtnClicked} dangerouslySetInnerHTML={{__html: characterResult[characterId].story}}>
                
            </div>
        </div>  
    )
}



function Result(){
    return(
        <div className={styles.App}>
            <ShowCharacterImg characterIdx={characterId} />
            
            <ShowTitleArea characterIdx={characterId} />

            <div className={styles.InfoArea}>
                <CharacterInfo info={characterResult[characterId].info} />
            </div>

            <div className={styles.PlusMinusArea}>
                    <div id={styles.PlusTitle}>장점</div>
                    <PlusList characterIdx={characterResult[characterId].plus} />
                    <div id={styles.MinusTitle}>단점</div>
                    <MinusList characterIdx={characterResult[characterId].minus} />
            </div>
            <div className={styles.SimilarOppositeArea}>
                <div id={styles.SimilarArea}>
                    <div className={styles.SimilarOppositeTitle}>비슷한 유형</div>
                    <div className={styles.SimilarOppositeContent}>{characterResult[characterId].similarTo}</div>
                </div>
                <div id={styles.OppositeArea}>
                    <div className={styles.SimilarOppositeTitle}>반대 유형</div>
                    <div className={styles.SimilarOppositeContent}>{characterResult[characterId].oppositTo}</div>
                </div>
            </div>      
             
             <ShowMythHistory characterIdx={characterId} />
        </div>
        
        
    )
}

export default Result;