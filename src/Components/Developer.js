import React from 'react';
import { Box, Text } from '../Styles/Styled';
import {
	Python,
	JavaScript,
	CSS,
	MATLAB,
	HTML,
	NodeJS,
	Prisma,
	GraphQL,
	Apollo,
	ReactLogo,
	TensorFlow,
	Expo,
	D3Logo,
	MongoDB,
	Django,
	Heroku,
	Netlify
} from '../Styles/Icons';
import styled from 'styled-components';
import SvgCard from './Card';

const SubBox = styled.div`
	flex-basis: ${(props) => String(props.basis) + '%'};
	background-color: ${(props) => (props.bgColor ? props.bgColor : 'transparent')};
	width: 100%;
	height: ${(props) => (props.height ? props.height : '80%')};
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
`;

const TitleText = styled.span`
	font-size: ${(props) => (props.size ? props.size : '115px')};
	flex-basis: 50%;
	display: inline-block;
	color: ${(props) => (props.color ? props.color : 'black')};
	font-family: 성실체;
`;

const BoxTitle = styled.div`margin-top: 2%;`;
const BoxContent = styled.div`
	margin-top: 5%;
	justify-content: space-around;
	display: flex;
	width: 80%;
`;

const BoxCaption = styled.div`
	margin-top: 2.5%;
	width: 80%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export default () => (
	<Box id="Developer" width="80%" bgColor={'#f55742'}>
		<SubBox basis={100}>
			<BoxTitle>
				<TitleText size={'80px'} color="white">
					취미로 개발도 하고 있어요
				</TitleText>
			</BoxTitle>

			<Text style={{ marginTop: '60px' }} fontSize={'40px'} color="white">
				1. 프로그래밍 언어
			</Text>
			<BoxContent>
				<SvgCard text="HTML" svgElement={<HTML size={'120'} />} />
				<SvgCard text="CSS" svgElement={<CSS size={'120'} />} />
				<SvgCard text="파이썬" svgElement={<Python size={'120'} color="white" />} />
				<SvgCard text="자바스크립트" svgElement={<JavaScript size={'120'} color="white" />} />
				<SvgCard text="매트랩" svgElement={<MATLAB size={'120'} color="white" />} />
			</BoxContent>

			<Text fontSize={'20px'} color="white">
				네? 메트랩은 프로그래밍 언어가 아니라구요? 우리 맽랩한테 왜그래요..
			</Text>

			<Text style={{ marginTop: '60px' }} fontSize={'40px'} color="white">
				2. 백엔드 기술
			</Text>

			<BoxContent>
				<SvgCard text="노드 JS" svgElement={<NodeJS size={'120'} />} />
				<SvgCard text="그래프큐엘" svgElement={<GraphQL size={'120'} />} />
				<SvgCard text="몽고디비" svgElement={<MongoDB size={'120'} color="white" />} />
				<SvgCard text="프리즈마" svgElement={<Prisma size={'120'} color="white" />} />
			</BoxContent>

			<Text fontSize={'20px'} color="white">
				백엔드 만지는데 MySQL은 안했네요. 시간 되면 배워보려구요.
			</Text>

			<Text style={{ marginTop: '60px' }} fontSize={'40px'} color="white">
				3. 프론트엔드 개발
			</Text>

			<BoxContent>
				<SvgCard text="리액트/리액트 네이티브" fontSize="25" svgElement={<ReactLogo size={'120'} />} />
				<SvgCard text="아폴로" svgElement={<Apollo size={'120'} />} />
				<SvgCard text="엑스포" svgElement={<Expo size={'120'} color="white" />} />
				<SvgCard text="장고" svgElement={<Django size={'120'} color="white" />} />
				<SvgCard text="D3 JS" svgElement={<D3Logo size={'120'} color="white" />} />
			</BoxContent>

			<Text fontSize={'20px'} color="white">
				웹 어플도 만들어보고, 모바일 어플도 손대보고. 이것저것 합니다.
			</Text>

			<Text style={{ marginTop: '60px' }} fontSize={'40px'} color="white">
				4. 배포
			</Text>

			<BoxContent>
				<SvgCard text="히로쿠" svgElement={<Heroku size={'120'} />} />
				<SvgCard text="넷리파이" svgElement={<Netlify size={'120'} />} />
			</BoxContent>

			<Text fontSize={'20px'} color="white">
				음 그냥 적어봤음
			</Text>

			<BoxCaption>
				<Text fontSize={'40px'} color="white">
					백엔드도 만져봤고, 프론트엔드도 만져봤죠.
				</Text>
				<Text fontSize={'40px'} color="white">
					모바일 앱 만들기도 조금 연습하고 있어요.
				</Text>
				<Text fontSize={'40px'} color="white">
					그럼 풀스택 개발자냐고요? 그럴리가요. 실력이 일천한걸요.
				</Text>
			</BoxCaption>
		</SubBox>
	</Box>
);
