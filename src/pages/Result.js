import {useRef, useState} from 'react';
import characterResult from "../characterResult";
import styles from './css/Result.module.css';
import styled from 'styled-components';
import questions from "../questions";
import {BrowserView, MobileView, isBrowser, isMobile} from "react-device-detect";
import {createStore} from 'redux';
import {Provider, userSelector, useDispatch} from 'react-redux';
import { readBuilderProgram } from 'typescript';

let characterId=0;
let mythDetail = false;
console.log(document.location.search.split("?")[1])
if(document.location.search.split("?").length === 2){
    let url = document.location.search.split("?")[1];
    console.log(url);
    characterId = Number(url);
}
else{
    characterId = getCharacterId();
}
console.log(`result id: ${characterId}`);

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

    let not_hj = 0;
    let not_jj = 0;
    let not_b = 0;
    let not_realistic = 0;
    let not_hs = 0;

    if(hj < 0) not_hj = -hj;
    if(jj < 0) not_jj = -jj;
    if(b < 0) not_b = -b;
    if(realistic < 0) not_realistic = -realistic;
    if(hs < 0) not_hs = -hs;

    var makeResult = [
        {category: 'hj', value: hj},
        {category: 'jj', value: jj},
        {category: 'b', value: b},
        {category: 'realistic', value: realistic},
        {category: 'hs', value: hs},
        {category: 'not_hj', value: not_hj},
        {category: 'not_jj', value: not_jj},
        {category: 'not_b', value: not_b},
        {category: 'not_realistic', value: not_realistic},
        {category: 'not_hs', value: not_hs}
    ]

    //내림차순 정렬
    var sortValue = "value";
    makeResult.sort(function(a, b){
        return b[sortValue] - a[sortValue];
    });

    var firstVal = makeResult[0].category;
    var secondVal = makeResult[1].category;

    if((firstVal === 'hj' && secondVal==='hs') || (firstVal === 'hs' && secondVal === 'hj')) return 2;
    if((firstVal === 'jj' && secondVal==='realistic') || (firstVal === 'realistic' && secondVal === 'jj')) return 4;
    if((firstVal === 'b' && secondVal==='jj') || (firstVal === 'jj' && secondVal === 'b')) return 5;
    if((firstVal === 'jj' && secondVal==='not_realistic') || (firstVal === 'not_realistic' && secondVal === 'jj')) return 1;
    if((firstVal === 'jj' && secondVal==='not_hs') || (firstVal === 'not_hs' && secondVal === 'jj')) return 0;
    if((firstVal === 'hs' && secondVal==='not_realistic') || (firstVal === 'not_realistic' && secondVal === 'hs')) return 6;
    if((firstVal === 'hs' && secondVal==='realistic') || (firstVal === 'realistic' && secondVal === 'hs')) return 7;


    let threshold = (hj+jj+b+realistic+hs)/5;
    console.log(threshold)

    if(hj >= threshold && hs >= threshold) return 2;
    if(hj === threshold && hs === threshold) return 3;
    if(t>=0 && realistic>=threshold) return 4;
    if(jj>=threshold && b>=threshold) return 5;
    if(hj<=threshold && jj<=threshold) return 1;
    if(jj>=threshold && hs<=threshold) return 0;
    if(hs >= threshold && realistic <= threshold) return 6;
    if(hs>=threshold && realistic>=threshold) return 7;

    if(n>=0 && p>=0) return 0;
    if(e<=0 && p>=0) return 1;
    if(e>=0 && p<=0) return 2;
    if(n<=0 && p<=0) return 3;
    if(n<=0 && t>=0) return 4;
    if(t<=0 && p>=0) return 5;
    if(n>=0 && t<=0) return 6;
    if(t<=0 && p<=0) return 7;

    if(fixed != null)return fixed;
    else return 0;
}
function CharacterInfo(info){
    const infoList = [];

    for(var property of info.info){
        infoList.push(<p key={property.id}>{property.content}</p>)
    }
    
    return(
        <div className={styles.InfoList}>
            {infoList}  
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

function ShowMythHistory(){
    const showFullBtnClicked = useRef(null);
    const fullMythDiv = useRef(null);
    const fullStoryTitle = useRef(null);
    // const appBackground = useRef(null);

    const [showFullHistoryMsg, setShowFullHistoryMsg] = useState(`더보기`);
    var titleArrow = '^';
    var title = '신화 이야기 더 자세히 보기';

    const onShowFullBtnClicked = () =>{
        const appBg = document.getElementsByClassName('App')[0];
        console.log(showFullBtnClicked.current.style.display);
        if(mythDetail === false){
            setShowFullHistoryMsg('접기');
            mythDetail = true;
            fullMythDiv.current.style.animationPlayState = 'paused';
            fullMythDiv.current.style.position = 'absolute';
            showFullBtnClicked.current.style.display = 'block';
            fullMythDiv.current.style.top = '5vh';
            
        }
        else{
            setShowFullHistoryMsg('더보기');
            mythDetail = false;
            // if(isMobile)fullMythDiv.current.style.top = '95vh';
            // if(isBrowser)fullMythDiv.current.style.top = '100vh';
            fullMythDiv.current.style.position = 'relative';
            showFullBtnClicked.current.style.display = 'none';
        }
    } 

    if(showFullHistoryMsg === '접기'){
        titleArrow = 'v';
        title = '접기';
    }
    if(isMobile){
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

    if(isBrowser){
        return(
            <div className={styles.BrowserFullMythStory} ref={fullMythDiv} >
                <div className={styles.FullStoryTitle} onClick={onShowFullBtnClicked} ref={fullStoryTitle}>
                    <>{titleArrow} <br></br> {title}</>
                </div>
                <div className={styles.BrowserInnerStory} ref={showFullBtnClicked} dangerouslySetInnerHTML={{__html: characterResult[characterId].story}}>
                    
                </div>
            </div>  
        )
    }
    
}

function Result(){
    const FeatureBtnArea = styled.div`
            display: flex;
            justify-content: space-around;
            width: 98%;
            margin: auto;
            height: 5vh;
            margin-top: 5vh;
        `
        const ReTestBtn = styled.div`
            width: 45%;
            padding: 3px, 10px;
            
            cursor: pointer;
            font-size: 1.1rem;
            text-align: center;
            line-height: 5vh;

            background-color: #f5f5f5;
            border-radius: 20px;
        `
    if(isMobile){
        return(
            <div className={styles.App}>
                <ShowTitleArea characterIdx={characterId} />
                <ShowCharacterImg characterIdx={characterId} />
                
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
                        <div className={styles.SimilarOppositeTitle}>환상의 조합</div>
                        <div className={styles.SimilarOppositeImgArea}>
                            <div className={styles.SimilarImg1} onClick={()=>{
                                window.location.href=`/result?${characterResult[characterId].similarTo[0]}`;
                            }}>
                                <img src={characterResult[characterResult[characterId].similarTo[0]].imgsrc} alt='character img'></img>
                            </div>
                            <div className={styles.SimilarImg2}onClick={()=>{
                                window.location.href=`/result?${characterResult[characterId].similarTo[1]}`;
                            }}>
                                <img src={characterResult[characterResult[characterId].similarTo[1]].imgsrc} alt='character img'></img>
                            </div>
                        </div>
                        <div className={styles.SimilarOppositeContent}>{characterResult[characterResult[characterId].similarTo[0]].name}, {characterResult[characterResult[characterId].similarTo[1]].name}</div>
                    </div>
                    <div id={styles.OppositeArea}>
                        <div className={styles.SimilarOppositeTitle}>환장의 조합 </div>
                        <div className={styles.SimilarOppositeImgArea}onClick={()=>{
                                window.location.href=`/result?${characterResult[characterId].oppositTo}`;
                            }}>
                            <div className={styles.SimilarImgOnly}>
                                <img src={characterResult[characterResult[characterId].oppositTo].imgsrc} alt='character img'></img>
                            </div>
                        </div>
                        <div className={styles.SimilarOppositeContent}>{characterResult[characterResult[characterId].oppositTo].name}</div>
                    </div>
                </div>      
                 <FeatureBtnArea>
                    <ReTestBtn onClick={()=>{window.location.href="/"}}>테스트 다시하기</ReTestBtn>
                    <ReTestBtn>링크 공유하기</ReTestBtn>
                 </FeatureBtnArea>
                 <ShowMythHistory />
            </div>
        )
    }
    if(isBrowser){

        const BrowserApp = styled.div`
            width: 60vw;
            margin: auto;
            padding-top: 2vh;
            height: max-content;
        
            overflow: hidden;
            background-color: rgba(0,0,0, 0);
        `
        
        console.log(characterResult[characterResult[characterId].similarTo[1]].name)
        return(
                <BrowserApp className='App'>
                <ShowTitleArea characterIdx={characterId} />
                <ShowCharacterImg characterIdx={characterId} />
    
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
                        <div className={styles.SimilarOppositeTitle}>환상의 조합</div>
                        <div className={styles.SimilarOppositeImgArea}>
                            <div className={styles.SimilarImg1} onClick={()=>{
                                window.location.href=`/result?${characterResult[characterId].similarTo[0]}`;
                            }}>
                                <img src={characterResult[characterResult[characterId].similarTo[0]].imgsrc} alt='character img'></img>
                            </div>
                            <div className={styles.SimilarImg2} onClick={()=>{
                                window.location.href=`/result?${characterResult[characterId].similarTo[1]}`;
                            }}>
                                <img src={characterResult[characterResult[characterId].similarTo[1]].imgsrc} alt='character img'></img>
                            </div>
                        </div>
                        <div className={styles.SimilarOppositeContent}>{characterResult[characterResult[characterId].similarTo[0]].name}, {characterResult[characterResult[characterId].similarTo[1]].name}</div>
                    </div>
                    <div id={styles.OppositeArea}>
                        <div className={styles.SimilarOppositeTitle}>환장의 조합 </div>
                        <div className={styles.SimilarOppositeImgArea}>
                            <div className={styles.SimilarImgOnly} onClick={()=>{
                                window.location.href=`/result?${characterResult[characterId].oppositTo}`;
                            }}>
                                <img src={characterResult[characterResult[characterId].oppositTo].imgsrc} alt='character img'></img>
                            </div>
                        </div>
                        <div className={styles.SimilarOppositeContent}>{characterResult[characterResult[characterId].oppositTo].name}</div>
                    </div>
                </div>      
                <FeatureBtnArea>
                    <ReTestBtn onClick={()=>{window.location.href="/"}}>테스트 다시하기</ReTestBtn>
                    <ReTestBtn>링크 공유하기</ReTestBtn>
                 </FeatureBtnArea>
                 <ShowMythHistory />
            </BrowserApp>            
        )
    }

    
}

export default Result;