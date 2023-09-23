import React, { useState, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Header } from 'react-native-elements';
import Constant from '../utils/Constant';
import { LinearGradient } from 'expo-linear-gradient';
import { RowInfo } from '../items';
import { getLoanRegist, loanDetail } from "../service/Services"
import { AppView, AppButton, SizedBox, TableRequestList } from '../component';
import useNavigator from '../utils/useNavigator';
import showError from '../utils/showError';
import { useFocusEffect } from '@react-navigation/native';

const Loan_Detail = ({ navigation, Actions, item = {} }) => {
	const [info, setInfo] = useState({});
	const [loanRegist, setLoanRegist] = useState([]);
	const [isLoading, setIsLoading] = useState(false)

	useFocusEffect(
		useCallback(() => {
			initialData();
		}, [])
	)

	const initialData = async () => {
		try {
			setIsLoading(true)
			await loanDetail(item?.RECNO, (res, done) => {
				if (done && res?.data?.status) {
					setInfo(res?.data?.data?.loan[0]);
				} else {
					showError(res?.data?.message);
				}
			});
			await getLoanRegist((res, done) => {
				if (done && res?.data?.status) {
					setLoanRegist(res?.data?.data);
				} else {
					showError(res?.data?.message);
				}
			});
		} catch (e) {
			console.log("Loan_Detail.js initialData error : ", e)
		} finally {
			setIsLoading(false)
		}
	};

	const toStatement = () => Actions.push('Loan_Statement', { RECNO: info?.RECNO });

	const toFormChange = () =>
		Actions.push('FormChangeLoan', {
			contactNumber: info?.LOAN_NO,
			currency: Number(info?.PAYMENT.replace(/[^0-9.-]+/g, '')),
		});

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
				centerComponent={{ text: 'เงินกู้', style: { color: '#fff' } }}
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
							key="loan"
							header={[
								<View>
									<RowInfo keys="รายละเอียด" name="" />
									<RowInfo keys="ประเภทสัญญา : " name={info?.loan_type} />
									<RowInfo keys="เลขที่สัญญา : " name={info?.LOAN_NO} />
									<RowInfo keys="วันที่ทำสัญญา : " name={info?.APPLY_DATE} />
									<RowInfo keys="วงเงินที่อนุมัติ : " name={info?.AMOUNT} />
									<RowInfo
										keys="ส่งชำระต่องวด : "
										name={info?.PAYMENT}
										color={Constant?.color?.violet}
									/>
									<RowInfo
										keys="หนี้คงเหลือ : "
										name={info?.BALANCE}
										color={Constant?.color?.violet}
									/>
									<SizedBox height={20} />
									<AppButton
										text="ดูรายการเดินบัญชี"
										style={styles.margin}
										onPress={toStatement}
									/>
									<SizedBox height={5} />
									<AppButton
										text="ส่งคำร้องเปลี่ยนแปลงเงินส่งชำระหนี้"
										style={styles.margin}
										onPress={toFormChange}
									/>
									<SizedBox height={10} />
								</View>,
							]}
							data={loanRegist}
						/>
					</View>
				</LinearGradient>
			</View>
		</AppView>
	);
};

export default useNavigator(Loan_Detail);

const styles = StyleSheet.create({
	container: { flex: 1 },
	content: {
		flex: 1,
		flexDirection: 'column',
		marginVertical: 15,
		backgroundColor: Constant?.color?.white,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: Constant?.color?.gray,
	},
	body: {
		flex: 1,
	},
	linearGradient: {
		flex: 1,
		paddingLeft: 15,
		paddingRight: 15,
	},
	margin: {
		marginLeft: 10,
		marginRight: 10,
	},
});
