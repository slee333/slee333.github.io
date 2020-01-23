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
import { MedStudent, Developer, Engineer, Blog, Dance } from "../Styles/Icons";
import SvgCard from "./Card";
import ScrollAnimation from "react-animate-on-scroll";
import { HashLink as Link } from "react-router-hash-link";
import Theme from "../Styles/Theme";

export default ({ setAbout }) => {
  return (
    <Box id="intro" width="100%" bgColor={"#fef6ea"}>
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
            <TitleText size={Theme.medSmall}>자기소개</TitleText>
          </BoxTitle>

          <BoxContent>
            <div onClick={() => setAbout(1)}>
              <SvgCard
                onClick={() => setAbout(1)}
                delay={0}
                scrollAnimation={"bounce"}
                text="의과대학생"
                color="#4287f5"
                fontColor="black"
                svgElement={<MedStudent size={Theme.large.slice(0, -2)} />}
              />
            </div>
            <Link smooth to="" onClick={() => setAbout(2)}>
              <SvgCard
                delay={400}
                scrollAnimation={"bounce"}
                text="아마추어 개발자"
                color="#ab2b25"
                fontColor="black"
                svgElement={<Developer size={Theme.large.slice(0, -2)} />}
              />
            </Link>
            <Link smooth to="" onClick={() => setAbout(3)}>
              <SvgCard
                delay={800}
                scrollAnimation={"bounce"}
                text="아마추어 엔지니어"
                color="#209661"
                fontColor="black"
                svgElement={<Engineer size={Theme.large.slice(0, -2)} />}
              />
            </Link>
            <Link smooth to="" onClick={() => setAbout(4)}>
              <SvgCard
                delay={1200}
                scrollAnimation={"bounce"}
                text="블로거"
                color="#ab6f24"
                fontColor="black"
                svgElement={<Blog size={Theme.large.slice(0, -2)} />}
              />
            </Link>
            <Link smooth to="" onClick={() => setAbout(5)}>
              <SvgCard
                delay={1600}
                scrollAnimation={"bounce"}
                text="기타 여가활동"
                color="#6f24ab"
                fontColor="black"
                svgElement={<Dance size={Theme.large.slice(0, -2)} />}
              />
            </Link>
          </BoxContent>

          <BoxCaption>
            <Speak fontSize={Theme.xsmall}>
              간략하게 표현하면 이런 사람입니다.
            </Speak>
            <Speak fontSize={Theme.xsmall}>
              클릭하면 더 많은 내용을 보실 수 있어요.
            </Speak>
          </BoxCaption>
        </SubBox>{" "}
      </ScrollAnimation>
    </Box>
  );
};
