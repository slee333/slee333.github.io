import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { HashLink as Link } from 'react-router-hash-link';

// 스타일링 하는 부분입니다.
const Header = styled.header`
  width: 100%;
  border: 0;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  border-bottom: ${props => props.theme.boxBorder};
  border-radius: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px 0px;
  z-index: 2;
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
`;

// withRouter: when we want to access a router that we do not have an access, we use withRouter, which grants access to all stuffs the router does
export default withRouter(({ history }) => {
  return (
    <Header>
      <HeaderWrapper>
        <HeaderColumn>
          <Link smooth to="/#title">
            <span>로고</span>
          </Link>
        </HeaderColumn>
        <HeaderColumn>
        </HeaderColumn>
        <HeaderColumn>
          <HeaderLink smooth to="/#intro">
            <div>compa</div>
          </HeaderLink>
          <HeaderLink smooth to="/#resume">
            <div>life</div>
          </HeaderLink>
          <HeaderLink smooth to="/#hobby">
            <div>ss</div>
          </HeaderLink>
        </HeaderColumn>
      </HeaderWrapper>
    </Header>
  );
});
