import React, { useState, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Header } from 'react-native-elements';
import Constant from '../utils/Constant';
import { LinearGradient } from 'expo-linear-gradient';
import { RowInfo } from '../items';
import { getSavemasRegist, savemas_Detail } from "../service/Services"
import { AppView, SizedBox, AppButton, TableSavemasList } from '../component';
import useNavigator from '../utils/useNavigator';
import showError from '../utils/showError';
import { useFocusEffect } from '@react-navigation/native';

const Savemas_Detail = ({ navigation, Actions, item = {} }) => {
	const [info, setInfo] = useState({});
	const [savemasRegist, setSavemasRegist] = useState([]);
	const [isLoading, setIsLoading] = useState(false)

	useFocusEffect(
		useCallback(() => {
			initialData();
		}, [])
	)

	const initialData = async () => {
		try {
			setIsLoading(true)
			await savemas_Detail(item?.accno, (res, done) => {
				if (done && res?.data?.status) {
					setInfo(res?.data?.data?.savemas_detail[0]);
				} else {
					showError(res?.data?.message);
				}
			});
			await getSavemasRegist((res, done) => {
				if (done && res?.data?.status) {
					setSavemasRegist(res?.data?.data);
				} else {
					showError(res?.data?.message);
				}
			});
		} catch (e) {
			console.log("Savemas_Detail.js initialData error : ", e)
		} finally {
			setIsLoading(false)
		}
	};

	const toStatement = () => Actions.push('Statement', { accno: info?.accno });

	const toFormChange = () => Actions.push('FormChangeDeposit', { accno: info?.accno });

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
				centerComponent={{ text: 'เงินฝาก', style: { color: '#fff' } }}
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
						<TableSavemasList
							key="savemas"
							header={[
								<View>
									<RowInfo keys="รายละเอียด" name="" />
									<RowInfo keys="ประเภท : " name={info?.savemas_type} />
									<RowInfo keys="เลขบัญชี : " name={info?.accno} />
									<RowInfo keys="ชื่อบัญชี : " name={info?.acname} />
									<RowInfo keys="วันที่เปิด : " name={info?.apply_date} />
									<RowInfo
										keys="จำนวนเงิน : "
										name={info.balance}
										color={Constant?.color?.violet}
									/>
									<RowInfo keys="ปรับปรุงล่าสุด : " name={info?.last_update} />
									<AppButton
										text="ดูรายการเดินบัญชี"
										style={styles.margin}
										onPress={toStatement}
									/>
									<SizedBox height={5} />
									<AppButton
										text="ส่งคำร้องเปลี่ยนแปลงเงินฝาก"
										style={styles.margin}
										onPress={toFormChange}
									/>
									<SizedBox height={10} />
								</View>
							]}
							data={savemasRegist}
						/>
					</View>
				</LinearGradient>
			</View>
		</AppView>
	);
};

export default useNavigator(Savemas_Detail);

const styles = StyleSheet.create({
	content: {
		flex: 1,
		flexDirection: 'column',
		marginTop: 15,
		marginBottom: 15,
		backgroundColor: Constant?.color?.white,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: Constant?.color?.gray,
	},
	margin: {
		marginLeft: 10,
		marginRight: 10,
	},
	body: {
		flex: 1,
	},
	linearGradient: {
		flex: 1,
		paddingLeft: 15,
		paddingRight: 15,
	},
	Button: {
		marginTop: 20,
		margin: 10,
		backgroundColor: Constant?.color?.violetlight,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: Constant?.color?.gray,
	},
});
