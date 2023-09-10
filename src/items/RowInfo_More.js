import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constant from '../utils/Constant';

const RowInfo_More = ({ keys, name, color }) => {
	return (
		<View style={styles.container}>
			<View style={styles.item_content}>
				<Text style={{ fontWeight: 'bold' }}>{keys}</Text>
				<Text
					style={{
						flex: 1,
						flexDirection: 'row',
						textAlign: 'right',
						color: color,
					}}>
					{name}
				</Text>
			</View>
			<View style={{ height: 1, backgroundColor: Constant?.color?.white }} />
		</View>
	);
}

export default RowInfo_More;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		paddingLeft: 10,
		paddingRight: 10
	},
	item: {
		flex: 1,
	},
	item_content: {
		flexDirection: 'row',
		padding: 10,
	},
});
