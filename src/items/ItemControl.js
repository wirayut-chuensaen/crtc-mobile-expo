import React, { useState } from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';
import Constant from '../utils/Constant';

const ItemControl = ({ name }) => {
	const [isEnabled, setIsEnabled] = useState(false)

	const toggleSwitch = () => {
		if (isEnabled == true) {
			setIsEnabled(false);
		} else {
			setIsEnabled(true)
		}
	};

	return (
		<View style={styles.item_content}>
			<View style={styles.itemContainer}>
				<Text numberOfLines={1} style={{ paddingLeft: 15 }}>
					{name}
				</Text>
			</View>
			<Switch
				trackColor={{ false: '#767577', true: Constant?.color?.violet }}
				thumbColor={
					isEnabled ? Constant?.color?.whitesmoke : '#f4f3f4'
				}
				ios_backgroundColor={Constant?.color?.gray}
				onValueChange={toggleSwitch}
				value={isEnabled}
			/>
		</View>
	);
}

export default ItemControl;

const styles = StyleSheet.create({
	item_content: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 10,
		marginLeft: 10,
		marginRight: 10,
		padding: 10,
		backgroundColor: Constant?.color?.white,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: Constant?.color?.gray,
	},
	itemContainer: {
		flex: 1,
		flexDirection: 'row',
	},
});
