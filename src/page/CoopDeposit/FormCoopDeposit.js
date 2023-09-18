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
	AppButton,
	SizedBox,
	AppTextInput,
	AppListPicker,
	ButtonPicker,
	StepBar,
} from '../../component';
import { getDepositMemberProfile } from "../../service/Services"
import showError from '../../utils/showError';

const FormCoopDeposit = ({ navigation, Actions }) => {
	const [validate, setValidate] = useState(false);
	const [subscribe, setSubscribe] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [info, setInfo] = useState({});
	const [crtcAccount, setCrtcAccount] = useState([]);
	const [toAccount, setToAccount] = useState('');
	const [remark, setRemark] = useState('');
	const [amount, setAmount] = useState(0);
	const [accountSelect, setAccountSelect] = useState();

	useEffect(() => {
		initialData();
	}, []);

	useEffect(() => {
		setValidate(amount.length > 0 && toAccount.length > 0);
	}, [amount, toAccount]);

	const initialData = () => {
		try {
			setIsLoading(true);
			getDepositMemberProfile((res, done) => {
				// console.log("getDepositMemberProfile res : ", res)
				if (done && res?.data?.status) {
					setInfo({
						...res?.data?.data.bank_account,
						bankId: res?.data?.data?.BANKID
					});
					setCrtcAccount(res?.data?.data?.crtc_accounts.map(x => {
						x.fullName = 'เลขบัญชี ' + x?.accno;
						x.shortName = 'เลขบัญชี ' + x?.accno;
						return x;
					}));
				} else {
					showError(res?.data?.message)
				}
			})
		} catch (e) {
			console.log("FormCoopDeposit.js initialData error : ", e)
		} finally {
			setIsLoading(false)
		}
	};

	const onConfirm = () => Actions.push('CoopDepositConfirm', {
		amount,
		remark,
		info,
		subscribe,
		toAccount,
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

				<ScrollView
					style={styles.body}
					showsVerticalScrollIndicator={false}
				>
					<View>
						<Text style={styles.label}>ฝากเงินเข้าบัญชีสหกรณ์</Text>
						<SizedBox height={10} />
						<StepBar step={1} />
						<SizedBox height={22} />
						<View style={styles.twoLabel}>
							<Text style={styles.label}>จากเลขบัญชี {info?.bankId} :</Text>
							<Text style={styles.label}>{info?.number}</Text>
						</View>
						<SizedBox height={10} />
						<View style={styles.twoLabel}>
							<Text style={styles.label}>ไปยัง บัญชีสหกรณ์ของฉัน</Text>
							<Text style={styles.label} />
						</View>
						<SizedBox height={10} />
						<AppListPicker
							data={crtcAccount}
							title="เลือกบัญชีสหกรณ์"
							showOnKey='fullName'
							onSelect={({ item, index }) => {
								setToAccount(item?.accno);
								setAccountSelect(item?.shortName);
							}}
						>
							<ButtonPicker text={accountSelect || 'เลือกบัญชีสหกรณ์'} />
						</AppListPicker>
						<SizedBox height={10} />
						<View style={styles.twoLabel}>
							<Text style={styles.label}>จำนวนเงินที่จะฝาก (บาท) :</Text>
							<Text style={styles.label} />
						</View>
						<SizedBox height={10} />
						<AppTextInput placeholder="จำนวนเงิน"
							onChangeText={setAmount}
						/>
						<SizedBox height={20} />
						<Text style={styles.label}>กำหนดบันทึกช่วยจำ</Text>
						<SizedBox height={10} />
						<AppTextInput
							style={styles.textArea}
							multiline={true}
							numberOfLines={4}
							textAlignVertical="top"
							keyboardType="default"
							onChangeText={setRemark}
						/>
						<SizedBox height={20} />
						<AppButton
							text="ยืนยันข้อมูล"
							onPress={onConfirm}
							disabled={!validate}
						/>
					</View>
				</ScrollView>
			</LinearGradient>
		</AppView >
	);
};

export default useNavigator(FormCoopDeposit);

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
	subTitle: {
		color: '#727272',
		fontSize: 10,
	},
	twoLabel: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 10,
	},
	textArea: {
		height: 120,
	},
});
