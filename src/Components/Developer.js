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

export default () => (
	<Box id="Developer" width="80%" bgColor={'#f55742'}>
    <SubBox basis={100}>
			<BoxTitle>
				<TitleText size={'80px'} color="white">
					취미로 개발도 하고 있어요
				</TitleText>
			</BoxTitle>

			<Text style={{ marginTop: '20px' }} fontSize={'40px'} color="white">
				{' '}
				1. 프로그래밍 언어{' '}
			</Text>
			<BoxContent>
				<Card>
					<SvgIcon>
						<HTML size={'120'} />
					</SvgIcon>
					<CardCaption color="white" size={'30px'}>
						HTML
					</CardCaption>
				</Card>

				<Card>
					<SvgIcon>
						<CSS size={'120'} />
					</SvgIcon>

					<CardCaption color="white" size={'30px'}>
						CSS
					</CardCaption>
				</Card>

				<Card>
					<SvgIcon>
						<Python size={'120'} color="white" />
					</SvgIcon>
					<CardCaption color="white" size={'30px'}>
						Python
					</CardCaption>
				</Card>

				<Card>
					<SvgIcon>
						<JavaScript size={'120'} color="white" />
					</SvgIcon>
					<CardCaption color="white" size={'30px'}>
						JavaScript
					</CardCaption>
				</Card>

				<Card>
					<SvgIcon>
						<MATLAB size={'120'} color="white" />
					</SvgIcon>

					<CardCaption color="white" size={'30px'}>
						MATLAB
					</CardCaption>
				</Card>
			</BoxContent>

			<Text fontSize={'20px'} color="white">
				{' '}
				네? 메트랩은 프로그래밍 언어가 아니라구요? 우리 맽랩한테 왜그래요{' '}
			</Text>

			<Text style={{ marginTop: '20px' }} fontSize={'40px'} color="white">
				{' '}
				2. 백엔드 기술{' '}
			</Text>

			<BoxContent>
				<Card>
					<SvgIcon>
						<NodeJS size={'120'} />
					</SvgIcon>
					<CardCaption color="white" size={'30px'}>
						Node js
					</CardCaption>
				</Card>

				<Card>
					<SvgIcon>
						<GraphQL size={'120'} />
					</SvgIcon>

					<CardCaption color="white" size={'30px'}>
						GraphQL
					</CardCaption>
				</Card>

				<Card>
					<SvgIcon>
						<MongoDB size={'120'} color="white" />
					</SvgIcon>
					<CardCaption color="white" size={'30px'}>
						MongoDB
					</CardCaption>
				</Card>

				<Card>
					<SvgIcon>
						<Prisma size={'120'} color="white" />{' '}
					</SvgIcon>
					<CardCaption color="white" size={'30px'}>
						Prisma
					</CardCaption>
				</Card>
			</BoxContent>

      <Text fontSize={'20px'} color="white">
				{' '}
				백엔드 만지는데 MySQL은 안했네요. 시간 되면 배워보려구요.
			</Text>

      <Text style={{ marginTop: '20px' }} fontSize={'40px'} color="white">
				{' '}
				3. 프론트엔드 개발{' '}
			</Text>

			<BoxContent>
				<Card>
					<SvgIcon>
						<ReactLogo size={'120'} />
					</SvgIcon>
					<CardCaption color="white" size={'30px'}>
						React/React Native
					</CardCaption>
				</Card>
				<Card>
					<SvgIcon>
						<Apollo size={'120'} />
					</SvgIcon>
					<CardCaption color="white" size={'30px'}>
						Apollo
					</CardCaption>

				</Card>

				<Card>
					<SvgIcon>
						<Expo size={'120'} color="white" />
					</SvgIcon>
					<CardCaption color="white" size={'30px'}>
						Expo
					</CardCaption>
				</Card>

				<Card>
					<SvgIcon>
						<D3Logo size={'120'} color="white" />{' '}
					</SvgIcon>
					<CardCaption color="white" size={'30px'}>
						D3
					</CardCaption>
				</Card>
			</BoxContent>

      <Text fontSize={'20px'} color="white">
				{' '}
				리액트로 웹 앱도 개발해보고, D3로 데이터 시각화도 해보고. <br/>
        리액트 네이티브는 깊게 못 써보고 Expo만 써봤어요. <br/>
        아폴로는 손에 잘 맞아서 좋네요.<br/>
        Django, Flask도 한번 배워보려구요.
			</Text>

      <Text style={{ marginTop: '20px' }} fontSize={'40px'} color="white">
				{' '}
				4. 그 외
			</Text>

			<BoxContent>
				<Card>
					<SvgIcon>
						<Heroku size={'120'} />
					</SvgIcon>
					<CardCaption color="white" size={'30px'}>
						React/React Native
					</CardCaption>
				</Card>
				<Card>
					<SvgIcon>
						<Netlify size={'120'} />
					</SvgIcon>
					<CardCaption color="white" size={'30px'}>
						Apollo
					</CardCaption>

				</Card>

				<Card>
					<SvgIcon>
						<Django size={'120'} color="white" />
					</SvgIcon>
					<CardCaption color="white" size={'30px'}>
						Expo
					</CardCaption>
				</Card>

				<Card>
					<SvgIcon>
						<D3Logo size={'120'} color="white" />{' '}
					</SvgIcon>
					<CardCaption color="white" size={'30px'}>
						D3
					</CardCaption>
				</Card>
			</BoxContent>

      <Text fontSize={'20px'} color="white">
				{' '}
				리액트로 웹 앱도 개발해보고, D3로 데이터 시각화도 해보고. 
        리액트 네이티브는 깊게 못 써보고 Expo만 써봤어요.
        아폴로는 손에 잘 맞아서 좋네요.
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

		{/* <SvgIcon>
      <GraphQL size={"120"} color="white" />
    </SvgIcon>
    <SvgIcon>
      <Prisma size={"120"} color="white" />
    </SvgIcon>
    <SvgIcon>
      <TensorFlow size={"120"} color="white" />
    </SvgIcon>
    <SvgIcon>
      <NodeJS size={"120"} color="white" />
    </SvgIcon>
    <SvgIcon>
      <Expo size={"120"} color="white" />
    </SvgIcon>
    <SvgIcon>
      <ReactLogo size={"120"} color="white" />
    </SvgIcon>
    <SvgIcon>
      <Apollo size={"120"} color="white" />
    </SvgIcon> */}
	</Box>
);
