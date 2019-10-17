import React from "react";
import { Box, SubBox, CenterText } from "../Styles/Styled";

import Title from "../Components/Title";
import Division from "../Components/Division";
import AboutMe from "../Components/AboutMe";
import Header from "../Components/Header";

export default () => {
  return (
    <div>
      <Title />

      {/* <Division fontSize={100} text={"소개"} /> */}

      
      <AboutMe />

      <Box id="resume" bgColor={"#6212d2"}>
        Resume, 이력. 고등학교 대학교 랩 의전 인턴 등등
      </Box>
      <Box id="history">Previous Works</Box>
      <Box id="hobby" bgColor={"#f0ff8c"}>
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
    </div>
  );
};
