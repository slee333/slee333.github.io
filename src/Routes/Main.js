import React from "react";
import styled from "styled-components";

const Box = styled.div`
  width: 100%;
  height: 80vh;
  min-height: 600px;
  background-color: ${props => (props.bgColor ? props.bgColor : "#959595")};
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-left: 10%;
  padding-right: 10%;
`;

const SubBox = styled.div`
  flex-basis: ${props => String(props.basis) + "%"};
  background-color: ${props => (props.bgColor ? props.bgColor : "transparent")};
  width: 100%;
  height: 80%;
`;

const CenterText = styled.span`
  font-weight: 600;
  font-size: 100px;
  flex-basis: 50%;
  display: inline-block;
`;

export default () => {
  return (
    <>
      <Box bgColor={"#4287f5"}>
        <SubBox basis={60}>
          <CenterText>이승욱의</CenterText>
          <CenterText>포트폴리오</CenterText>
          <CenterText>시작은 구리나 끝은 창대하리라</CenterText>
        </SubBox>
        <SubBox basis={40}></SubBox>
      </Box>
      <Box>Who I am</Box>
      <Box bgColor={"#6212d2"}>Resume, 이력. 고등학교 대학교 랩 의전 인턴 등등</Box>
      <Box>Previous Works</Box>
      <Box bgColor={"#f0ff8c"}>
        <SubBox basis={30} bgColor="white">
          <CenterText>코딩</CenterText>
        </SubBox>
        <SubBox basis={30} bgColor="white">
          <CenterText>독서</CenterText>
        </SubBox>
        <SubBox basis={30} bgColor="white">
          <CenterText>아티클</CenterText>
        </SubBox>
      </Box>
    </>
  );
};
