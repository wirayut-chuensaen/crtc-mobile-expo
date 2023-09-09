import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Constant from "../utils/Constant"
import NumberHelper from "../utils/NumberHelper"

const ItemAccount = ({ onTransfer, ACCNO, ACNAME, BALANCE }) => {
	return (
		<View style={styles.cardContainer}>
			<Text style={{ fontSize: 18 }}>{ACNAME}</Text>
			<View style={{ flexDirection: 'row' }}>
				<View style={{ flex: 1 }}>
					<Text style={{ fontSize: 11, marginTop: 4 }}>ออมทรัพย์</Text>
					<Text style={{ fontSize: 11, marginTop: 4 }}>{ACCNO}</Text>
				</View>
				<View style={{ alignItems: 'flex-end' }}>
					<Text style={{ fontSize: 16, marginBottom: 8 }}>ยอดเงินทั้งหมด</Text>
					<Text style={{ fontSize: 22, marginTop: 4, fontWeight: 'bold' }}>
						{NumberHelper.numberFormat(BALANCE, 2)}{' '}
						<Text style={{ fontSize: 12, marginTop: 4, fontWeight: 'bold' }}>
							THB
						</Text>
					</Text>
				</View>
			</View>
			<View
				style={{
					height: 1,
					backgroundColor: '#eee',
					width: '100%',
					marginVertical: 8,
				}}
			/>
			<TouchableOpacity onPress={onTransfer} style={{ alignItems: 'flex-end' }}>
				<Text
					style={{
						color: Constant.color.violet,
						fontWeight: 'bold',
						fontSize: 16,
					}}>
					โอนเงิน
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default ItemAccount;

const styles = StyleSheet.create({
	cardContainer: {
		padding: 14,
		borderRadius: 4,
		backgroundColor: 'white',
		marginHorizontal: 20,
	},
});
