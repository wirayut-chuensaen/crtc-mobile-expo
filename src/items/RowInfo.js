import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constant from '../utils/Constant';

const RowInfo = ({ keys, color, name, br = true, labelColor, containerStyle }) => {
	return (
		<View style={[styles.wrapper]}>
			<View style={[styles.item_content, containerStyle]}>
				<Text style={[styles.textBold, { color: labelColor }]}>{keys}</Text>
				<Text style={[styles.label, { color }]}>{name}</Text>
			</View>
			{br && <View style={[styles.br]} />}
		</View>
	);
};

export default RowInfo;

const styles = StyleSheet.create({
	item: {
		flex: 1,
	},
	wrapper: {
		flexDirection: 'column',
		paddingLeft: 10,
		paddingRight: 10
	},
	item_content: {
		flexDirection: 'row',
		padding: 10,
	},
	textBold: {
		fontWeight: 'bold'
	},
	br: {
		height: 1,
		backgroundColor: Constant.color.lightGray,
		opacity: 0.3,
	},
	label: {
		flex: 1,
		flexDirection: 'row',
		textAlign: 'right',
	},
});
