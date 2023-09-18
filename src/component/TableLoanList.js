import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import SizedBox from './SizedBox';
import Constant from '../utils/Constant';

const TableLoanList = ({ data = [], header = [], footer = [] }) => {
	const _renderItem = ({ item, index }) => {
		const status = {
			W: 'เขียนคำขอกู้แล้ว..อย่าลืมอัพโหลด/ส่งไฟล์หลักฐาน',
			P: 'กำลังตรวจสอบไฟล์',
			A: 'นำคำขอฯ ส่งให้ฝ่ายสินเชื่อแล้ว',
			T: 'ผู้ค้ำประกันฯไม่ครบ',
			R: 'เอกสารไม่ครบ/ไม่ชัดเจน',
		};

		return (
			<View style={styles.tbody}>
				<View style={styles.td}>
					<Text style={styles.tdText}>{item?.adaytime?.split(' ')[0]}</Text>
				</View>
				<View style={styles.td}>
					<Text style={styles.tdText}>{item?.trtype}</Text>
				</View>
				<View style={[styles.td, { flex: 2 }]}>
					<Text style={styles.tdText}>{status[item?.a_flag.toUpperCase()]}</Text>
				</View>
			</View>
		);
	};

	const buildListHeader = () => (
		<View key="header" style={styles.headerContainer}>
			<Text style={styles.title}>รายการคำขอที่ส่งไปแล้ว</Text>
			<SizedBox height={17} />
			<View style={styles.thead}>
				<View style={styles.th}>
					<Text style={styles.thText}>วันที่ส่ง</Text>
				</View>
				<View style={styles.th}>
					<Text style={styles.thText}>ประเภทสัญญา</Text>
				</View>
				<View style={[styles.th, { flex: 2 }]}>
					<Text style={styles.thText}>สถานะคำขอ</Text>
				</View>
			</View>
			<SizedBox height={4} />
			<View style={styles.br} />
		</View>
	);

	header = [...header, buildListHeader()];

	return (
		<FlatList
			data={data}
			item={styles.list}
			showsVerticalScrollIndicator={false}
			ListHeaderComponent={() => (
				<View>
					{header.map((C, index) => (
						<View key={`header_${index}`}>{C}</View>
					))}
				</View>
			)}
			keyExtractor={(data, index) => `${Date.now()}_${index}`}
			renderItem={_renderItem}
			ListEmptyComponent={() => (
				<View style={styles.empty}>
					<Text>ไม่มีรายการ</Text>
				</View>
			)}
			ListFooterComponent={() => (
				<View>
					{footer.map((C, index) => (
						<View key={`footer_${index}`}>{C}</View>
					))}
					<SizedBox height={60} />
				</View>
			)}
		/>
	);
};

export default TableLoanList;

const styles = StyleSheet.create({
	list: {
		paddingHorizontal: 10,
		flex: 1,
	},
	thead: {
		flexDirection: 'row',
	},
	th: {
		flex: 1,
	},
	thText: {
		fontSize: 12,
		textAlign: 'center',
	},
	br: {
		backgroundColor: '#D1CFD7',
		height: 4,
	},
	tbody: {
		flexDirection: 'row',
		paddingHorizontal: 10,
	},
	td: {
		paddingVertical: 9,
		flex: 1,
		borderBottomColor: '#D1CFD7',
		borderBottomWidth: 1,
	},
	tdText: {
		fontSize: 10,
		color: Constant?.color?.dark,
		lineHeight: 20,
		textAlign: 'center',
	},
	title: {
		fontSize: 14,
		color: Constant?.color?.dark,
		fontWeight: '500',
	},
	status: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	body: {
		flex: 1,
	},
	headerContainer: {
		paddingHorizontal: 10,
	},
	empty: {
		justifyContent: 'center',
		paddingVertical: 10,
		alignItems: 'center',
	},
});
