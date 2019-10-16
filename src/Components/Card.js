import React from 'react';
import styled from 'styled-components';

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
	margin-top: ${(props) => (props.marginTop ? props.marginTop : '30px')};
	font-family: 할아버지의나눔;
	color: ${(props) => (props.color ? props.color : 'black')};
	font-size: ${(props) => (props.size ? props.size : '30px')};
	${Card}:hover & {
		color: #f5b042;
	}
	transition: all 0.5s ease;
`;

const SvgIcon = styled.svg`
	${Card}:hover & {
		fill: #f5b042;
		height: 140px;
	}
	transition: all 0.5s ease;
	width: 120px;
	height: 120px;
	viewbox: 0 0 100 100;
	xmlns: "http://www.w3.org/2000/svg";
	fill-rule: evenodd;
	clip-rule: evenodd;
	fill: ${(props) => (props.color ? props.color : 'white')};
`;

export default ({ svgElement, fontSize = '30', color = 'white', text }) => {
	return (
		<Card>
			<SvgIcon>{svgElement}</SvgIcon>
			<CardCaption color={color} size={String(fontSize) + 'px'}>
				{text}
			</CardCaption>
		</Card>
	);
};
