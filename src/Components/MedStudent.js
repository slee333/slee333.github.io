import React from "react";
import {
  Box,
  Speak,
  SubBox,
  TitleText,
  BoxTitle,
  BoxContent,
  BoxCaption
} from "../Styles/Styled";
import { Blood, Hermes, Confused, InternalMed, Study, ArrowLeft } from "../Styles/Icons"; 
import SvgCard from "./Card";
import ScrollAnimation from "react-animate-on-scroll";
import Theme from "../Styles/Theme";

export default ({ setAbout }) => {
  return (
    <Box id="medStudent" width="100%" bgColor={"#4287f5"}>
      <ScrollAnimation style={{width:"100%"}} animateIn="fadeIn" animateOnce={true}>
        <SubBox
          style={{
            minHeight: "48vw",
            height: "100%",
            paddingTop: Theme.large,
            paddingBottom: Theme.large
          }}
          basis={80}
        > 
          <div style={{width: "80%"}} onClick={() => setAbout(0)}>
            <SvgCard
              display="inline"
              scrollAnimation="pulse infinite"
              cardSize={Theme.medSmall}
              color="white"
              text={""}
              fontColor="black"
              padding={false}
              svgElement={<ArrowLeft size={Theme.medSmall.replace(/[^0-9.]/g,'')} />}
            />
          </div>
          <BoxTitle>
            <TitleText size={Theme.medSmall} color="white">
              현업 의과대학생
            </TitleText>
          </BoxTitle>

          <BoxContent>
            <SvgCard
              delay={0}
              scrollAnimation={"heartBeat"}
              text="본과 3학년"
              svgElement={<Hermes size={Theme.large.replace(/[^0-9.]/g,'')} />}
            />
            <SvgCard
              delay={400}
              scrollAnimation={"heartBeat"}
              text="외과는 안 끌리고"
              svgElement={<Blood size={Theme.large.replace(/[^0-9.]/g,'')} />}
            />

            <SvgCard
              delay={800}
              scrollAnimation={"heartBeat infinite"}
              text="내과가 맘에 듦"
              svgElement={<InternalMed size={Theme.large.replace(/[^0-9.]/g,'')} />}
            />
            <SvgCard
              delay={1200}
              scrollAnimation={"heartBeat"}
              text="아직은 잘 몰라요"
              svgElement={<Confused size={Theme.large.replace(/[^0-9.]/g,'')} />}
            />
            <SvgCard
              delay={1600}
              scrollAnimation={"heartBeat"}
              text="하루하루 열심히!"
              svgElement={<Study size={Theme.large.replace(/[^0-9.]/g,'')} />}
            />
          </BoxContent>

          <BoxCaption>
            <Speak fontSize={Theme.small} color="white">
              의과대학생입니다. 외과보다는 내과에 더 관심이 있지만 앞으로 어떻게 마음이 바뀔진 알수가 없네요.
            </Speak>
          </BoxCaption>
        </SubBox>
      </ScrollAnimation>
    </Box>
  );
};
