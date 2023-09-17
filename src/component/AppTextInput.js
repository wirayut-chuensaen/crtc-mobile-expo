import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import Constant from '../utils/Constant';
import styled from 'styled-components/native';

const AppTextInput = styled(TextInput).attrs(props => {
	return {
		keyboardType: props?.keyboardType || 'number-pad',
		underlineColorAndroid: 'transparent',
		maxLength: props?.maxLength || 9999999,
	};
})(() => {
	return styles.textInput;
});

export default AppTextInput;

const styles = StyleSheet.create({
	textInput: {
		paddingVertical: 8,
		paddingHorizontal: 12,
		borderRadius: 4,
		borderWidth: 1,
		borderColor: '#AEAEAE',
		fontSize: 14,
		color: Constant?.color?.dark,
	},
});
