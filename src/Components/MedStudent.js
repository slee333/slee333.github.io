import React from "react";
import { Box, Speak, SubBox, TitleText, BoxTitle, BoxContent, BoxCaption } from '../Styles/Styled';
import {
  Blood,
  Hermes,
  Confused,
  InternalMed,
  Study
} from "../Styles/Icons";
import styled from "styled-components";
import SvgCard from "./Card";
import ScrollAnimation from "react-animate-on-scroll";
import { ArrowDown, ArrowUp } from "../Styles/Icons";
import { HashLink as Link } from "react-router-hash-link";
import Theme from "../Styles/Theme";

export default () => {
  return (
    <Box id="medStudent" width="100%" bgColor={"#4287f5"}>
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
              현업 의과대학생
            </TitleText>
          </ScrollAnimation>
        </BoxTitle>

        <BoxContent>
          <SvgCard
            delay={0}
            scrollAnimation={"heartBeat"}
            text="관심사는 의료분야"
            svgElement={<Hermes size={Theme.large.slice(0, -2)} />}
          />
          <SvgCard
            delay={400}
            scrollAnimation={"heartBeat"}
            text="외과엔 관심없고"
            svgElement={<Blood size={Theme.large.slice(0, -2)} />}
          />

          <SvgCard
            delay={800}
            scrollAnimation={"heartBeat infinite"}
            text="내과가 끌리는데"
            svgElement={<InternalMed size={Theme.large.slice(0, -2)} />}
          />
          <SvgCard
            delay={1200}
            scrollAnimation={"heartBeat"}
            text="아직 잘 모르겠네요"
            svgElement={<Confused size={Theme.large.slice(0, -2)} />}
          />
          <SvgCard
            delay={1600}
            scrollAnimation={"heartBeat"}
            text="일단 열심히 해야죠"
            svgElement={<Study size={Theme.large.slice(0, -2)} />}
          />
        </BoxContent>

        <BoxCaption>
          <Speak fontSize={Theme.small} color="white">
            의과대학생입니다. 더 할말은 딱히 없네요..
          </Speak>
        </BoxCaption>
      </SubBox>
    </Box>
  );
};
