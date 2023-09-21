import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	TextInput,
	Keyboard,
	Platform,
	Alert,
	ScrollView,
} from 'react-native';
import { Icon, Header } from 'react-native-elements';
import Constant from '../utils/Constant';
import { LinearGradient } from 'expo-linear-gradient';
import { AppView } from '../component';
import useNavigator from '../utils/useNavigator';
import { accountDetail, canTransfer } from "../service/Services"
import NumberHelper from '../utils/NumberHelper';

const TransferAction = ({ navigation, account, Actions }) => {
	const [accountNumber, setAccountNumber] = useState('');
	const [toAccount, setToAccount] = useState({});
	const [fromAccount, setFromAccount] = useState(account);
	const [remark, setRemark] = useState('');
	const [amount, setAmount] = useState('');
	const [fee, setFee] = useState('0.00');
	const [focus, setFocus] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const onBackground = () => {
		Keyboard.dismiss();
		setFocus(false);
	};

	useEffect(() => {
		if (Number(amount) > Number(fromAccount.BALANCE)) {
			setAmount(fromAccount.BALANCE);
		}
	}, [amount]);

	const onNext = async () => {
		var can_continue = true;
		if (accountNumber.length === 0) {
			return Alert.alert('', 'กรุณากรอกเลขที่บัญชี');
		}
		if (fromAccount.ACCNO.replace('-', '') == accountNumber.replace('-', '')) {
			return Alert.alert('', 'ท่านไม่สามารถโอนเข้าบัญชีเดียวกันได้');
		}
		if (!(Number(amount) > 0)) {
			return Alert.alert('', 'กรุณากรอกจำนวนเงินให้ถูกต้อง');
		}
		if (Number(amount) > Number(fromAccount.BALANCE.replace(',', ''))) {
			return Alert.alert('', 'ยอดเงินคงเหลือไม่เพียงพอ');
		}
		setIsLoading(true);
		try {
			await canTransfer({
				src_accno: fromAccount?.ACCNO.replace('-', ''),
				des_accno: accountNumber,
				amount,
			});
		} catch (err) {
			setIsLoading(false);
			if (err?.response?.status === 401) {
				return Alert.alert('', err?.response?.data?.message);
			}
		}

		if (can_continue) {
			accountDetail(accountNumber.replace('-', ''), (res, done) => {
				setIsLoading(false);
				if (done && res?.data?.status) {
					navigation.navigate('TransferConfirm', {
						toAccount: res?.data?.data?.savemas,
						fromAccount,
						remark,
						amount,
						fee,
					});
				} else {
					if (res?.response && res?.response?.status === 401) {
						Alert.alert(
							'',
							res?.response?.data?.message,
							[
								{
									text: 'OK',
									onPress: () => {
										Actions.replace('Launcher');
									},
								},
							],
							{ cancelable: false },
						);
					} else {
						Alert.alert('', res?.data?.message);
					}
				}
			});
		}
	};

	const onCancel = () => Actions.popToRoot()

	const onBlur = () => {
		setAmount(Number(amount).toFixed(2));
		setFocus(false);
	};

	const onAmountChange = (text) => {
		if (NumberHelper.isNumber(text)) {
			if (Number(text) > Number(fromAccount?.BALANCE.replace(',', ''))) {
				setAmount(fromAccount.BALANCE.replace(',', ''));
			} else {
				setAmount(text);
			}
		}
	};

	return (
		<AppView isLoading={isLoading}>
			<TouchableOpacity
				activeOpacity={1}
				onPress={onBackground}
				style={{ flex: 1 }}>
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
					centerComponent={{ text: 'โอนเงิน', style: { color: '#fff' } }}
					innerContainerStyles={{ backgroundColor: Constant?.color?.violet }}
					containerStyle={{
						backgroundColor: Constant?.color?.violet,
						borderBottomColor: Constant?.color?.violet,
					}}
				/>
				<ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
					<View
						style={{
							justifyContent: 'center',
							padding: 20,
							backgroundColor: '#e1e1e1',
						}}>
						<Text style={{ fontWeight: 'bold', fontSize: 15 }}>จาก</Text>
						<View style={{ marginVertical: 10 }}>
							<View style={styles.inputContainer}>
								<View style={{ flexDirection: 'row' }}>
									<View style={{ flex: 1 }}>
										<Text style={{ fontWeight: 'bold', fontSize: 14 }}>
											{fromAccount?.ACNAME}
										</Text>
										<Text style={{ fontSize: 11, marginTop: 4 }}>ออมทรัพย์</Text>
										<Text style={{ fontSize: 11, marginTop: 4 }}>
											{fromAccount?.ACCNO}
										</Text>
									</View>
									<Icon
										name="chevron-thin-right"
										type="entypo"
										color="gray"
										size={12}
									/>
								</View>
								<View style={{ alignItems: 'flex-end' }}>
									<Text style={{ fontWeight: 'bold', fontSize: 22 }}>
										{NumberHelper.numberFormat(fromAccount?.BALANCE, 2)}{' '}
										<Text style={{ fontSize: 12 }}>THB</Text>
									</Text>
								</View>
							</View>
						</View>

						<Text style={{ fontWeight: 'bold', fontSize: 15 }}>ไปยัง</Text>
						<View style={{ marginTop: 10 }}>
							<View style={styles.inputContainer}>
								<TextInput
									placeholder="เลขที่บัญชี"
									value={accountNumber}
									onChangeText={setAccountNumber}
									keyboardType="number-pad"
									maxLength={6}
									style={styles.input}
								/>
								<Text style={{ fontSize: 11 }}>* ระบุเลขที่บัญชี 6 หลัก</Text>
							</View>
						</View>
					</View>
					<View style={{ flex: 1, backgroundColor: 'white', padding: 20 }}>
						<Text style={{ fontWeight: 'bold', fontSize: 15 }}>จำนวนเงิน</Text>
						{/* <Text style={{ fontSize: 11, marginTop: 8 }}>
							*วงเงินสูงสุดต่อวัน 200,000.00 บาท
						</Text> */}
						<View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
							<TextInput
								placeholder="0.00"
								value={amount}
								onChangeText={onAmountChange}
								keyboardType="number-pad"
								onFocus={() => setFocus(true)}
								onBlur={onBlur}
								style={{
									textAlign: 'right',
									fontSize: 30,
									fontWeight: 'bold',
									color: Constant?.color?.violet,
									flex: 1,
								}}
							/>
							<Text
								style={{
									marginLeft: 8,
									fontSize: 12,
									fontWeight: 'bold',
									color: Constant?.color?.violet,
									marginBottom: 16,
								}}>
								THB
							</Text>
						</View>
						<View
							style={{
								height: 2,
								width: '100%',
								backgroundColor:
									focus || amount.length > 0 ? Constant.color.violet : 'gray',
							}}
						/>
						<Text
							style={{
								fontWeight: 'bold',
								fontSize: 15,
								marginTop: 40,
								marginBottom: 8,
							}}>
							บันทึกช่วยจำ
						</Text>
						<View style={styles.remarkContainer}>
							<TextInput
								value={remark}
								onChangeText={setRemark}
								underlineColorAndroid="transparent"
								style={{
									width: '100%',
									color: '#444',
									padding: 0,
									paddingVertical: Platform.OS === 'ios' ? 5 : 0,
								}}
							/>
						</View>

						<View>
							<View style={{ marginVertical: 20 }}>
								<TouchableOpacity onPress={onNext}>
									<LinearGradient
										locations={[0, 0.4]}
										colors={[
											Constant?.color?.darkPurple,
											Constant?.color?.lightPurple,
										]}
										start={{ x: 0, y: 0 }}
										end={{ x: 1, y: 1 }}
										style={{
											height: 50,
											borderRadius: 8,
											justifyContent: 'center',
										}}>
										<View
											style={{
												flexDirection: 'row',
												alignItems: 'center',
												justifyContent: 'center',
											}}>
											<Text style={{ color: 'white', fontSize: 14 }}>ต่อไป</Text>
										</View>
									</LinearGradient>
								</TouchableOpacity>
							</View>
							<View style={{ marginBottom: 30 }}>
								<TouchableOpacity
									onPress={onCancel}
									style={{
										justifyContent: 'center',
										alignItems: 'center',
										height: 30,
									}}>
									<Text style={{ color: 'black', fontSize: 14 }}>ยกเลิกรายการ</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</ScrollView>
			</TouchableOpacity>
		</AppView>
	);
};

export default useNavigator(TransferAction);

const styles = StyleSheet.create({
	inputContainer: {
		padding: 14,
		borderRadius: 4,
		backgroundColor: 'white',
	},
	remarkContainer: {
		borderRadius: 4,
		borderColor: '#eee',
		borderWidth: 1,
		paddingVertical: 6,
		paddingHorizontal: 20,
	},
	input: {
		backgroundColor: '#eee',
		paddingHorizontal: 10,
		borderRadius: 4,
		marginBottom: 10,
		paddingVertical: Platform.OS === 'ios' ? 10 : 0,
	},
});
