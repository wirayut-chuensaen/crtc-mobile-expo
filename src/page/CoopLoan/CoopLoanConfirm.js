import React, { useState } from 'react';
import {
	StyleSheet,
	View,
	Text,
	ScrollView,
} from 'react-native';
import { Icon, Header } from 'react-native-elements';
import Constant from '../../utils/Constant';
import { LinearGradient } from 'expo-linear-gradient';
import useNavigator from '../../utils/useNavigator';
import { AppView, SizedBox, AppButton, StepBar } from '../../component';
import { transferBorrowConfirmOtp, transferBorrowConfirm } from "../../service/Services"
import toCurrency from '../../utils/toCurrency';
import showError from '../../utils/showError';

const CoopLoanConfirm = ({ navigation, Actions, remark, amount, borrowProfile = {}, subscribe = false }) => {
	const [isLoading, setIsLoading] = useState(false);

	const onConfirm = async () => {
		try {
			setIsLoading(true)
			await transferBorrowConfirm({ amount, remark }, (res, done) => {
				if (done && res?.data?.status) {
					Actions.push('CoopOtp', {
						payload: {
							title: "ยืนยันการกู้เงินสหกรณ์",
							success: 'CoopLoanSuccess',
							amount,
							remark,
							subscribe,
							info: borrowProfile,
							data: {
								transfer_withdraw_id: res?.data?.data?.transfer_withdraw?.id,
							},
							action: (data, callback) => transferBorrowConfirmOtp(data, callback)
						}
					});
				} else {
					showError(res?.data?.message);
				}
			})
		} catch (e) {
			console.log("CoopLoanConfirm.js onConfirm error : ", e)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<AppView isLoading={isLoading}>
			<LinearGradient
				locations={[0, 0.4]}
				colors={[Constant?.color?.violetlight, Constant?.color?.darkPurple]}
				start={{ x: 0, y: 0 }}
				end={{ x: 0, y: 1 }}
				style={{ ...StyleSheet.absoluteFillObject }}>
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
					centerComponent={{
						text: 'ยืนยันการกู้เงินสหกรณ์',
						style: { color: '#fff' },
					}}
					innerContainerStyles={{ backgroundColor: Constant?.color?.violet }}
					containerStyle={{
						backgroundColor: Constant?.color?.violet,
						borderBottomColor: Constant?.color?.violet,
					}}
				/>

				<ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
					<Text style={styles.label}>ยืนยันการกู้เงินสหกรณ์</Text>
					<SizedBox height={10} />
					<StepBar step={2} />
					<SizedBox height={22} />
					<View style={styles.twoLabel}>
						<Text style={styles.label}>บัญชีผู้กู้ :</Text>
						<Text style={styles.label}>{borrowProfile?.BAYACNO}</Text>
					</View>
					<SizedBox height={10} />
					<View style={styles.twoLabel}>
						<Text style={styles.label}>ประเภทการกู้เงิน :</Text>
						<Text style={styles.label}>สามัญ ATM</Text>
					</View>
					<SizedBox height={10} />
					<View style={styles.twoLabel}>
						<Text style={styles.label}>วงเงินกู้ :</Text>
						<Text style={styles.label}>{toCurrency(borrowProfile?.MAXPERITEM)}</Text>
					</View>
					<SizedBox height={10} />
					<View style={styles.twoLabel}>
						<Text style={styles.label}>วงเงินกู้คงเหลือ :</Text>
						<Text style={styles.label}>{toCurrency(borrowProfile?.BAL_ATM)}</Text>
					</View>
					<SizedBox height={10} />
					<View style={styles.twoLabel}>
						<Text style={styles.label}>จำนวนเงินที่ขอกู้ :</Text>
						<Text style={styles.label}>{toCurrency(amount)}</Text>
					</View>
					<SizedBox height={10} />
					<View style={styles.twoLabel}>
						<Text style={styles.label}>ต้องการรับการแจ้งรายการ</Text>
						<Text style={styles.label}>{subscribe ? "ต้องการ" : "ไม่ต้องการ"}</Text>
					</View>
					<SizedBox height={13} />
					<Text style={styles.label}>บันทึกช่วยจำ</Text>
					<SizedBox height={16} />
					<View style={styles.twoLabel}>
						<Text style={styles.remark}>{remark}</Text>
					</View>
					<SizedBox height={16} />
					{
						borrowProfile?.note &&
						<View style={{ padding: 10, borderColor: Constant?.color?.lightGray, borderWidth: 1, borderRadius: 4, backgroundColor: Constant?.color?.whitesmoke }}>
							<Text style={[styles.label, { textAlign: 'center', color: Constant?.color?.red, fontWeight: 'bold' }]}>{borrowProfile?.note || " - "}</Text>
						</View>
					}
					<SizedBox height={110} />
					<AppButton
						text="ยืนยันข้อมูล"
						onPress={onConfirm}
					/>
				</ScrollView>
			</LinearGradient>
		</AppView>
	);
};

export default useNavigator(CoopLoanConfirm);

const styles = StyleSheet.create({
	body: {
		backgroundColor: 'white',
		borderRadius: 5,
		margin: 15,
		flex: 1,
		padding: 10,
	},
	br: {
		backgroundColor: '#E1E1E1',
		height: 1,
	},
	label: {
		fontSize: 14,
		color: Constant?.color?.dark,
	},
	remark: {
		fontSize: 12,
		color: Constant?.color?.dark,
	},
	twoLabel: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 10,
	},
});
