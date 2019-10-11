import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Box = styled.div`
  width: 100%;
  height: 80vh;
  min-height: 600px;
  background-color: ${props => (props.bgColor ? props.bgColor : "#959595")};;
`;

const FlexBox = ({ bgColor, bgUrl }) => <Box bgColor={bgColor} bgUrl={bgUrl}></Box>;

FlexBox.propTypes = {
  bgColor: PropTypes.string,
  bgUrl: PropTypes.string
};

export default FlexBox;
