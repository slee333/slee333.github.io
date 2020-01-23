import React from "react";
import {
  Box,
  Speak,
  SubBox,
  TitleText,
  BoxTitle,
  BoxContent,
  BoxCaption,
  Text
} from "../Styles/Styled"; 
import ScrollAnimation from "react-animate-on-scroll";
import Theme from "../Styles/Theme";
import styled from "styled-components";

const ThumbBox = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  flex-wrap: wrap;
  min-width: 200px;
  border: 1px solid gray;
  padding: ${Theme.xsmall};
  margin-bottom: ${Theme.xsmall};
  border-radius: 30px;
`;

const Thumbnail = styled.img`
  border-radius: 50%;
  height: 100px;
  width: 100px;
  border: 1px solid #ddd;
  margin-bottom: ${Theme.small};
`;

const ProjectTitle = styled(Text)`
  margin-bottom: ${Theme.xsmall};
  font-weight: bold;
`;

const ProjectDescription = styled(Text)`
  line-height: normal;
  font-size: ${Theme.xsmall}
`


export default () => {
  return (
    <Box id="projects" width="100%" bgColor={"#EAFEF6"}>
      <ScrollAnimation
        style={{ width: "100%" }}
        animateIn="fadeIn"
        animateOnce={true}
      >
        <SubBox
          style={{
            minHeight: "48vw",
            height: "100%",
            paddingTop: Theme.large,
            paddingBottom: Theme.large
          }}
          basis={80}
        >
          <BoxTitle>
            <TitleText size={Theme.medSmall} color="black">
              프로젝트
            </TitleText>
          </BoxTitle>

          <BoxContent>
            <ThumbBox href="https://ciis.lcsr.jhu.edu/dokuwiki/doku.php?id=courses:446:2016:446-2016-05:project_05_main_page">
              <Thumbnail src="data:image/png;base64,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" />
              <ProjectTitle fontSize={Theme.small} color="black">
                FluoroSim
              </ProjectTitle>
              <ProjectDescription fontSize={Theme.xxsmall} color="black">
                3D CT 파일을 기반으로 X선 영상을 시뮬레이션해 의료진의 방사선 노출을 줄이고 시술 과정을 돕는 프로젝트.
              </ProjectDescription>
            </ThumbBox>
            <ThumbBox href="http://cis.jhu.edu/speechbanana/">
              <Thumbnail src="https://is5-ssl.mzstatic.com/image/thumb/Purple123/v4/28/d3/f0/28d3f0e4-87ba-6408-35a4-e7707b1b6566/AppIcon-0-1x_U007emarketing-0-85-220-5.png/246x0w.png"/>
              <ProjectTitle color="black">
                스피치 바나나
              </ProjectTitle>
              <ProjectDescription color="black">
                인공와우 이식 환자들이 단어와 문장을 듣고 퀴즈를 풀며 청각재활을 할 수 있도록 도와주는 웹 어플리케이션.
              </ProjectDescription>
            </ThumbBox>
            <ThumbBox href="https://www.hopkinsmedicine.org/epiwatch/faqs.html">
              <Thumbnail src="https://images.techhive.com/images/article/2015/10/epiwatch-primary-100621930-large.jpg"/>
              <ProjectTitle fontSize={Theme.small} color="black">
                에피워치
              </ProjectTitle>
              <ProjectDescription color="black">
                애플워치를 이용해 간질 발작을 감시하고 SUDEP을 예방하기 위한 프로젝트.
              </ProjectDescription>
            </ThumbBox>
          </BoxContent>
          
          <BoxCaption>
            <Speak>등등이 있습니다.</Speak>
          </BoxCaption>
        </SubBox>
      </ScrollAnimation>
    </Box>
  );
};
