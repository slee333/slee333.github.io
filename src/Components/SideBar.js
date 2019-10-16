import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import ScrollAnimation from "react-animate-on-scroll";

const Sidebar = styled.div`
  position: fixed;
  left: 50px;
  top: 100px;
`;

const CLink = styled(Link)`
  color: #a19b9a;
`;

const Category = styled.ul`
  font-size: 22px;
  margin-bottom: 25px;
  color: #615d5c;
`;

const CatTitle = styled.div`
  font-size: 35px;
  margin-bottom: 20px;
  font-family: 성실체;
  font-weight: bold;
`;

const SubCategory = styled.li`
  font-size: 25px;
  font-family: 할아버지의나눔;
  padding-left: 15px;
  margin-top: 10px;
`;

export default withRouter(({ history }) => {
  return (
    <Sidebar>
        <Category>
          <CatTitle>소개</CatTitle>
          <SubCategory>의과대학생</SubCategory>
          <SubCategory>개발자</SubCategory>
          <SubCategory>엔지니어</SubCategory>
          <SubCategory>블로거</SubCategory>
          <SubCategory>운동</SubCategory>
        </Category>
        <Category>
          <CatTitle>프로젝트</CatTitle>
          <SubCategory>ㅎㅎ</SubCategory>
        </Category>
    </Sidebar>
  );
});
