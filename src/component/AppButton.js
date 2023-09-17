import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Constant from '../utils/Constant';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import Padding from './Padding';

const AppButton = ({ text, onPress, disabled, style, icon, textStyle, iconPosition }) => {
	const floatIcon = iconPosition && iconPosition.startsWith('float')

	return (
		<View style={{ position: 'relative' }}>
			<Button
				titleStyle={[{ color: Constant.color.white }, textStyle]}
				buttonStyle={[styles.container, style, disabled && styles.disabled]}
				onPress={onPress}
				title={text}
				icon={floatIcon ? undefined : icon}
				iconPosition={floatIcon ? undefined : iconPosition}
				disabled={disabled}
			/>
			{floatIcon && <View style={{
				position: 'absolute',
				top: 8,
				left: iconPosition == 'floatLeft' ? 0 : undefined,
				right: iconPosition == 'floatRight' ? 0 : undefined,
			}}>
				{<Padding left={10} right={10}>{icon}</Padding>}
			</View>}
		</View>
	);
};

AppButton.defaultProps = {
	text: '',
	onPress: () => { },
	disabled: false,
	floatType: 'left'
};

AppButton.propTypes = {
	floatType: PropTypes.oneOf(['floatLeft', 'floatRight', 'left', 'right'])
}

const AppButtonView = ({ style, disabled, text }) => {
	return (
		<View
			disabled={disabled}
			style={[styles.container, style, disabled && styles.disabled]}>
			<Text style={styles.text}>{text}</Text>
		</View>
	);
};

AppButtonView.defaultProps = {
	text: '',
	disabled: false,
};

export { AppButtonView };
export default AppButton;

const styles = StyleSheet.create({
	container: {
		borderRadius: 10,
		paddingHorizontal: 12,
		paddingVertical: 12,
		backgroundColor: Constant?.color?.violetlight,
		// borderWidth: 1,
		// borderColor: Constant.color.gray,
	},
	text: {
		color: 'white',
		textAlign: 'center',
	},
	disabled: {
		backgroundColor: Constant?.color?.gray,
		opacity: 0.7,
	},
});
