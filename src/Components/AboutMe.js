import React from "react";
import { Box, CenterText, Text } from "../Styles/Styled";
import { Syringe, Stethoscope, Hermes } from "../Styles/Icons";
import styled from "styled-components";

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
	margin-top: 5%
	margin-bottom: 5%;
`;
const BoxContent = styled.div`
  margin-top: 5%;
  margin-bottom: 10%;
  justify-content: space-around;
  display: flex;
`;

const BoxCaption = styled.div``;

const Card = styled.div``;

const CardCaption = styled.span``;

export default () => (
  <Box id="intro" bgColor={"#4287f5"}>
    <SubBox basis={20} height={"100%"} bgColor="white" />
    <SubBox basis={80}>
      <BoxTitle>
        <TitleText size={"60px"} color="white">
          의과대학생입니다.
        </TitleText>
      </BoxTitle>
      <BoxContent>
        <Card>
          <Hermes size={"100"} color="white" />
		  <CardCaption>할로</CardCaption>
        </Card>
        <Card>
          <Hermes size={"100"} color="white" />
		  <CardCaption>할로</CardCaption>
        </Card>
        <Card>
          <Hermes size={"100"} color="white" />
		  <CardCaption>할로</CardCaption>
        </Card>
        <Card>
          <Hermes size={"100"} color="white" />
		  <CardCaption>할로</CardCaption>
        </Card>
      </BoxContent>

      <Text fontSize={"30px"} color="white">
        의과대학생입니다. 더 할말은 딱히 없네요..
      </Text>
    </SubBox>
  </Box>
);
