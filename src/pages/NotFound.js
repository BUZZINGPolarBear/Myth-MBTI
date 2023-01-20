import styled from "styled-components";
import {isBrowser, isMobile} from "react-device-detect";

function NotFound() {
  const MainPicArea = styled.div`
    width: 350px;
    height: 350px;
    margin: auto;
  `;
  const MainPic = styled.img`
    width: 100%;
    height: 100%;
  `;
  const TitleArea = styled.div`
    width: 100%;
    font-size: 1.5rem;
    font-weight: 600;

    margin: auto;
    margin-top: 1.2rem;

    text-align: center;
  `;

  const SubTitleArea = styled.div`
    width: 100%;
    font-size: 1.2rem;

    margin: auto;
    margin-top: 1.2rem;
    line-height: 1.5rem;
    text-align: center;
  `;

  if (isBrowser) {
    const BrowserApp = styled.div`
      width: 60vw;
      height: 100vh;
      margin: auto;
      padding-top: 5vh;
    `;
    return (
      <div>
          <BrowserApp>
            <MainPicArea>
              <MainPic
                src="/images/404.jpeg"
                alt="main"
              />
              <TitleArea>404 Error</TitleArea>
              <SubTitleArea>
                여긴 어디죠...? <br></br> 이 페이지는 존재하지 않습니다.
              </SubTitleArea>
            </MainPicArea>
          </BrowserApp>

      </div>
    );
  }

  if (isMobile) {
    const MobileBrowserApp = styled.div`
      width: 98vw;
      height: 100vh;
      margin: auto;
      padding-top: 5vh;
    `;

    return (
      <div>
          <MobileBrowserApp>
            <MainPicArea>
              <MainPic
                src="./images/404.jpeg"
                alt="main"
              />
              <TitleArea>404 Error</TitleArea>
              <SubTitleArea>
                여긴 어디죠...? <br></br> 이 페이지는 존재하지 않습니다.
              </SubTitleArea>
              
            </MainPicArea>
          </MobileBrowserApp>
      </div>
    );
  }
}

export default NotFound;
