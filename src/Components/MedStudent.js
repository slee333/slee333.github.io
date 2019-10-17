import React from "react";
import { Box, Text } from "../Styles/Styled";
import {
  Blood,
  Hermes,
  Confused,
  Cross,
  InternalMed,
  Study
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
  margin-top: 5%;
`;

const Card = styled.div`
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 15px;
  padding-bottom: 30px;
  :hover {
    transition: all 0.8s ease;
  }
`;

const CardCaption = styled.span`
  margin-top: 30px;
  font-family: 할아버지의나눔;
  color: ${props => (props.color ? props.color : "black")};
  font-size: ${props => (props.size ? props.size : "30px")};
  ${Card}:hover & {
    color: #f5b042;
  }
  transition: all 0.5s ease;
`;

const SvgIcon = styled.svg`
  ${Card}:hover & {
    fill: #f5b042;
  }
  transition: all 0.5s ease;
  width: 120px;
  height: 120px;
  viewbox: 0 0 100 100;
  xmlns: "http://www.w3.org/2000/svg";
  fill-rule: evenodd;
  clip-rule: evenodd;
  fill: ${props => (props.color ? props.color : "white")};
`;

export default () => (
  <Box id="intro" width="100%" bgColor={"#4287f5"}>
    <SubBox basis={80}>
      <BoxTitle>
		  <ScrollAnimation animateIn="bounceInRight" animateOnce={true}>
        <TitleText size={"80px"} color="white">
          의과대학생입니다.
        </TitleText></ScrollAnimation>
      </BoxTitle>

      <BoxContent>
        <SvgCard
          delay={0}
          scrollAnimation={"heartBeat"}
          text="관심사는 의료분야"
          svgElement={<Hermes size={"120"} />}
        />
        <ScrollAnimation
          animateIn={"heartBeat"}
          initiallyVisible={true}
          animateOnce={false}
          delay={400}
          duration={2}
        >
          <Card>
            <SvgIcon>
              <Blood size={"120"} />
            </SvgIcon>
            <SvgIcon color="#f5b042" style={{ position: "absolute" }}>
              <Cross size={"120"} />
            </SvgIcon>

            <CardCaption color="white" size={"30px"}>
              외과에는 관심없고
            </CardCaption>
          </Card>
        </ScrollAnimation>

        <SvgCard
          delay={800}
          scrollAnimation={"heartBeat infinite"}
          text="내과가 끌리는데"
          svgElement={<InternalMed size={"120"} />}
        />
        <SvgCard
          delay={1200}
          scrollAnimation={"heartBeat"}
          text="아직 잘 모르겠네요"
          svgElement={<Confused size={"120"} />}
        />
        <SvgCard
          delay={1600}
          scrollAnimation={"heartBeat"}
          text="일단 열심히 해야죠"
          svgElement={<Study size={"120"} />}
        />

      </BoxContent>

      <BoxCaption>
        <Text fontSize={"40px"} color="white">
          의과대학생입니다. 더 할말은 딱히 없네요..
        </Text>
      </BoxCaption>
    </SubBox>
  </Box>
);
