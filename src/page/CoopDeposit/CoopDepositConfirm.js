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
import { AppView, AppButton, SizedBox, StepBar } from '../../component';
import { transferDepositConfirm, transferDepositConfirmOtp } from "../../service/Services"
import toCurrency from '../../utils/toCurrency';
import showError from '../../utils/showError';

const CoopDepositConfirm = ({ navigation, Actions, remark, info = {}, amount, subscribe = false, toAccount }) => {
	const [isLoading, setIsLoading] = useState(false);

	const onConfirm = async () => {
		try {
			setIsLoading(true)
			await transferDepositConfirm({ amount, remark, to_accno: toAccount }, (res, done) => {
				// console.log("transferDepositConfirm res : ", res.data)
				if (done && res.data.status) {
					Actions.push('CoopOtp', {
						payload: {
							title: "ยืนยันการกู้เงินสหกรณ์",
							success: 'CoopDepositSuccess',
							amount,
							remark,
							subscribe,
							info,
							data: {
								transfer_withdraw_id: res?.data?.data?.transfer_withdraw?.id,
							},
							action: (data, callback) => transferDepositConfirmOtp(data, callback)
						}
					});
				} else {
					showError(res?.data?.message);
				}
			})
		} catch (e) {
			console.log("CoopDepositConfirm.js onConfirm error : ", e)
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
						text: 'ฝากเงินเข้าบัญชีสหกรณ์',
						style: { color: '#fff' },
					}}
					innerContainerStyles={{ backgroundColor: Constant?.color?.violet }}
					containerStyle={{
						backgroundColor: Constant?.color?.violet,
						borderBottomColor: Constant?.color?.violet,
					}}
				/>

				<ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
					<View>
						<Text style={styles.label}>ยืนยันการฝากเงินเข้าบัญชีสหกรณ์</Text>
						<SizedBox height={10} />
						<StepBar step={2} />
						<SizedBox height={22} />
						<View style={styles.twoLabel}>
							<Text style={styles.label}>จากเลขบัญชี {info?.bankId} :</Text>
							<Text style={styles.label}>{info?.number}</Text>
						</View>
						<SizedBox height={10} />
						<View style={styles.twoLabel}>
							<Text style={styles.label}>ไปยัง บัญชีสหกรณ์ของฉัน</Text>
							<Text style={styles.label}>{toAccount}</Text>
						</View>
						<SizedBox height={10} />
						<View style={styles.twoLabel}>
							<Text style={styles.label}>จำนวนเงิน :</Text>
							<Text style={styles.label}>{toCurrency(amount)}</Text>
						</View>
						<SizedBox height={13} />
						<Text style={styles.label}>บันทึกช่วยจำ</Text>
						<SizedBox height={16} />
						<View style={styles.twoLabel}>
							<Text style={styles.remark}>{remark || "-"}</Text>
						</View>
						<SizedBox height={110} />
						<AppButton
							text="ยืนยันข้อมูล"
							onPress={onConfirm}
						/>
					</View>
				</ScrollView>
			</LinearGradient>
		</AppView>
	);
};

export default useNavigator(CoopDepositConfirm);

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
		color: Constant.color.dark,
	},
	remark: {
		fontSize: 12,
		color: Constant.color.dark,
	},
	subTitle: {
		color: '#727272',
		fontSize: 10,
	},
	twoLabel: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 10,
	},
});
