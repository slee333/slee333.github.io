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
  VideoGame,
  Guitar,
  Bass,
  Tennis,
  WorkOut,
  Wine,
  ArrowLeft
} from "../Styles/Icons";
import SvgCard from "./Card";
import ScrollAnimation from "react-animate-on-scroll";
import Theme from "../Styles/Theme";

export default ({ setAbout }) => {
  return (
    <Box id="hobby" width="100%" bgColor={"#6f24ab"}>
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
              취미 목록
            </TitleText>
          </BoxTitle>

          <BoxContent>
            <SvgCard
              delay={0}
              scrollAnimation={"bounce"}
              text="게임"
              svgElement={<VideoGame size={Theme.large.replace(/[^0-9.]/g, "")} />}
            />
            <SvgCard
              delay={400}
              scrollAnimation={"bounce"}
              text="통기타"
              svgElement={<Guitar size={Theme.large.replace(/[^0-9.]/g, "")} />}
            />
            <SvgCard
              delay={800}
              scrollAnimation={"bounce"}
              text="베이스"
              svgElement={<Bass size={Theme.large.replace(/[^0-9.]/g, "")} />}
            />
            <SvgCard
              delay={1200}
              scrollAnimation={"bounce"}
              text="테니스"
              svgElement={<Tennis size={Theme.large.replace(/[^0-9.]/g, "")} />}
            />
            <SvgCard
              delay={1600}
              scrollAnimation={"bounce"}
              text="간헐적 헬스"
              svgElement={<WorkOut size={Theme.large.replace(/[^0-9.]/g, "")} />}
            />
            <SvgCard
              delay={2000}
              scrollAnimation={"bounce"}
              text="'소량의' 음주"
              svgElement={<Wine size={Theme.large.replace(/[^0-9.]/g, "")} />}
            />
          </BoxContent>

          <BoxCaption>
            <Speak fontSize={Theme.small} color="white">
              게임도 좋아하고, 기타도 가끔 쳐요. 테니스 좋아합니다.
            </Speak>
            <Speak fontSize={Theme.xsmall} color="white">
              맛좋은 술은 환영하지만 과음은 싫어합니다.
            </Speak>
          </BoxCaption>
        </SubBox>
      </ScrollAnimation>
    </Box>
  );
};
