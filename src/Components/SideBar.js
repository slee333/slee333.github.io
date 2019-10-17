import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { NavHashLink as Link } from 'react-router-hash-link';

const Sidebar = styled.div`
	position: fixed;
	left: 50px;
	top: 100px;
	width: 15%;
`;

const CatTitle = styled.div`
	font-size: ${props => props.theme.xsmall };
	margin-bottom: ${props => props.theme.xxsmall };
	font-family: 성실체;
	font-weight: bold;
	padding-top: 5px;
	padding-bottom: 5px;
	padding-left: 5px;
`;

const SubCategory = styled.li`
	font-size: ${props => props.theme.xxsmall };
	font-family: 할아버지의나눔;
	padding-left: 20px;
	padding-top: 5px;
	padding-bottom: 5px;
`;

const CLink = styled(Link)`
  color: #3b3737;
  display: block;
  position: relative;
  :before {
    content: "";
    position: absolute;
    width: 100%; 
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #000;
    visibility: hidden;
    -webkit-transform: scaleX(0);
    transform: scaleX(0);
    -webkit-transition: all 0.3s ease-in-out 0s;
    transition: all 0.3s ease-in-out 0s;
  };
  :hover:before {
    visibility: visible;
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
  }
`;

const Category = styled.ul`
	font-size: 22px;
	margin-bottom: 25px;
	color: #615d5c;
	width: 100%;
`;


export default withRouter(({ history }) => {
	const selectedStyle = { textDecoration: 'underline', fontWeight: 'bold' };
	return (
		<Sidebar>
			<Category>
				<CatTitle>
					<CLink smooth to="/#title">
						타이틀
					</CLink>
				</CatTitle>
			</Category>
			<Category>
				<CatTitle>
					<CLink smooth to="/#intro">
						소개
					</CLink>
				</CatTitle>
				<SubCategory>
					<CLink smooth to="/#intro" activeStyle={selectedStyle}>
						의과대학생
					</CLink>
				</SubCategory>
				<SubCategory>
					<CLink smooth to="/#developer" activeStyle={selectedStyle}>
						개발자
					</CLink>
				</SubCategory>
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
