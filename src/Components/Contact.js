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
import { Twitter, Github, Mail } from "../Styles/Icons";
import SvgCard from "./Card";
import ScrollAnimation from "react-animate-on-scroll";
import Theme from "../Styles/Theme";

export default () => {
  return (
    <Box id="contact" width="100%" bgColor={"#F6EAFE"}>
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
          <BoxTitle>
            <TitleText size={Theme.medSmall} color="black">
              연락처
            </TitleText>
          </BoxTitle>
          <BoxCaption>
            <Speak fontSize={Theme.small} color="black">
              질문이 있다거나 하면 언제든 연락주세요.
            </Speak>
          </BoxCaption>

          <BoxContent>
            <a href="https://twitter.com/SeungWookLee5">
              <SvgCard
                scrollAnimation={"bounce"}
                animateOnce={true}
                initiallyVisible={true}
                text="트위터"
                color="black"
                fontColor="black"
                svgElement={
                  <Twitter size={Theme.large.replace(/[^0-9.]/g, "")} />
                }
              />
            </a>
            <a href="https://github.com/slee333">
              <SvgCard
                scrollAnimation={"bounce"}
                animateOnce={true}
                initiallyVisible={true}
                text="깃허브"
                color="black"
                fontColor="black"
                svgElement={
                  <Github size={Theme.large.replace(/[^0-9.]/g, "")} />
                }
              />
            </a>
            <a href="mailto:seungwooklee94@gmail.com">
              <SvgCard
                scrollAnimation={"bounce"}
                animateOnce={true}
                initiallyVisible={true}
                text="이메일"
                color="black"
                fontColor="black"
                svgElement={<Mail size={Theme.large.replace(/[^0-9.]/g, "")} />}
              />
            </a>
          </BoxContent>
        </SubBox>
      </ScrollAnimation>
    </Box>
  );
};
