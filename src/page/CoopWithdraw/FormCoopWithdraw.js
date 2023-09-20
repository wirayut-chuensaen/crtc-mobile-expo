import React, { useEffect, useState } from 'react';
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
import {
	AppView,
	SizedBox,
	AppTextInput,
	AppButton,
	StepBar,
	WantSwitch
} from '../../component';
import { getTransferMemberInfo } from "../../service/Services"
import showError from '../../utils/showError';
import toCurrency from '../../utils/toCurrency';

const FormCoopWithdraw = ({ navigation, Actions }) => {
	const [validate, setValidate] = useState(false);
	const [subscribe, setSubscribe] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [info, setInfo] = useState({
		MAXPERITEM: 0,
		BAL_ATM: 0,
	});
	const [remark, setRemark] = useState('');
	const [amount, setAmount] = useState(0);

	useEffect(() => {
		initialData();
	}, []);

	useEffect(() => {
		setValidate(amount.length > 0 && Number(amount) > 0);
	}, [amount]);

	const initialData = async () => {
		try {
			setIsLoading(true);
			await getTransferMemberInfo((res, done) => {
				if (done && res?.data?.status) {
					setInfo(res?.data?.data)
				} else {
					showError(res?.data?.message)
				}
			})
		} catch (e) {
			console.log("FormCoopWithdraw.js initial error : ", e)
		} finally {
			setIsLoading(false)
		}
	};

	const onConfirm = () => Actions.push('CoopWithdrawConfirm', {
		amount,
		remark,
		info,
		subscribe,
	});

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
							onPress={navigation.goBack}
						/>
					}
					centerComponent={{
						text: 'ถอนเงินฝากบัญชีสหกรณ์',
						style: { color: '#fff' },
					}}
					innerContainerStyles={{ backgroundColor: Constant?.color?.violet }}
					containerStyle={{
						backgroundColor: Constant?.color?.violet,
						borderBottomColor: Constant?.color?.violet,
					}}
				/>

				<ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
					<Text style={styles.label}>ถอนเงินฝากสหกรณ์</Text>
					<SizedBox height={10} />
					<StepBar step={1} />
					<SizedBox height={22} />
					<View style={styles.twoLabel}>
						<Text style={styles.label}>บัญชีผู้ถอน :</Text>
						<Text style={styles.label}>{info?.BAYACNO}</Text>
					</View>
					<SizedBox height={10} />
					<View style={styles.twoLabel}>
						<Text style={styles.label}>วงเงินสูงสุด :</Text>
						<Text style={styles.label}>{toCurrency(info?.MAXPERITEM)}</Text>
					</View>
					<SizedBox height={10} />
					<View style={styles.twoLabel}>
						<Text style={styles.label}>ยอดเงินฝากถอนได้ :</Text>
						<Text style={styles.label}>{toCurrency(info?.BAL_ATM)}</Text>
					</View>
					<SizedBox height={10} />
					<View style={styles.twoLabel}>
						<Text style={styles.label}>จำนวนเงินที่ต้องการถอน (บาท) :</Text>
						<Text style={styles.label} />
					</View>
					<SizedBox height={10} />
					<AppTextInput
						placeholder="จำนวนเงิน"
						value={amount}
						onChangeText={(text) => {
							if (Number(text) > Number(info?.BAL_ATM)) {
								setAmount(Number(info?.BAL_ATM) + "")
							} else {
								setAmount(text);
							}
						}}
					/>
					<SizedBox height={10} />
					{
						info.note && <View style={{ padding: 10, borderColor: Constant?.color?.lightGray, borderWidth: 1, borderRadius: 4, backgroundColor: Constant?.color?.whitesmoke }}>
							<Text style={[styles.label, { textAlign: 'center', color: Constant?.color?.red, fontWeight: 'bold' }]}>{info?.note}</Text>
						</View>
					}
					<SizedBox height={20} />
					<Text style={styles.label}>ต้องการรับแจ้งทำรายการหรือไม่</Text>
					<SizedBox height={10} />
					<WantSwitch
						value={subscribe}
						onChange={() => setSubscribe(!subscribe)}
					/>
					<SizedBox height={20} />
					<Text style={styles.label}>กำหนดบันทึกช่วยจำ</Text>
					<SizedBox height={10} />
					<AppTextInput
						value={remark}
						maxLength={20}
						keyboardType="default"
						onChangeText={setRemark}
					/>
					<SizedBox height={20} />
					<AppButton
						text="ยืนยันทำรายการ"
						onPress={onConfirm}
						disabled={!validate}
					/>
				</ScrollView>
			</LinearGradient>
		</AppView>
	);
};

export default useNavigator(FormCoopWithdraw);

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
	twoLabel: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 10,
	},
});
