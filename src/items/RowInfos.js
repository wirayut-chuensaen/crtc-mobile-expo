import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constant from '../utils/Constant';

const RowInfos = ({ color, PRJID, PRMAMT, HSTNAME }) => {
	return (
		<View
			style={{ flexDirection: 'column', paddingLeft: 10, paddingRight: 10 }}>
			<View style={styles.item_content}>
				<Text style={{ fontWeight: 'bold' }}>
					หัก {PRJID} :{' '}
				</Text>
				<Text
					style={{
						flex: 1,
						flexDirection: 'row',
						textAlign: 'right',
						color: color,
					}}>
					{PRMAMT}
				</Text>
			</View>
			<View style={styles.item_content2}>
				<Text
					style={{
						flex: 1,
						flexDirection: 'row',
						textAlign: 'right',
						color: color,
					}}>
					{HSTNAME}
				</Text>
			</View>
			<View
				style={{ height: 1, backgroundColor: Constant?.color?.violetlight }}
			/>
		</View>
	);
}

export default RowInfos;

const styles = StyleSheet.create({
	item: {
		flex: 1,
	},
	item_content: {
		flexDirection: 'row',
		padding: 10,
	},
	item_content2: {
		flexDirection: 'row',
		paddingRight: 10,
		paddingBottom: 10,
	},
});
