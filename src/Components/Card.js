import React, { useState } from "react";
import styled from "styled-components";
import ScrollAnimation from "react-animate-on-scroll";
import Theme from "../Styles/Theme";

const Card = styled.div`
  border-radius: ${Theme.small};
  display: ${props => (props.display ? props.display : "flex")};
  flex-direction: column;
  align-items: center;
  padding-left: ${props => (props.padding ? Theme.xxsmall : "0px")};
  padding-right: ${props => (props.padding ? Theme.xxsmall : "0px")};
  padding-top: ${props => (props.padding ? Theme.xxsmall : "0px")};
  padding-bottom: ${props => (props.padding ? Theme.xxsmall : "0px")};
  :hover {
    transition: fill 0.5s ease;
  }
`;

const CardCaption = styled.span`
  margin-top: ${props => (props.marginTop ? props.marginTop : Theme.small)};
  font-family: NanumGothic;
  color: ${props => (props.color ? props.color : "black")};
  font-size: ${props => (props.size ? props.size : Theme.xxsmall)};
  ${Card}:hover & {
    color: #f5b042;
  }
  transition: fill 0.5s ease;
`;

const SvgIcon = styled.svg`
  ${Card}:hover & {
    fill: #f5b042;
  }
  transition: fill 0.5s ease;
  width: ${props => (props.cardSize ? props.cardSize : Theme.large)};
  min-width: 100px;
  min-height: 100px;
  height: ${props => (props.cardSize ? props.cardSize : Theme.large)};
  viewbox: 0 0 100 100;
  xmlns: "http://www.w3.org/2000/svg";
  fill-rule: evenodd;
  clip-rule: evenodd;
  fill: ${props => (props.color ? props.color : "white")};
`;

export default ({
  svgElement,
  fontSize = Theme.xsmall,
  color = "white",
  fontColor = "white",
  text,
  classOnHover = "pulse animated",
  scrollAnimation = "bounce",
  duration = 2,
  delay = 0,
  animateOnce = true,
  cardSize = Theme.large,
  initiallyVisible = true,
  padding = true,
  display = "flex"
}) => {
  const [hovered, setHovered] = useState(false);
  const toggleHover = () => setHovered(!hovered);

  return (
    <Card
      display={display}
      padding={padding}
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
    >
      <ScrollAnimation
        animateIn={scrollAnimation}
        initiallyVisible={initiallyVisible}
        animateOnce={animateOnce}
        delay={delay}
        duration={duration}
      >
        <SvgIcon
          cardSize={cardSize}
          color={color}
          className={hovered ? classOnHover : ""}
        >
          {svgElement}
        </SvgIcon>
      </ScrollAnimation>
      <CardCaption color={fontColor} size={fontSize}>
        {text}
      </CardCaption>
    </Card>
  );
};
