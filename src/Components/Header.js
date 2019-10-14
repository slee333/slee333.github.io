import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { HashLink as Link } from 'react-router-hash-link';

// 헤더 스타일링
const Header = styled.header`
  width: 100%;
  border: 0;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(240,240,240,0.8);
  border-bottom: ${props => props.theme.boxBorder};
  border-radius: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0px;
  z-index: 10;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: ${props => props.theme.maxWidth};
  display: flex;
  justify-content: center;
`;

const HeaderColumn = styled.div`
  width: 33%;
  text-align: center;
  display: flex;
  justify-content: space-evenly;
`;

const HeaderLink = styled(Link)`
  &:not(:last-child) {
    margin-right: 30px;
  }
  color: #222;
  font-weight: 300;
`;

export default withRouter(({ history }) => {
  return (
    <Header>
      <HeaderWrapper>
        <HeaderColumn>
          <HeaderLink smooth to="/#title">
            로고
          </HeaderLink>
        </HeaderColumn>
        <HeaderColumn>
        </HeaderColumn>
        <HeaderColumn>
          <HeaderLink smooth to="/#intro">
            Section1
          </HeaderLink>
          <HeaderLink smooth to="/#resume">
            Section2
          </HeaderLink>
          <HeaderLink smooth to="/#hobby">
            Section3
          </HeaderLink>
        </HeaderColumn>
      </HeaderWrapper>
    </Header>
  );
});
