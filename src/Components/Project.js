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
import { ArrowLeft } from "../Styles/Icons";
import SvgCard from "./Card";
import ScrollAnimation from "react-animate-on-scroll";
import Theme from "../Styles/Theme";
import styled from "styled-components";

const ThumbBox = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
`;

const Thumbnail = styled.img`
  border-radius: 50%;
  height: 100px;
  width: 100px;
  border: 1px solid #ddd;
  margin-bottom: ${Theme.small};
`;

export default ({ setAbout }) => {
  return (
    <Box id="projects" width="100%" bgColor={"#ab6f24"}>
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
          <div style={{ width: "80%" }} onClick={() => setAbout(0)}>
            <SvgCard
              display="inline"
              scrollAnimation="pulse infinite"
              cardSize={Theme.medSmall}
              color="white"
              text={""}
              fontColor="black"
              padding={false}
              svgElement={
                <ArrowLeft size={Theme.medSmall.replace(/[^0-9.]/g, "")} />
              }
            />
          </div>
          <BoxTitle>
            <TitleText size={Theme.medSmall} color="white">
              프로젝트
            </TitleText>
          </BoxTitle>

          <BoxContent>
            <ThumbBox href="https://brunch.co.kr/@gazezaet">
              <Thumbnail src="https://bit.ly/2updWfR" />
              <Text fontSize={Theme.small} color="white">
                헬스케어 매거진 gaze
              </Text>
            </ThumbBox>
          </BoxContent>

          <BoxCaption>
            <Speak fontSize={Theme.small} color="white">
              디지털 헬스케어나 IT 관련 생각이나 소식, 독서 후기, 일상 등에 관한
              글을 써서 업로드합니다.
            </Speak>
          </BoxCaption>
        </SubBox>
      </ScrollAnimation>
    </Box>
  );
};
