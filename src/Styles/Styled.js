import styled from "styled-components";
import Theme from "./Theme";

export const Box = styled.div`
  width: ${props => (props.width ? props.width : "100%")};
  height: 100%;
  min-height: 640px;
  position: relative;
  background-color: ${props => (props.bgColor ? props.bgColor : "#fff")};
  display: flex;
  justify-content: ${props =>
    props.justifyContent ? props.justifyContent : "space-around;"};
  align-items: center;
  padding-left: ${props => (props.paddingLeft ? props.paddingLeft : "0px")};
  padding-left: ${props => (props.paddingRight ? props.paddingRight : "0px")};
  float: right;
`;

export const SubBox = styled.div`
  flex-basis: ${props => String(props.basis) + "%"};
  background-color: ${props => (props.bgColor ? props.bgColor : "transparent")};
  width: 100%;
  height: ${props => (props.height ? props.height : "100%")};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  align-items: center;
`;

export const CenterText = styled.span`
  font-weight: 600;
  font-size: ${props => (props.size ? props.size : "115px")};
  flex-basis: 50%;
  display: inline-block;
  color: ${props => (props.color ? props.color : "black")};
`;

export const FatText = styled.span`
  font-weight: 600;
  font-size: ${props => (props.size ? props.size : "115px")};
  color: ${props => (props.color ? props.color : "black")};
  padding-bottom: ${props =>
    props.paddingBottom ? String(props.paddingBottom) + "px" : "0px"};
`;

export const Text = styled.span`
  font-size: ${props => (props.fontSize ? props.fontSize : "24px")};
  font-family: ${props =>
    props.fontFamily ? props.fontFamily : "NanumGothic"};
  color: ${props => (props.color ? props.color : "black")};
`;

export const Divider = styled.div`
  background-color: transparent;
  display: flex;
  height: 0px;
  width: 95%;
  justify-content: flex-end;
  margin-right: 15%;
  align-items: center;
`;

export const TitleText = styled.span`
  font-size: ${props => (props.size ? props.size : props.theme.medium)};
  flex-basis: 50%;
  display: inline-block;
  font-family: DoHyeon;
  color: ${props => (props.color ? props.color : "black")};
`;

export const Speak = styled(Text)`
  margin-top: ${Theme.xxsmall};
  font-family: 미생체;
  font-size: ${Theme.small};
`;

export const BoxTitle = styled.div`margin-top: ${Theme.small};`;
export const BoxContent = styled.div`
	margin-top: ${Theme.medium};
	justify-content: space-around;
	display: flex;
	width: 80%;
	flex-wrap: wrap;
`;

export const BoxCaption = styled.div`
  margin-top: ${Theme.small};
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;