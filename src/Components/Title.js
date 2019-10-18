import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ScrollAnimation from 'react-animate-on-scroll';
import { HashLink as Link } from 'react-router-hash-link';
import Theme from '../Styles/Theme';
import '../Styles/titleText.css';
import SvgCard from './Card';
import { Box, SubBox, Text } from '../Styles/Styled';
import { ArrowDown } from '../Styles/Icons';

const IScrollAnimation = styled(ScrollAnimation)`
  margin-bottom: ${ Theme.xxsmall };
`;

const Name = styled(Text)`
  position: relative
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
  }
  :after {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    top: 0;
    left: 0;
    background-color: #000;
    visibility: hidden;
    -webkit-transform: scaleX(0);
    transform: scaleX(0);
    -webkit-transition: all 0.3s ease-in-out 0s;
    transition: all 0.3s ease-in-out 0s;
  }
`;

export default () => {
	const [ underLine, setUnderLine ] = useState(false);

	useEffect(() => {
		setTimeout(() => setUnderLine(!underLine), underLine ? 1000 : 2000);
		console.log( Theme.small , Theme.small.slice(0,-2))
	});

	return (
		<Box width="100%" bgColor={'#fff'} id="title">
			<SubBox style={{minHeight:"56vw", height:"100%"}} basis={80}>
				<SubBox style={{ width: '80%' }}>
					<IScrollAnimation animateOnce={true} animateIn={'fadeIn'}>
						<Text color="#d74c46" fontSize={Theme.small}>
							학생
						</Text>
						<Text fontSize={Theme.small}>이지만 공부 외적으로도 이것저것 관심 많고</Text>
					</IScrollAnimation>
					<IScrollAnimation delay={500} animateOnce={true} animateIn={'fadeIn'}>
						<Text fontSize={Theme.small}>공대 나왔으니 종종 </Text>
						<Text color="#d74c46" fontSize={Theme.small}>
							엔지니어
						</Text>
						<Text fontSize={Theme.small}>링도 건드려보고</Text>
					</IScrollAnimation>
					<IScrollAnimation delay={1000} animateOnce={true} animateIn={'fadeIn'}>
						<Text fontSize={Theme.small}>이따금 취미로 코딩도 하는 아마추어</Text>
						<Text color="#d74c46" fontSize={Theme.small}>
							{' '}
							개발자
						</Text>
					</IScrollAnimation>
				</SubBox>
				<SubBox style={{ width: '80%', marginTop: Theme.medSmall }}>
					<ScrollAnimation delay={1500} animateIn={'fadeIn'} animateOnce={true}>
						<Name className={ underLine ? "titleName" : "" } fontSize={Theme.medium} style={{ width: "60%"}}>
							{'        '} 이승욱 {'        '}
						</Name>
					</ScrollAnimation>
				</SubBox>

				<IScrollAnimation
					style={{ marginTop: Theme.large }}
					animateIn={'bounceInRight'}
					duration={1}
					animateOnce={true}
					delay={2000}
				>
					<Link smooth to="/#intro">
						<Text fontSize={Theme.xxsmall}>더 궁금하신가요?</Text>{' '}
					</Link>
				</IScrollAnimation>
			</SubBox>
			<IScrollAnimation
				style={{ position: 'absolute', bottom: '0' }}
				animateIn={'fadeIn'}
				duration={1}
				animateOnce={true}
			>
				<Link style={{ marginTop: Theme.small }} smooth to="/#intro">
					<SvgCard
						scrollAnimation="pulse infinite"
						cardSize={Theme.small}
						color="black"
						text={''}
						fontColor="black"
						initiallyVisible={false}
						padding={false}
						svgElement={<ArrowDown size={Theme.small.slice(0,-2)} />}
					/>
				</Link>
			</IScrollAnimation>
		</Box>
	);
};
