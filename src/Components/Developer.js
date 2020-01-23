import React from "react";
import {
  Box,
  Speak,
  SubBox,
  TitleText,
  BoxTitle,
  BoxContent,
  BoxCaption,
  Text
} from "../Styles/Styled";
import {
  Python,
  JavaScript,
  CSS,
  MATLAB,
  HTML,
  NodeJS,
  Prisma,
  GraphQL,
  Apollo,
  ReactLogo,
  Expo,
  D3Logo,
  MongoDB,
  Django,
  Heroku,
  Netlify,
  ArrowLeft
} from "../Styles/Icons";
import SvgCard from "./Card";
import ScrollAnimation from "react-animate-on-scroll";
import Theme from "../Styles/Theme";

export default ({ setAbout }) => (
  <Box id="developer" width="100%" bgColor={"#ab2b25"}>
    <ScrollAnimation
      style={{ width: "100%" }}
      animateIn="fadeIn"
      animateOnce={true}
    >
      <SubBox
        basis={80}
        style={{
          minHeight: "48vw",
          paddingTop: Theme.large,
          paddingBottom: Theme.large
        }}
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
            아마추어 개발자
          </TitleText>
        </BoxTitle>

        <Text
          style={{ marginTop: Theme.medium }}
          fontSize={Theme.small}
          color="white"
        >
          1. 프로그래밍 언어
        </Text>
        <BoxContent>
          <SvgCard
            delay={0}
            text="HTML"
            svgElement={<HTML size={Theme.large.slice(0, -2)} />}
          />
          <SvgCard
            delay={400}
            text="CSS"
            svgElement={<CSS size={Theme.large.slice(0, -2)} />}
          />
          <SvgCard
            delay={800}
            text="파이썬"
            svgElement={<Python size={Theme.large.slice(0, -2)} />}
          />
          <SvgCard
            delay={1200}
            text="자바스크립트"
            svgElement={<JavaScript size={Theme.large.slice(0, -2)} />}
          />
          <SvgCard
            delay={1600}
            text="매트랩"
            svgElement={<MATLAB size={Theme.large.slice(0, -2)} />}
          />
        </BoxContent>

        <Speak style={{ marginTop: Theme.medSmall, marginLeft: Theme.medSmall, marginRight: Theme.medSmall }} color="white">
          네? 메트랩은 프로그래밍 언어가 아니라구요? 우리 맽랩한테 왜그래요..
        </Speak>

        <Text
          style={{ marginTop: Theme.medium }}
          fontSize={Theme.small}
          color="white"
        >
          2. 백엔드 기술
        </Text>

        <BoxContent>
          <SvgCard
            delay={0}
            text="노드 JS"
            svgElement={<NodeJS size={Theme.large.slice(0, -2)} />}
          />
          <SvgCard
            delay={400}
            text="그래프큐엘"
            svgElement={<GraphQL size={Theme.large.slice(0, -2)} />}
          />
          <SvgCard
            delay={800}
            text="몽고디비"
            svgElement={<MongoDB size={Theme.large.slice(0, -2)} />}
          />
          <SvgCard
            delay={1200}
            text="프리즈마"
            svgElement={<Prisma size={Theme.large.slice(0, -2)} />}
          />
        </BoxContent>

        <Speak style={{ marginTop: Theme.medSmall, marginLeft: Theme.medSmall, marginRight: Theme.medSmall}} color="white">
          백엔드 만지는데 MySQL은 안했네요. 시간 되면 배워보려구요.
        </Speak>

        <Text
          style={{ marginTop: Theme.medium }}
          fontSize={Theme.small}
          color="white"
        >
          3. 프론트엔드 개발
        </Text>

        <BoxContent>
          <SvgCard
            delay={0}
            text="리액트/RN"
            svgElement={<ReactLogo size={Theme.large.slice(0, -2)} />}
          />
          <SvgCard
            delay={400}
            text="아폴로"
            svgElement={<Apollo size={Theme.large.slice(0, -2)} />}
          />
          <SvgCard
            delay={800}
            text="엑스포"
            svgElement={<Expo size={Theme.large.slice(0, -2)} />}
          />
          <SvgCard
            delay={1200}
            text="장고"
            svgElement={<Django size={Theme.large.slice(0, -2)} />}
          />
          <SvgCard
            delay={1600}
            text="D3 JS"
            svgElement={<D3Logo size={Theme.large.slice(0, -2)} />}
          />
        </BoxContent>

        <Speak style={{ marginTop: Theme.medSmall, marginLeft: Theme.medSmall, marginRight: Theme.medSmall }} color="white">
          웹 어플도 만들어보고, 모바일 어플도 손대보고. 이것저것 합니다.
        </Speak>

        <BoxCaption>
        </BoxCaption>
      </SubBox>
    </ScrollAnimation>
  </Box>
);
