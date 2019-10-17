import React from 'react';
import { Box, SubBox, CenterText, Text } from '../Styles/Styled';
import ScrollAnimation from 'react-animate-on-scroll';
import { HashLink as Link } from 'react-router-hash-link';
import Theme from '../Styles/Theme';

export default () => {
	return (
		<Box width="80%" bgColor={'#fff'} id="title">
			<SubBox basis={20} />
			<SubBox
				basis={80}
				style={{
					marginTop: Theme.small,
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<div style={{ width: '60%' }}>
					<ScrollAnimation animateOnce={true} animateIn={'fadeIn'}>
						<Text fontSize={Theme.small} >학생 </Text>
					</ScrollAnimation>
					<ScrollAnimation
						style={{ paddingLeft: '10vw' }}
						delay={500}
						animateOnce={true}
						animateIn={'fadeIn'}
					>
						<Text fontSize={Theme.small}>엔지니어 </Text>
					</ScrollAnimation>
					<ScrollAnimation
						style={{ paddingLeft: '20vw' }}
						delay={1000}
						animateOnce={true}
						animateIn={'fadeIn'}
					>
						<Text fontSize={Theme.small}>프로그래머</Text>
					</ScrollAnimation>
				</div>
				<ScrollAnimation
					style={{ marginTop: '2vh', marginBottom: '2vh' }}
					delay={2000}
					animateIn={'fadeIn'}
					animateOnce={true}
				>
					<Text fontSize={Theme.small}> 하고싶은 건 다 해보는</Text>
				</ScrollAnimation>

				<ScrollAnimation
					style={{ width: '65%', marginBottom: '10vh' }}
					delay={3000}
					animateIn={'fadeIn'}
					animateOnce={true}
				>
					<Text color="black" fontSize={Theme.medium} style={{ fontFamily: '성실체' }}>
						이승욱
					</Text>
					<Text fontSize={Theme.small}> 입니다</Text>
				</ScrollAnimation>

				<ScrollAnimation
					// style={{ marginLeft: '100px', marginBottom: '100px' }}
					animateIn={'bounceInRight'}
					duration={1}
					animateOnce={true}
					delay={3000}
				>
					<Link smooth to="/#intro">
						<Text fontSize={Theme.small}>더 궁금하신가요? ↓</Text>{' '}
					</Link>
				</ScrollAnimation>
			</SubBox>
			{/* <SubBox
        basis={30}
        style={{ marginBottom:"100px", justifyContent: "flex-end" }}
      >
        <ScrollAnimation animateIn={"fadeInDown"} delay={200} duration={2} animateOnce={true}>
          <Text fontSize="40px" style={{ height: "10vh" }}>그래서 누구냐고요?↓</Text>
        </ScrollAnimation>
      </SubBox> */}
		</Box>
	);
};
