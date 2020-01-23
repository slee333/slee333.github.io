import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ScrollAnimation from "react-animate-on-scroll";
import { HashLink as Link } from "react-router-hash-link";
import Theme from "../Styles/Theme";
import "../Styles/titleText.css";
import SvgCard from "./Card";
import { Box, SubBox, Text } from "../Styles/Styled";
import { ArrowDown } from "../Styles/Icons";

const IScrollAnimation = styled(ScrollAnimation)`
  margin-bottom: ${Theme.xxsmall};
`;

const Name = styled(Text)`
  position: relative
  :before {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #000;
    visibility: hidden;
    -webkit-transform: scaleX(0);
    transform: scaleX(0);
    -webkit-transition: all 0.3s ease-in-out 0s;
    transition: all 0.3s ease-in-out 0s;
  }
  :after {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    top: 0;
    left: 0;
    background-color: #000;
    visibility: hidden;
    -webkit-transform: scaleX(0);
    transform: scaleX(0);
    -webkit-transition: all 0.3s ease-in-out 0s;
    transition: all 0.3s ease-in-out 0s;
  }
`;

const HighlightText = styled(Text)`
  font-family: DoHyeon;
`;

export default () => {
  const [underLine, setUnderLine] = useState(false);

  useEffect(() => {
    setTimeout(() => setUnderLine(!underLine), underLine ? 1000 : 2000);
  }, [underLine]);

  return (
    <Box width="100%" bgColor={"#fff"} id="title">
      <SubBox style={{ minHeight: "48vw", height: "100%" }} basis={80}>
        <SubBox style={{ width: "80%" }}>
          <IScrollAnimation animateOnce={true} animateIn={"fadeIn"}>
            <HighlightText color="#d74c46" fontSize={Theme.small}>
              학생
            </HighlightText>
            <HighlightText fontSize={Theme.small}>
              이지만 공부 외적으로도 이것저것 관심 많고
            </HighlightText>
          </IScrollAnimation>
          <IScrollAnimation delay={500} animateOnce={true} animateIn={"fadeIn"}>
            <HighlightText fontSize={Theme.small}>
              공대 나왔으니 또{" "}
            </HighlightText>
            <HighlightText color="#d74c46" fontSize={Theme.small}>
              엔지니어
            </HighlightText>
            <HighlightText fontSize={Theme.small}>
              링도 가끔 건드려보고
            </HighlightText>
          </IScrollAnimation>
          <IScrollAnimation
            delay={1000}
            animateOnce={true}
            animateIn={"fadeIn"}
          >
            <HighlightText fontSize={Theme.small}>
              이따금씩 취미로 코딩도 해보는 아마추어
            </HighlightText>
            <HighlightText color="#d74c46" fontSize={Theme.small}>
              {" "}
              개발자
            </HighlightText>
          </IScrollAnimation>
        </SubBox>
        <SubBox
          style={{
            width: "80%",
            marginTop: Theme.medSmall,
            marginBottom: Theme.large
          }}
        >
          <ScrollAnimation delay={1500} animateIn={"fadeIn"} animateOnce={true}>
            <Name
              className={underLine ? "myName" : " "}
              fontSize={Theme.medium}
              style={{ width: "60%", fontFamily: "DoHyeon" }}
            > 
              이 승 욱
            </Name>
          </ScrollAnimation>
        </SubBox>
      </SubBox>
      {/* <IScrollAnimation
        style={{ position: "absolute", bottom: "0" }}
        animateIn={"fadeIn"}
        duration={1}
        animateOnce={true}
      >
        <Link style={{ marginTop: Theme.medium }} smooth to="/#intro">
          <SvgCard
            display="inline"
            scrollAnimation="pulse infinite"
            cardSize={Theme.medSmall}
            color="black"
            text={""}
            fontColor="black"
            initiallyVisible={false}
            padding={false}
            svgElement={<ArrowDown size={Theme.medSmall.slice(0, -2)} />}
          />
        </Link>
      </IScrollAnimation> */}
    </Box>
  );
};
