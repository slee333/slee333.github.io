import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Box = styled.div`
  width: 100%;
  height: 100vh;
  min-height: 800px;
  background-color: ${props => (props.bgColor ? props.bgColor : "#959595")};
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-left: 10%;
  padding-right: 10%;
`;

const FlexBox = ({ bgColor, bgUrl }) => <Box bgColor={bgColor} bgUrl={bgUrl}/>;

FlexBox.propTypes = {
  bgColor: PropTypes.string,
  bgUrl: PropTypes.string
};

export default FlexBox;
