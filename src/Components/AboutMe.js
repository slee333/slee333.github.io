import React from 'react';
import { Box, CenterText, Text } from '../Styles/Styled';
import { Syringe, Stethoscope, Hermes } from '../Styles/Icons';
import styled from 'styled-components';

const SubBox = styled.div`
	flex-basis: ${(props) => String(props.basis) + '%'};
	background-color: ${(props) => (props.bgColor ? props.bgColor : 'transparent')};
	width: 100%;
	height: ${(props) => (props.height ? props.height : '80%')};
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const BoxTitle = styled.span`
	font-size: ${(props) => (props.size ? props.size : '115px')};
	flex-basis: 50%;
	display: inline-block;
	color: ${(props) => (props.color ? props.color : 'black')};
	font-family: 성실체;
`;

export default () => (
	<Box id="intro" bgColor={'#4287f5'}>
		<SubBox basis={20} height={'100%'} bgColor="white" />
		<SubBox basis={80}>
			<div>
				<BoxTitle fontSize={'50px'} color="white">
					의 과 대 학 생
				</BoxTitle>
			</div>
			<div>
				<Hermes size={'120'} color="white" />
				<Stethoscope size={'120'} color="white" />
			</div>

			<Text fontSize={'30px'} color="white">
				{' '}
				의과대학생입니다. 더 할말은 딱히 없네요..
			</Text>
		</SubBox>
	</Box>
);
