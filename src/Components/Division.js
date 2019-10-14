import React from 'react';
import {Divider, FatText} from '../Styles/Styled'
import  PropTypes from 'prop-types'

const Division = ({fontSize = 100, fontColor = "black", text }) => {

	return (
		<Divider>
			<FatText size={ String(fontSize) + "px" } color={fontColor} paddingBottom={'20'}>
				{text}
			</FatText>
		</Divider>
	);
};

Division.propTypes ={
    fontSize: PropTypes.number,
	fontColor: PropTypes.string,
	text: PropTypes.string.isRequired
}

export default Division
