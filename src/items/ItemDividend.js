import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constant from '../utils/Constant';

const ItemDividend = ({ DDVRATE, PUNPON, IRFRATE, INTREFUND, total_PUNPON_INTREFUND, ISUPREMIUM, OTHEXP }) => {
	return (
		<View style={styles.content}>
			<View style={{ flexDirection: 'column', marginBottom: 8 }}>
				<View style={{ flexDirection: 'row' }}>
					<Text style={{ fontWeight: 'bold' }}>
						ปันผล({DDVRATE}) :{' '}
					</Text>
					<Text style={{ flex: 1, flexDirection: 'row', textAlign: 'right' }}>
						{PUNPON}
					</Text>
				</View>
			</View>
			<View style={{ flexDirection: 'column', marginBottom: 8 }}>
				<View style={{ flexDirection: 'row' }}>
					<Text style={{ fontWeight: 'bold' }}>
						เฉลี่ยคืน({IRFRATE}) :{' '}
					</Text>
					<Text style={{ flex: 1, flexDirection: 'row', textAlign: 'right' }}>
						{INTREFUND}
					</Text>
				</View>
			</View>
			<View style={{ flexDirection: 'column', marginBottom: 8 }}>
				<View style={{ flexDirection: 'row' }}>
					<Text style={{ fontWeight: 'bold' }}>ปันผล+เฉลี่ยคืน : </Text>
					<Text style={{ flex: 1, flexDirection: 'row', textAlign: 'right' }}>
						{total_PUNPON_INTREFUND}
					</Text>
				</View>
			</View>
			<View style={{ flexDirection: 'column' }}>
				<View style={{ flexDirection: 'row' }}>
					<Text style={{ fontWeight: 'bold' }}>รายการหักฯ : </Text>
					<Text style={{ flex: 1, flexDirection: 'row', textAlign: 'right' }}>
						{ISUPREMIUM}
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
						{OTHEXP}
					</Text>
				</View>
			</View>
		</View>
	);
}

export default ItemDividend;

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
