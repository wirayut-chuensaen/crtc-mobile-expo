import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Constant from '../utils/Constant';

const ItemMenu = ({ name, subTitle, icon, iconStyle }) => {
	return (
		<View style={styles.item_content}>
			<View style={[styles.icon, iconStyle]}>
				<Image source={icon} resizeMode="contain" style={styles.image} />
			</View>
			<View>
				<Text numberOfLines={1} style={styles.menuText}>
					{name} {subTitle}
				</Text>
			</View>
		</View>
	);
};

export default ItemMenu;

const styles = StyleSheet.create({
	item: {
		flex: 1,
	},
	item_content: {
		height: 50,
		backgroundColor: 'white',
		borderRadius: 8,
		marginHorizontal: 20,
		flexDirection: 'row',
		alignItems: 'center',
	},
	icon: {
		width: 50,
		height: 50,
		borderRadius: 25,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Constant.color.white,
	},
	image: {
		width: 30,
		height: 30,
	},
	menuText: { color: Constant.color.darkPurple, fontSize: 16 },
});
