import React, { useState, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Header } from 'react-native-elements';
import Constant from '../utils/Constant';
import { LinearGradient } from 'expo-linear-gradient';
import { RowInfo } from '../items';
import { stock_Detail, getStockRegist } from "../service/Services"
import { AppView, AppButton, SizedBox, TableRequestList } from '../component';
import useNavigator from '../utils/useNavigator';
import showError from '../utils/showError';
import { useFocusEffect } from '@react-navigation/native';

const Stock_Detail = ({ navigation, Actions, item, currency }) => {
	const [info, setInfo] = useState({});
	const [stockRegist, setStockRegist] = useState([]);
	const [isLoading, setIsLoading] = useState(false)

	useFocusEffect(
		useCallback(() => {
			initialData();
		}, [])
	)

	const initialData = async () => {
		try {
			setIsLoading(true)
			await stock_Detail(item?.RECNO, (res, done) => {
				if (done && res?.data?.status) {
					setInfo(res?.data?.data?.stock_detail);
				} else {
					showError(res?.data?.message);
				}
			});
			await getStockRegist((res, done) => {
				if (done && res?.data?.status) {
					setStockRegist(res?.data?.data);
				} else {
					showError(res?.data?.message);
				}
			});
		} catch (e) {
			console.log("Stock_Detail.js initialData error : ", e)
		} finally {
			setIsLoading(false)
		}
	};

	const toStockForm = () =>
		Actions.push('FormChangeStock', { currency });  // refresh -> maybe change to useFoccusEffect?

	return (
		<AppView isLoading={isLoading} style={styles.container}>
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
				centerComponent={{ text: 'ข้อมูลหุ้น', style: { color: '#fff' } }}
				innerContainerStyles={{ backgroundColor: Constant?.color?.violet }}
				containerStyle={{
					backgroundColor: Constant?.color?.violet,
					borderBottomColor: Constant?.color?.violet,
				}}
			/>

			<View style={styles.body}>
				<LinearGradient
					locations={[0, 0.4]}
					colors={[Constant?.color?.violetlight, Constant?.color?.darkPurple]}
					start={{ x: 0, y: 0 }}
					end={{ x: 0, y: 1 }}
					style={styles.linearGradient}>
					<View style={styles.content}>
						<TableRequestList
							header={[
								<View>
									<RowInfo keys="รายละเอียด" name="" />
									<RowInfo keys="วันที่ : " name={info?.DTDATE} />
									<RowInfo keys="รหัสรายการ : " name={info?.TRTYPE} />
									<RowInfo
										keys="งวดที่ : "
										name={info?.TMENO}
										color={Constant?.color?.green}
									/>
									<RowInfo keys="ยกมา : " name={info?.BFWBAL} />
									<RowInfo keys="เพิ่ม : " name={info?.ADDAMT} />
									<RowInfo keys="ลด : " name={info?.SUBAMT} />
									<RowInfo
										keys="คงเหลือ : "
										name={info?.BAL}
										color={Constant?.color?.violet}
									/>

									<SizedBox height={20} />
									<View style={styles.padding}>
										<AppButton
											text="ส่งคำร้องเปลี่ยนแปลงเงินส่งค่าหุ้น"
											onPress={toStockForm}
										/>
									</View>
									<SizedBox height={10} />
								</View>,
							]}
							data={stockRegist}
						/>
					</View>
				</LinearGradient>
			</View>
		</AppView>
	);
};

export default useNavigator(Stock_Detail);

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		flex: 1,
		flexDirection: 'column',
		marginTop: 15,
		marginBottom: 15,
		backgroundColor: Constant.color.white,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: Constant.color.gray,
	},
	padding: {
		paddingHorizontal: 10,
	},
	body: {
		flex: 1,
	},
	linearGradient: {
		flex: 1,
		paddingLeft: 15,
		paddingRight: 15,
	},
});
