import React from "react";
import { Box, Text } from "../Styles/Styled";
import {
  Python,
  JavaScript,
  CSS,
  MATLAB,
  HTML,
  NodeJS,
  Prisma,
  GraphQL,
  Apollo,
  ReactLogo,
  TensorFlow,
  Expo,
  D3Logo,
  MongoDB,
  Django,
  Heroku,
  Netlify
} from "../Styles/Icons";
import styled from "styled-components";
import SvgCard from "./Card";
import ScrollAnimation from "react-animate-on-scroll";

const SubBox = styled.div`
  flex-basis: ${props => String(props.basis) + "%"};
  background-color: ${props => (props.bgColor ? props.bgColor : "transparent")};
  width: 100%;
  height: ${props => (props.height ? props.height : "80%")};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const TitleText = styled.span`
  font-size: ${props => (props.size ? props.size : "115px")};
  flex-basis: 50%;
  display: inline-block;
  color: ${props => (props.color ? props.color : "black")};
  font-family: 성실체;
`;

const BoxTitle = styled.div`
  margin-top: 2%;
`;
const BoxContent = styled.div`
  margin-top: 5%;
  justify-content: space-around;
  display: flex;
  width: 80%;
`;

const BoxCaption = styled.div`
  margin-top: 2.5%;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default () => (
  <Box id="developer" width="80%" bgColor={"#f55742"}>
    <SubBox basis={100} style={{paddingTop:"100px"}}>
      <ScrollAnimation
        animateIn="bounceInRight"
        initiallyVisible={false}
        animateOnce={true}
      >
        <BoxTitle>
          <TitleText size={"80px"} color="white">
            취미로 개발도 하고 있어요
          </TitleText>
        </BoxTitle>
      </ScrollAnimation>

      <Text style={{ marginTop: "60px" }} fontSize={"40px"} color="white">
        1. 프로그래밍 언어
      </Text>
      <BoxContent>
        <SvgCard delay={0} text="HTML" svgElement={<HTML size={"120"} />} />
        <SvgCard delay={400} text="CSS" svgElement={<CSS size={"120"} />} />
        <SvgCard
          delay={800}
          text="파이썬"
          svgElement={<Python size={"120"} />}
        />
        <SvgCard
          delay={1200}
          text="자바스크립트"
          svgElement={<JavaScript size={"120"} />}
        />
        <SvgCard
          delay={2000}
          text="매트랩"
          svgElement={<MATLAB size={"120"} />}
        />
      </BoxContent>

      <BoxCaption>
        <Text fontSize={"40px"} color="white">
          아 그림 찾기 귀찮아
        </Text>
        <Text fontSize={"40px"} color="white">
          그냥 글로 적겠슴다
        </Text>
      </BoxCaption>
    </SubBox>
  </Box>
);
