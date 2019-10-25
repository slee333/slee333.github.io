import React from "react";
import { Box, Speak, SubBox, TitleText, BoxTitle, BoxContent, BoxCaption, Text } from '../Styles/Styled';
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
  ArrowUp,
  ArrowDown
} from "../Styles/Icons";
import styled from "styled-components";
import SvgCard from "./Card";
import { HashLink as Link } from "react-router-hash-link";
import ScrollAnimation from "react-animate-on-scroll";
import Theme from "../Styles/Theme";

export default () => (
  <Box id="developer" width="100%" bgColor={"#ab2b25"}>
    <SubBox
      basis={80}
      style={{
        minHeight: "48vw",
        paddingTop: Theme.large,
        paddingBottom: Theme.large
      }}
    >
      <ScrollAnimation
        animateIn="bounceInRight"
        initiallyVisible={false}
        animateOnce={true}
      >
        <BoxTitle>
          <TitleText size={Theme.medSmall} color="white">
            아마추어 개발자
          </TitleText>
        </BoxTitle>
      </ScrollAnimation>

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

      <Speak style={{marginTop: Theme.medSmall}} color="white">
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

      <Speak style={{marginTop: Theme.medSmall}} color="white">
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
          text="리액트/리액트 네이티브"
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

      <Speak style={{marginTop: Theme.medSmall}} color="white">
        웹 어플도 만들어보고, 모바일 어플도 손대보고. 이것저것 합니다.
      </Speak>

      <Text
        style={{ marginTop: Theme.medium }}
        fontSize={Theme.small}
        color="white"
      >
        4. 배포
      </Text>

      <BoxContent>
        <SvgCard
          text="히로쿠"
          delay={0}
          svgElement={<Heroku size={Theme.large.slice(0, -2)} />}
        />
        <SvgCard
          text="넷리파이"
          delay={800}
          svgElement={<Netlify size={Theme.large.slice(0, -2)} />}
        />
      </BoxContent>

      <Speak style={{marginTop: Theme.medSmall}} color="white">
        음 얘넨 배포할때 써봤는데, 로고가 이쁘지 않나요? 걍 넣어봤어요.
      </Speak>

      <BoxCaption>
        <Speak color="white">프로젝트로 또 취미로 이것저것 다 만져봤죠.</Speak>
        <Speak color="white">
          프론트엔드도 백엔드도 서툴지만 나름 합니다. 데이터 분석은 자신있구요.
        </Speak>
        <Speak color="white">다만 모바일 디자인은 할 줄만 아는 정도에요.</Speak>
      </BoxCaption>
    </SubBox>
    
  </Box>
);
