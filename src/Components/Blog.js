import React from "react";
import { Box, Speak, SubBox, TitleText, BoxTitle, BoxContent, BoxCaption } from '../Styles/Styled';
import styled from "styled-components";
import SvgCard from "./Card";
import ScrollAnimation from "react-animate-on-scroll";
import { ArrowDown, ArrowUp } from "../Styles/Icons";
import { HashLink as Link } from "react-router-hash-link";
import Theme from "../Styles/Theme";

export default () => {
  return (
    <Box id="blog" width="100%" bgColor={"#ab6f24"}>
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
              블로거
            </TitleText>
          </ScrollAnimation>
        </BoxTitle>

        {/* <BoxContent>
          <SvgCard
            delay={0}
            scrollAnimation={"bounce"}
            text="의공학과 나왔구요."
            svgElement={<BiomedicalEng size={Theme.large.slice(0, -2)} />}
          />
        </BoxContent> */}

        <BoxCaption>
          <Speak fontSize={Theme.small} color="white">
            헬스케어, IT, 일상 등에 관한 글을 써서 업로드합니다.
          </Speak>
        </BoxCaption>
      </SubBox>
      <ScrollAnimation
        style={{ position: "absolute", bottom: "0" }}
        animateIn={"fadeIn"}
        duration={1}
        animateOnce={true}
      >
        <Link style={{ marginTop: Theme.small }} smooth to="/#hobby">
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
        <Link style={{ marginTop: Theme.small }} smooth to="/#developer">
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
