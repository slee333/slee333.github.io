import React from 'react';
import {Box, SubBox, CenterText, Text} from '../Styles/Styled'

export default () => {
	return (
		<Box bgColor={'#fff'} paddingLeft={'10%'} paddingRight="10%" id="title">
			<SubBox basis={60}>
				<CenterText >안녕</CenterText>
				<CenterText>하세요</CenterText>
				<CenterText color={'#f22e42'}>  이    승    욱  </CenterText>
				<CenterText>입니다</CenterText>
			</SubBox>
			<SubBox basis={40} style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
				<Text style={{ height: '10vh' }}>그래서 누구냐고요?↓</Text>
			</SubBox>
		</Box>
	);
};


