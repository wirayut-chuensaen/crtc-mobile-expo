import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import useText from '../utils/useText';
import { Ionicons } from "@expo/vector-icons"
import Constant from '../utils/Constant';

const ButtonPicker = ({ text, hintText }) => {
	return (
		<View style={styles.container}>
			<Text>{useText(text, hintText)}</Text>
			<Ionicons name="md-caret-down" size={18} color={Constant?.color?.dark} />
		</View>
	);
};

ButtonPicker.defaultProps = {
	text: '',
	hintText: '',
};

export default ButtonPicker;

const styles = StyleSheet.create({
	container: {
		borderRadius: 4,
		borderWidth: 1,
		borderColor: '#AEAEAE',
		paddingHorizontal: 16,
		paddingVertical: 12,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
});
