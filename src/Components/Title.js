import React from 'react';
import { Box, SubBox, CenterText, Text } from '../Styles/Styled';
import ScrollAnimation from 'react-animate-on-scroll';
import { HashLink as Link } from 'react-router-hash-link';

export default () => {
	return (
		<Box width="80%" bgColor={'#fff'} id="title">
			<SubBox basis={20} />
			<SubBox basis={80} style={{ marginTop: '50px', justifyContent: 'center', alignItems: 'center' }}>
				<div style={{ width: '60%' }}>
					<ScrollAnimation animateOnce={true} animateIn={'fadeIn'}>
						<Text fontSize={'50px'}>학생 </Text>
					</ScrollAnimation>
					<ScrollAnimation
						style={{ paddingLeft: '100px' }}
						delay={500}
						animateOnce={true}
						animateIn={'fadeIn'}
					>
						<Text fontSize={'50px'}>엔지니어 </Text>
					</ScrollAnimation>
					<ScrollAnimation
						style={{ paddingLeft: '200px' }}
						delay={1000}
						animateOnce={true}
						animateIn={'fadeIn'}
					>
						<Text fontSize={'50px'}>프로그래머</Text>
					</ScrollAnimation>
				</div>
				<ScrollAnimation
					style={{ marginTop: '20px', marginBottom: '20px' }}
					delay={2000}
					animateIn={'fadeIn'}
					animateOnce={true}
				>
					<Text fontSize={'50px'}> 하고싶은 건 다 해보는</Text>
				</ScrollAnimation>

				<ScrollAnimation
					style={{ width: '50%', marginBottom: '100px' }}
					delay={3000}
					animateIn={'fadeIn'}
					animateOnce={true}
				>
					<Text color="black" fontSize={'120px'} style={{ fontFamily: '성실체' }}>
						이승욱
					</Text>
					<Text fontSize={'60px'}> 입니다</Text>
				</ScrollAnimation>

				<ScrollAnimation
					// style={{ marginLeft: '100px', marginBottom: '100px' }}
					animateIn={'bounceInRight'}
					duration={1}
					animateOnce={true}
				>
					<Link smooth to="/#intro">
						<Text fontSize="30px">
							더 궁금하신가요? ↓
						</Text>{' '}
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
