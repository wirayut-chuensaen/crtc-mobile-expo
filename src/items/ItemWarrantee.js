import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constant from '../utils/Constant';

const ItemWarrantee = ({ LOAN_NO, WARRIDLNK, WARRNAME, AMOUNT }) => {
	return (
		<View style={styles.content}>
			<View style={{ flexDirection: 'column', marginBottom: 8 }}>
				<View style={{ flexDirection: 'row' }}>
					<Text style={{ fontWeight: 'bold' }}>เลขที่สัญญา : </Text>
					<Text
						numberOfLines={1}
						style={{ flex: 1, flexDirection: 'row', textAlign: 'right' }}>
						{LOAN_NO}{' '}
					</Text>
				</View>
			</View>
			<View style={{ flexDirection: 'column', marginBottom: 8 }}>
				<View style={{ flexDirection: 'row' }}>
					<Text style={{ fontWeight: 'bold' }}>เลขที่สมาชิกผู้ค้ำ : </Text>
					<Text style={{ flex: 1, flexDirection: 'row', textAlign: 'right' }}>
						{WARRIDLNK}
					</Text>
				</View>
			</View>
			<View style={{ flexDirection: 'column', marginBottom: 8 }}>
				<View style={{ flexDirection: 'row' }}>
					<Text style={{ fontWeight: 'bold' }}>ชื่อ - สกุลผู้ค้ำ : </Text>
					<Text style={{ flex: 1, flexDirection: 'row', textAlign: 'right' }}>
						{WARRNAME}
					</Text>
				</View>
			</View>
			<View style={{ flexDirection: 'column' }}>
				<View style={{ flexDirection: 'row' }}>
					<Text style={{ fontWeight: 'bold' }}>วงเงินค้ำฯ : </Text>
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

export default ItemWarrantee;

const styles = StyleSheet.create({
	item: {
		flex: 1,
	},
	content: {
		marginBottom: 10,
		padding: 10,
		backgroundColor: Constant.color.white,
		borderRadius: 5,
		borderWidth: 1.5,
		borderColor: Constant.color.gray,
	},
});
