import React, { useState } from "react";
import styled from "styled-components";
import ScrollAnimation from "react-animate-on-scroll";

const Card = styled.div`
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 15px;
  padding-bottom: 30px;
  :hover {
    transition: all 0.8s ease;
  }
`;

const CardCaption = styled.span`
  margin-top: ${props => (props.marginTop ? props.marginTop : "30px")};
  font-family: 할아버지의나눔;
  color: ${props => (props.color ? props.color : "black")};
  font-size: ${props => (props.size ? props.size : "30px")};
  ${Card}:hover & {
    color: #f5b042;
  }
  transition: all 0.5s ease;
`;

const SvgIcon = styled.svg`
  ${Card}:hover & {
    fill: #f5b042;
  }
  transition: all 0.5s ease;
  width: 120px;
  height: 120px;
  viewbox: 0 0 100 100;
  xmlns: "http://www.w3.org/2000/svg";
  fill-rule: evenodd;
  clip-rule: evenodd;
  fill: ${props => (props.color ? props.color : "white")};
`;

export default ({
  svgElement,
  fontSize = "30",
  color = "white",
  fontColor = "white",
  text,
  classOnHover = "pulse animated",
  scrollAnimation = "bounce",
  duration = 2,
  delay = 0,
  animateOnce = false
}) => {
  const [hovered, setHovered] = useState(false);
  const toggleHover = () => setHovered(!hovered);

  return (
    <Card onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
      <ScrollAnimation
        animateIn= {scrollAnimation}
        initiallyVisible={true}
		animateOnce={animateOnce}
		delay={delay}
		duration={duration}
      >
        <SvgIcon color={color} className={hovered ? classOnHover : ""}>{svgElement}</SvgIcon>
      </ScrollAnimation>
      <CardCaption color={fontColor} size={String(fontSize) + "px"}>
        {text}
      </CardCaption>
    </Card>
  );
};
