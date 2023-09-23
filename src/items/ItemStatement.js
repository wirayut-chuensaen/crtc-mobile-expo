import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constant from '../utils/Constant';

const ItemStatement = ({ trdate, trtype, depamt, widamt, outsbal, type }) => {
	const renderProducts = ({ depamt, widamt, type }) => {
		const views = [];
		views.push(<Text key={type} style={{ fontWeight: 'bold' }}>{type} : </Text>);
		if (parseFloat(depamt || 0) > 0) {
			views.push(
				<Text
					key={depamt}
					style={{
						flex: 1,
						flexDirection: 'row',
						textAlign: 'right',
						color: Constant?.color?.green,
					}}>
					{depamt || ""}
				</Text>
			);
		} else {
			views.push(
				<Text
					key={widamt}
					style={{
						flex: 1,
						flexDirection: 'row',
						textAlign: 'right',
						color: Constant?.color?.red,
					}}>
					{widamt || ""}
				</Text>
			);
		}
		return views;
	}

	return (
		<View style={styles.content}>
			<View style={{ flexDirection: 'column', marginBottom: 8 }}>
				<View style={{ flexDirection: 'row' }}>
					<Text style={{ fontWeight: 'bold' }}>วันที่ : </Text>
					<Text style={{ flex: 1, flexDirection: 'row', textAlign: 'right' }}>
						{trdate}
					</Text>
				</View>
			</View>
			<View style={{ flexDirection: 'column', marginBottom: 8 }}>
				<View style={{ flexDirection: 'row' }}>
					<Text style={{ fontWeight: 'bold' }}>รหัสรายการ : </Text>
					<Text style={{ flex: 1, flexDirection: 'row', textAlign: 'right' }}>
						{trtype}
					</Text>
				</View>
			</View>
			<View style={{ flexDirection: 'column', marginBottom: 8 }}>
				<View style={{ flexDirection: 'row' }}>
					{renderProducts({ depamt, widamt, type })}
				</View>
			</View>
			<View style={{ flexDirection: 'column' }}>
				<View style={{ flexDirection: 'row' }}>
					<Text style={{ fontWeight: 'bold' }}>เงินคงเหลือ : </Text>
					<Text
						style={{
							flex: 1,
							flexDirection: 'row',
							textAlign: 'right',
							color: Constant?.color?.violet,
						}}>
						{outsbal}
					</Text>
				</View>
			</View>
		</View>
	);
}

export default ItemStatement;

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
