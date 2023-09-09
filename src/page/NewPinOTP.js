import React, { useState, useCallback, useEffect } from 'react';
import {
	Text,
	View,
	StyleSheet,
	Alert,
	TextInput,
	TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { confirmNewPinOTP, requestNewPinOTP, smsDelay } from "../service/Services"
import { Header } from 'react-native-elements';
import Constant from '../utils/Constant';
import useNavigator from '../utils/useNavigator';
import showError from '../utils/showError';
import { AppView } from '../component';

const NewPinOTP = ({ navigation, Actions }) => {
	const [otp, setOtp] = useState('');
	const [timerCount, setTimer] = useState(0);
	const [delay, setDelay] = useState(30);
	const [isLoading, setIsLoading] = useState(false)
	let interval = null;

	useEffect(() => {
		getDelay();
	}, []);

	const getDelay = async () => {
		try {
			setIsLoading(true)
			const response = await smsDelay();
			const { status, data } = response?.data;
			if (status) {
				setDelay(+data?.resend_delay);
			} else {

			}
			setIsLoading(false)
		} catch (e) {
			setIsLoading(false)
			console.log('NewPinOTP.js getDelay error : ', e);
		}
	};

	const onSubmit = useCallback(async () => {
		if (otp.length === 6) {
			await confirmNewPinOTP({ otp_change_pin: otp, },
				(res, done) => {
					if (done && res?.data?.status) {
						Actions.push('NewPinDataVerify');
					} else {
						Alert.alert('', res?.data?.message);
					}
				},
			);
		} else {
			Alert.alert('', 'กรุณากรอก OTP ให้ครบ 6 หลัก');
		}
	}, [otp]);

	const startCountdown = () => {
		setTimer(delay);
		setTimeout(() => {
			interval =
				interval == null &&
				setInterval(() => {
					setTimer((lastTimerCount) => {
						if (lastTimerCount <= 1) {
							clearInterval(interval);
							interval = null;
						}
						return lastTimerCount - 1;
					});
				}, 1000);
		}, 1000);
	};

	const onRequestOTP = async () => {
		try {
			setIsLoading(true)
			if (timerCount === 0) {
				// call api
				await requestNewPinOTP((res, done) => {
					if (done && res?.data?.status) {
						console.log('Send OTP Done');
					} else {
						showError(res?.data?.message);
					}
				});
				startCountdown();
			}
			setIsLoading(false)
		} catch (e) {
			console.log("NewPinOTP.js onRequestOTP error : ", e)
			setIsLoading(false)
		}
	};

	return (
		<AppView isLoading={isLoading} style={{ flex: 1, backgroundColor: "#eee" }}>
			<Header
				leftComponent={
					<Icon
						name="chevron-thin-left"
						type="entypo"
						color={Constant?.color?.violet}
						iconStyle={{ backgroundColor: '#fff' }}
						onPress={() => Actions.pop()}
					/>
				}
				centerComponent={{
					text: 'กรอกรหัส OTP',
					style: { color: Constant?.color?.violet },
				}}
				innerContainerStyles={{ backgroundColor: '#fff' }}
				containerStyle={{
					backgroundColor: '#fff',
					borderBottomColor: '#fff',
				}}
			/>
			<View style={styles.body}>
				<View style={styles.otpContainer}>
					<View style={styles.otpInputContainer}>
						<TextInput
							placeholder="รหัส OTP"
							value={otp}
							onChangeText={setOtp}
							keyboardType="number-pad"
							placeholderTextColor="#777"
							maxLength={6}
							style={styles.textInput}
						/>
						<TouchableOpacity
							onPress={onRequestOTP}
							activeOpacity={0.8}
							disabled={timerCount !== 0}
							style={[
								styles.otpButtonContainer,
								timerCount !== 0 && { backgroundColor: '#aaa' },
							]}>
							<Text style={styles.submitText}>รับรหัส OTP</Text>
						</TouchableOpacity>
					</View>
					{timerCount !== 0 && (
						<View style={styles.countdownContainer}>
							<Icon
								type="material-community"
								name="reload"
								size={14}
								color="black"
							/>
							<View style={{ width: 10 }} />
							<Text>กรุณาลองใหม่อีกครั้งในอีก {timerCount} วินาที</Text>
						</View>
					)}
				</View>

				<TouchableOpacity
					onPress={onSubmit}
					activeOpacity={0.8}
					style={styles.submitContainer}>
					<Text style={styles.submitText}>ยืนยัน</Text>
				</TouchableOpacity>
			</View>
		</AppView>
	);
};

export default useNavigator(NewPinOTP);

const styles = StyleSheet.create({
	submitContainer: {
		backgroundColor: Constant.color.violet,
		height: 50,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	otpButtonContainer: {
		backgroundColor: Constant.color.violet,
		height: 60,
		borderRadius: 10,
		paddingHorizontal: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	submitText: {
		color: 'white',
		fontSize: 16,
	},
	body: {
		padding: 20,
	},
	otpContainer: {
		backgroundColor: 'white',
		...Constant.color.shadow,
		padding: 20,
		marginBottom: 40,
	},
	otpInputContainer: {
		backgroundColor: '#eee',
		borderRadius: 10,
		flexDirection: 'row',
		height: 60,
		alignItems: 'center',
	},
	textInput: {
		paddingHorizontal: 20,
		flex: 1,
	},
	countdownContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		height: 40,
	},
});
