import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	Dimensions,
	View,
	FlatList,
	TouchableOpacity,
} from 'react-native';
import { Icon, Header } from 'react-native-elements';
import Constant from '../utils/Constant';
import { RowInfo, ItemStock } from '../items';
import { stock } from '../service/Services'
import showError from '../utils/showError';
import { AppView } from '../component';
import useNavigator from '../utils/useNavigator';

const width = Dimensions.get('window').width;

const Share = ({ navigation, Actions }) => {
	const [item, setItem] = useState([])
	const [stockData, setStockData] = useState({})
	const [isLoading, setIsLoading] = useState(false)
	const [refreshing, setRefreshing] = useState(false)

	useEffect(() => {
		initialData()
	}, [])

	const initialData = async (isRefresh = false) => {
		try {
			if (!isRefresh) {
				setIsLoading(true)
			} else {
				setRefreshing(true)
			}
			await stock((res, done) => {
				// console.log("stock res : ", res);
				if (done && res?.data?.status) {
					setItem(res?.data?.data.stock_list)
					setStockData(res?.data?.data?.stock)
				} else {
					showError(res?.data?.message);
				}
			});
		} catch (e) {
			console.log("Share.js initialData error : ", e)
		} finally {
			setIsLoading(false)
			setRefreshing(false)
		}
	}

	return (
		<AppView isLoading={isLoading} style={styles.body}>
			<Header
				leftComponent={
					<Icon
						name="chevron-thin-left"
						type="entypo"
						color="#fff"
						iconStyle={{ backgroundColor: Constant?.color?.violet }}
						onPress={() => Actions.pop()}
					/>
				}
				centerComponent={{ text: "ข้อมูลหุ้น", style: { color: '#fff' } }}
				innerContainerStyles={{ backgroundColor: Constant?.color?.violet }}
				containerStyle={{
					backgroundColor: Constant?.color?.violet,
					borderBottomColor: Constant?.color?.violet,
				}}
			/>

			<View style={styles.body}>
				<View style={styles.contents}>
					<RowInfo keys="ทะเบียนและการเดินบัญชีหุ้น" name="" />
					<RowInfo keys="ทุนเรือนหุ้น : " name={stockData?.BALANCE} />
					<RowInfo keys="ส่งหักรายเดือน : " name={stockData?.PAYMENT} />
					<RowInfo keys="จำนวนงวด : " name={stockData?.INSTALMENT} />

					{/*<Button title='แก้ไขส่งหักรายเดือน'*/}
					{/*        buttonStyle={styles.Button}*/}
					{/*        onPress={() => this.onHandleEdit()}/>*/}
				</View>
				<View style={styles.content}>
					<RowInfo keys="รายการ" name="" br={false} />
					<FlatList
						itemDimension={width - 20}
						data={item}
						numColumns={1}
						keyExtractor={(data, index) => `item_${index}`}
						refreshing={refreshing}
						onRefresh={() => initialData(true)}
						renderItem={({ item, index }) => (
							<TouchableOpacity
								onPress={() => {
									const currency = Number(
										stockData?.PAYMENT.replace(/[^0-9.-]+/g, ''),
									);
									Actions.push('Stock_Detail', {
										item,
										currency,
									});
								}}>
								<ItemStock {...item} />
							</TouchableOpacity>
						)}
					/>
				</View>
			</View>
		</AppView>
	);
}

export default useNavigator(Share)

const styles = StyleSheet.create({
	content: {
		flex: 1,
		flexDirection: 'column',
		marginTop: 15,
		borderRadius: 5,
	},
	contents: {
		flexDirection: 'column',
		paddingTop: 15,
		paddingBottom: 15,
		backgroundColor: Constant.color.white,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: Constant.color.gray,
	},
	body: {
		flex: 1,
	},
	Button: {
		margin: 10,
		marginBottom: 15,
		marginTop: 15,
		backgroundColor: Constant.color.violetlight,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: Constant.color.white,
	},
});
