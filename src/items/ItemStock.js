import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constant from '../utils/Constant';

const ItemStock = ({ DTDATE, TRTYPE, TMENO, BFWBAL, BAL }) => {
	return (
		<View style={styles.content}>
			<View style={{ flexDirection: 'column', marginBottom: 8 }}>
				<View style={{ flexDirection: 'row' }}>
					<Text style={{ fontWeight: 'bold' }}>วันที : </Text>
					<Text style={{ flex: 1, flexDirection: 'row', textAlign: 'right' }}>
						{DTDATE}
					</Text>
				</View>
			</View>
			<View style={{ flexDirection: 'column', marginBottom: 8 }}>
				<View style={{ flexDirection: 'row' }}>
					<Text style={{ fontWeight: 'bold' }}>รหัสรายการ : </Text>
					<Text
						style={{
							flex: 1,
							flexDirection: 'row',
							textAlign: 'right',
							color: Constant?.color?.violet,
						}}>
						{TRTYPE}
					</Text>
				</View>
			</View>
			<View style={{ flexDirection: 'column', marginBottom: 8 }}>
				<View style={{ flexDirection: 'row' }}>
					<Text style={{ fontWeight: 'bold' }}>งวดที่ : </Text>
					<Text
						style={{
							flex: 1,
							flexDirection: 'row',
							textAlign: 'right',
							color: Constant?.color?.green,
						}}>
						{TMENO}
					</Text>
				</View>
			</View>
			<View style={{ flexDirection: 'column', marginBottom: 8 }}>
				<View style={{ flexDirection: 'row' }}>
					<Text style={{ fontWeight: 'bold' }}>ยกยอดมา : </Text>
					<Text
						style={{
							flex: 1,
							flexDirection: 'row',
							textAlign: 'right',
							color: Constant?.color?.violet,
						}}>
						{BFWBAL}
					</Text>
				</View>
			</View>
			<View style={{ flexDirection: 'column' }}>
				<View style={{ flexDirection: 'row' }}>
					<Text style={{ fontWeight: 'bold' }}>คงเหลือ : </Text>
					<Text
						style={{
							flex: 1,
							flexDirection: 'row',
							textAlign: 'right',
							color: Constant?.color?.violet,
						}}>
						{BAL}
					</Text>
				</View>
			</View>
		</View>
	);
}

export default ItemStock;

const styles = StyleSheet.create({
	item: {
		flex: 1,
	},
	content: {
		margin: 10,
		padding: 10,
		backgroundColor: Constant.color.white,
		borderRadius: 5,
		borderWidth: 1.5,
		borderColor: Constant.color.gray,
	},
});
