import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constant from '../utils/Constant';

const ItemWelfare = ({ WLF_NAME, WLF_AMT, MEMO1, MEMO2 }) => {
	return (
		<View style={styles.content}>
			<View style={{ flexDirection: 'column', marginBottom: 8 }}>
				<View style={{ flexDirection: 'row' }}>
					<Text style={{ fontWeight: 'bold' }}>สวัสดิการ : </Text>
					<Text
						numberOfLines={1}
						style={{ flex: 1, flexDirection: 'row', textAlign: 'right' }}>
						[{WLF_NAME}] {MEMO1}
					</Text>
				</View>
			</View>
			<View style={{ flexDirection: 'column', marginBottom: 8 }}>
				<View style={{ flexDirection: 'row' }}>
					<Text style={{ fontWeight: 'bold' }}>จำนวนเงิน : </Text>
					<Text
						style={{
							flex: 1,
							flexDirection: 'row',
							textAlign: 'right',
							color: Constant?.color?.violet,
						}}>
						{WLF_AMT}
					</Text>
				</View>
			</View>
			<View style={{ flexDirection: 'column', marginBottom: 8 }}>
				<View style={{ flexDirection: 'row' }}>
					<Text style={{ fontWeight: 'bold' }}>หมายเหตุ : </Text>
					<Text
						style={{
							flex: 1,
							flexDirection: 'row',
							textAlign: 'right',
							color: Constant?.color?.green,
						}}>
						{MEMO2}
					</Text>
				</View>
			</View>
		</View>
	);
}

export default ItemWelfare;

const styles = StyleSheet.create({
	item: {
		flex: 1,
	},
	content: {
		marginBottom: 10,
		marginLeft: 10,
		marginRight: 10,
		padding: 10,
		backgroundColor: Constant?.color?.white,
		borderRadius: 5,
		borderWidth: 1.5,
		borderColor: Constant?.color?.gray,
	},
});
