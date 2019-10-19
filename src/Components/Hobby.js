import React from "react";
import { Box, Speak, SubBox, TitleText } from "../Styles/Styled";
import { VideoGame, Guitar, Bass, Tennis, WorkOut, Wine } from "../Styles/Icons";
import styled from "styled-components";
import SvgCard from "./Card";
import ScrollAnimation from "react-animate-on-scroll";
import { ArrowDown, ArrowUp } from "../Styles/Icons";
import { HashLink as Link } from "react-router-hash-link";
import Theme from "../Styles/Theme";

const BoxTitle = styled.div`
  margin-top: ${Theme.small};
`;
const BoxContent = styled.div`
  margin-top: ${Theme.medium};
  justify-content: space-around;
  display: flex;
  width: 80%;
`;

const BoxCaption = styled.div`
  margin-top: ${Theme.medium};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default () => {
  return (
    <Box id="hobby" width="100%" bgColor={"#6f24ab"}>
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
          <ScrollAnimation animateIn="bounceInRight" animateOnce={true}>
            <TitleText size={Theme.medSmall} color="white">
              취미 목록
            </TitleText>
          </ScrollAnimation>
        </BoxTitle>

        <BoxContent>
          <SvgCard
            delay={0}
            scrollAnimation={"bounce"}
            text="게임"
            svgElement={<VideoGame size={Theme.large.slice(0, -2)} />}
          />
          <SvgCard
            delay={400}
            scrollAnimation={"bounce"}
            text="통기타"
            svgElement={<Guitar size={Theme.large.slice(0, -2)} />}
          />

          <SvgCard
            delay={800}
            scrollAnimation={"bounce"}
            text="베이스"
            svgElement={<Bass size={Theme.large.slice(0, -2)} />}
          />
          <SvgCard
            delay={1200}
            scrollAnimation={"bounce"}
            text="테니스"
            svgElement={<Tennis size={Theme.large.slice(0, -2)} />}
          />
          <SvgCard
            delay={1600}
            scrollAnimation={"bounce"}
            text="간헐적 헬스"
            svgElement={<WorkOut size={Theme.large.slice(0, -2)} />}
          />
          <SvgCard
            delay={2000}
            scrollAnimation={"bounce"}
            text="'소량의' 음주"
            svgElement={<Wine size={Theme.large.slice(0, -2)} />}
          />
        </BoxContent>

        <BoxCaption>
          <Speak 
            fontSize={Theme.small}
            color="white"
          >
            게임도 좋아하고, 기타도 가끔 쳐요. 더 꾸준히 쳐야하는데 그게 힘드네요. 운동도 더 해야하는데..
          </Speak>
          <Speak fontSize={Theme.xsmall} color="white">
            술은 과음은 잘 않는 편이고, 달달한 술 좋아합니다.
          </Speak>
        </BoxCaption>
      </SubBox>
      <ScrollAnimation
        style={{ position: "absolute", bottom: "0" }}
        animateIn={"fadeIn"}
        duration={1}
        animateOnce={true}
      >
        <Link style={{ marginTop: Theme.small }} smooth to="/#resume">
          <SvgCard
            display="inline"
            scrollAnimation="pulse infinite"
            cardSize={Theme.medSmall}
            color="white"
            text={""}
            fontColor="white"
            padding={false}
            initiallyVisible={true}
            svgElement={<ArrowDown size={Theme.medSmall.slice(0, -2)} />}
          />
        </Link>
      </ScrollAnimation>
      <ScrollAnimation
        style={{ position: "absolute", top: "0" }}
        animateIn={"fadeIn"}
        duration={1}
        animateOnce={true}
      >
        <Link style={{ marginTop: Theme.small }} smooth to="/#engineer">
          <SvgCard
            display="inline"
            scrollAnimation="pulse infinite"
            cardSize={Theme.medSmall}
            color="white"
            text={""}
            fontColor="white"
            padding={false}
            initiallyVisible={true}
            svgElement={<ArrowUp size={Theme.medSmall.slice(0, -2)} />}
          />
        </Link>
      </ScrollAnimation>
    </Box>
  );
};
