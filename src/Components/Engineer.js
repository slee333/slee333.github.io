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
import {
  CircuitDesign,
  DataProcessing,
  BiomedicalEng,
  TensorFlow,
  MedicalImaging,
  ArrowLeft
} from "../Styles/Icons";
import SvgCard from "./Card";
import ScrollAnimation from "react-animate-on-scroll";
import Theme from "../Styles/Theme";

export default ({ setAbout }) => {
  return (
    <Box id="engineer" width="100%" bgColor={"#209661"}>
      <ScrollAnimation
        style={{ width: "100%" }}
        animateIn="fadeIn"
        animateOnce={true}
      >
        <SubBox
          style={{
            minHeight: "48vw",
            height: "100%",
            paddingTop: Theme.large,
            paddingBottom: Theme.large
          }}
          basis={80}
        >
          <div style={{ width: "80%" }} onClick={() => setAbout(0)}>
            <SvgCard
              display="inline"
              scrollAnimation="pulse infinite"
              cardSize={Theme.medSmall}
              color="white"
              text={""}
              fontColor="black"
              padding={false}
              svgElement={
                <ArrowLeft size={Theme.medSmall.replace(/[^0-9.]/g, "")} />
              }
            />
          </div>
          <BoxTitle>
            <TitleText size={Theme.medSmall} color="white">
              아마추어 엔지니어
            </TitleText>
          </BoxTitle>

          <BoxContent>
            <SvgCard
              delay={0}
              scrollAnimation={"bounce"}
              text="의공학과 나왔구요."
              svgElement={<BiomedicalEng size={Theme.large.slice(0, -2)} />}
            />
            <SvgCard
              delay={400}
              scrollAnimation={"bounce"}
              text="영상을 주로 공부했죠"
              svgElement={<MedicalImaging size={Theme.large.slice(0, -2)} />}
            />

            <SvgCard
              delay={800}
              scrollAnimation={"bounce"}
              text="데이터 분석 많이 했고"
              svgElement={<DataProcessing size={Theme.large.slice(0, -2)} />}
            />
            <SvgCard
              delay={1200}
              scrollAnimation={"bounce"}
              text="회로설계도 적당히,"
              svgElement={<CircuitDesign size={Theme.large.slice(0, -2)} />}
            />
            <SvgCard
              delay={1600}
              scrollAnimation={"bounce"}
              text="머신러닝도 조금?"
              svgElement={<TensorFlow size={Theme.large.slice(0, -2)} />}
            />
          </BoxContent>

          <BoxCaption>
            <Speak fontSize={Theme.small} color="white">
              배운걸 어떻게든 써먹으려 고군분투 중입니다.
            </Speak>
            <Speak fontSize={Theme.small} color="white">
              요즘은 텐서플로우로 머신러닝 만져보고 있어요.
            </Speak>
          </BoxCaption>
        </SubBox>
      </ScrollAnimation>
    </Box>
  );
};
