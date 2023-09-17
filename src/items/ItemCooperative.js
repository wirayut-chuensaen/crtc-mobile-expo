import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constant from '../utils/Constant';

const ItemCooperative = ({ BILL_NO, BILL_DATE, DISBURSE_NAME, AMOUNT }) => {
	return (
		<View style={styles.content}>
			<View style={{ flexDirection: 'column', marginBottom: 8 }}>
				<View style={{ flexDirection: 'row' }}>
					<Text style={{ fontWeight: 'bold' }}>เลขที่ใบเสร็จ : </Text>
					<Text style={{ flex: 1, flexDirection: 'row', textAlign: 'right' }}>
						{BILL_NO}
					</Text>
				</View>
			</View>
			<View style={{ flexDirection: 'column', marginBottom: 8 }}>
				<View style={{ flexDirection: 'row' }}>
					<Text style={{ fontWeight: 'bold' }}>วันที่ออกใบเสร็จ : </Text>
					<Text style={{ flex: 1, flexDirection: 'row', textAlign: 'right' }}>
						{BILL_DATE}
					</Text>
				</View>
			</View>
			<View style={{ flexDirection: 'column', marginBottom: 8 }}>
				<View style={{ flexDirection: 'row' }}>
					<Text style={{ fontWeight: 'bold' }}>ชื่อ - สกุล : </Text>
					<Text
						style={{
							flex: 1,
							flexDirection: 'row',
							textAlign: 'right',
							color: Constant.color.green,
						}}>
						{DISBURSE_NAME}
					</Text>
				</View>
			</View>
			<View style={{ flexDirection: 'column' }}>
				<View style={{ flexDirection: 'row' }}>
					<Text style={{ fontWeight: 'bold' }}>ยอดหักรวม : </Text>
					<Text
						style={{
							flex: 1,
							flexDirection: 'row',
							textAlign: 'right',
							color: Constant.color.violet,
						}}>
						{AMOUNT}
					</Text>
				</View>
			</View>
		</View>
	);
}

export default ItemCooperative;

const styles = StyleSheet.create({
	item: {
		flex: 1,
	},
	content: {
		margin: 10,
		padding: 10,
		backgroundColor: Constant?.color?.white,
		borderRadius: 5,
		borderWidth: 1.5,
		borderColor: Constant?.color?.gray,
	},
});
