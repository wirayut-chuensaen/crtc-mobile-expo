import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import Constant from '../utils/Constant';

const ItemSettings = ({ icon, type, name, sub }) => {
	return (
		<View style={styles.item_content}>
			<Icon
				name={icon}
				type={type}
				color={Constant?.color?.violet}
				size={25}
			/>
			<View style={styles.itemContainer}>
				<Text numberOfLines={1} style={{ color: Constant?.color?.dark }}>
					{name}
				</Text>
				<Text numberOfLines={1} style={{ color: Constant?.color?.lightGray }}>
					{sub}
				</Text>
			</View>
			<Icon name="chevron-right" color="#636e72" size={25} />
		</View>
	);
}

export default ItemSettings;

const styles = StyleSheet.create({
	item: {
		flex: 1,
	},
	item_content: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 10,
		marginLeft: 10,
		marginRight: 10,
		padding: 10,
		borderRadius: 5,
	},

	content: {
		margin: 10,
		padding: 10,
		backgroundColor: Constant.color.white,
		borderRadius: 5,
		borderWidth: 1.5,
		borderColor: Constant.color.gray,
	},
	itemContainer: {
		flex: 1,
		flexDirection: 'column',
		paddingLeft: 15,
	},
});
