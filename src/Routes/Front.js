import React, { useState, useLayoutEffect } from "react";
import { Box, SubBox, CenterText } from "../Styles/Styled";

import Title from "../Components/Title";
import AboutMe from "../Components/AboutMe";

const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};

export default () => {
  const [width, height] = useWindowSize();
  return (
    <div>
      <Title />
      
      <AboutMe />

      <Box id="resume" bgColor={"#6212d2"}>
        Resume, 이력. 고등학교 대학교 랩 의전 인턴 등등
      </Box>
      <Box id="history" bgColor={"#f6d3ee"}>Previous Works</Box>
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
