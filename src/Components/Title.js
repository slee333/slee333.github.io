import React, { useState, useEffect } from "react";
import { Box, SubBox, Text } from "../Styles/Styled";
import ScrollAnimation from "react-animate-on-scroll";
import { HashLink as Link } from "react-router-hash-link";
import Theme from "../Styles/Theme";
import styled from "styled-components";
import { ArrowDown } from "../Styles/Icons";
import SvgCard from "./Card";

const IScrollAnimation = styled(ScrollAnimation)`
  margin-bottom: 10px;
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
  :hover:before {
    visibility: visible;
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
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
  :hover:after {
    visibility: visible;
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
  }
`;

const Line = styled.div`
  margin-bottom: 10px;
`;

export default () => {
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    console.log(window.pageYOffset);
    setTimeout(
      () => setShowTitle(window.pageYOffset > window.innerHeight),
      500
    );
  });

  return (
    <Box width="100%" bgColor={"#fff"} id="title">
      <SubBox basis={80}>
        <SubBox style={{ width: "80%" }}>
          <IScrollAnimation animateOnce={true} animateIn={"fadeIn"}>
            <Text color="#d74c46" fontSize={Theme.small}>
              학생
            </Text>
            <Text fontSize={Theme.small}>
              이지만 공부 외적으로도 이것저것 관심 많고
            </Text>
          </IScrollAnimation>
          <IScrollAnimation delay={500} animateOnce={true} animateIn={"fadeIn"}>
            <Text fontSize={Theme.small}>공대 나왔으니 종종 </Text>
            <Text color="#d74c46" fontSize={Theme.small}>
              엔지니어
            </Text>
            <Text fontSize={Theme.small}>링도 건드려보고</Text>
          </IScrollAnimation>
          <IScrollAnimation
            delay={1000}
            animateOnce={true}
            animateIn={"fadeIn"}
          >
            <Text fontSize={Theme.small}>
              이따금 취미로 코딩도 하는 아마추어
            </Text>
            <Text color="#d74c46" fontSize={Theme.small}>
              {" "}
              개발자
            </Text>
          </IScrollAnimation>
        </SubBox>
        <SubBox style={{ width: "80%", marginTop: "60px" }}>
          <ScrollAnimation delay={1500} animateIn={"fadeIn"} animateOnce={true}>
            <Name fontSize={Theme.medium} style={{}}>
              이승욱
            </Name>
          </ScrollAnimation>
        </SubBox>

        <IScrollAnimation
          style={{ marginTop: "100px" }}
          animateIn={"bounceInRight"}
          duration={1}
          animateOnce={true}
          delay={2000}
        >
          <Link smooth to="/#intro">
            <Text fontSize={Theme.xxsmall}>더 궁금하신가요?</Text>{" "}
          </Link>
        </IScrollAnimation>
        
      </SubBox>
	  <IScrollAnimation
          style={{ position: "absolute", bottom: "0"}}
          animateIn={"fadeIn"}
          duration={1}
          animateOnce={true} 
        >
          <Link style={{ marginTop: "30px" }} smooth to="/#intro">
            <SvgCard
              scrollAnimation="pulse infinite"
              cardSize="60"
              color="black"
              text={""}
              fontColor="black"
			  initiallyVisible={false}
			  padding={false}
              svgElement={<ArrowDown size="60" />}
            />
          </Link>
        </IScrollAnimation>
    </Box>
  );

  //   if (showTitle) {
  //     return (
  //       <Box width="100%" bgColor={"#fff"} id="title">
  //         <SubBox basis={80}>
  //           <SubBox style={{ width: "80%" }}>
  //             <Line>
  //               <Text color="#d74c46" fontSize={Theme.small}>
  //                 학생
  //               </Text>
  //               <Text fontSize={Theme.small}>
  //                 이지만 공부 외적으로도 이것저것 관심 많고
  //               </Text>
  //             </Line>{" "}
  //             <Line>
  //               <Text fontSize={Theme.small}>공대 나왔으니 종종 </Text>
  //               <Text color="#d74c46" fontSize={Theme.small}>
  //                 엔지니어
  //               </Text>
  //               <Text fontSize={Theme.small}>링도 건드려보고</Text>
  //             </Line>
  //             <Line>
  //               <Text fontSize={Theme.small}>
  //                 이따금 취미로 코딩도 하는 아마추어
  //               </Text>
  //               <Text color="#d74c46" fontSize={Theme.small}>
  //                 {" "}
  //                 개발자
  //               </Text>
  //             </Line>
  //           </SubBox>

  //           <SubBox style={{ width: "80%", marginTop: "60px" }}>
  //             <Line>
  //               <Name fontSize={Theme.medium} style={{}}>
  //                 이승욱
  //               </Name>
  //             </Line>
  //           </SubBox>
  //           <Line
  //             style={{ marginTop: "100px" }}
  //             animateIn={"bounceInRight"}
  //             duration={1}
  //             animateOnce={true}
  //             delay={2000}
  //           >
  //             <Link smooth to="/#intro">
  //               <Text color="#d74c46" fontSize={Theme.xxsmall}>
  //                 더 궁금하신가요? ↓
  //               </Text>{" "}
  //             </Link>
  //           </Line>
  //         </SubBox>
  //       </Box>
  //     );
  //   } else {
  //     return (
  //       <Box width="100%" bgColor={"#fff"} id="title">
  //         <SubBox basis={80}>
  //           <SubBox style={{ width: "80%" }}>
  //             <IScrollAnimation animateOnce={true} animateIn={"fadeIn"}>
  //               <Text color="#d74c46" fontSize={Theme.small}>
  //                 학생
  //               </Text>
  //               <Text fontSize={Theme.small}>
  //                 이지만 공부 외적으로도 이것저것 관심 많고
  //               </Text>
  //             </IScrollAnimation>
  //             <IScrollAnimation
  //               delay={500}
  //               animateOnce={true}
  //               animateIn={"fadeIn"}
  //             >
  //               <Text fontSize={Theme.small}>공대 나왔으니 종종 </Text>
  //               <Text color="#d74c46" fontSize={Theme.small}>
  //                 엔지니어
  //               </Text>
  //               <Text fontSize={Theme.small}>링도 건드려보고</Text>
  //             </IScrollAnimation>
  //             <IScrollAnimation
  //               delay={1000}
  //               animateOnce={true}
  //               animateIn={"fadeIn"}
  //             >
  //               <Text fontSize={Theme.small}>
  //                 이따금 취미로 코딩도 하는 아마추어
  //               </Text>
  //               <Text color="#d74c46" fontSize={Theme.small}>
  //                 {" "}
  //                 개발자
  //               </Text>
  //             </IScrollAnimation>
  //           </SubBox>

  //           <SubBox style={{ width: "80%", marginTop: "60px" }}>
  //             <ScrollAnimation
  //               delay={1500}
  //               animateIn={"fadeIn"}
  //               animateOnce={true}
  //             >
  //               <Name fontSize={Theme.medium} style={{}}>
  //                 이승욱
  //               </Name>
  //             </ScrollAnimation>
  //           </SubBox>
  //           <IScrollAnimation
  //             style={{ marginTop: "100px" }}
  //             animateIn={"bounceInRight"}
  //             duration={1}
  //             animateOnce={true}
  //             delay={2000}
  //           >
  //             <Link smooth to="/#intro">
  //               <Text color="#d74c46" fontSize={Theme.xxsmall}>
  //                 더 궁금하신가요? ↓
  //               </Text>{" "}
  //             </Link>
  //           </IScrollAnimation>
  //         </SubBox>
  //       </Box>
  //     );
  //   }
};
