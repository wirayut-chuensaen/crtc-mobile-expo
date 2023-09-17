import React, { useState, useEffect, useCallback } from 'react';
import {
	Text,
	View,
	StyleSheet,
	FlatList,
	Dimensions,
	TouchableOpacity,
	BackHandler,
	Alert,
} from 'react-native';
import { Icon, Dialog } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { checkCondition, createUserPin, loginWithPin } from "../service/Services"
import Constant from '../utils/Constant';
import { Tab } from './Launcher';
import useNavigator from '../utils/useNavigator';
import { AppView } from '../component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const Dot = ({ check = false }) => (
	<Icon
		name={check ? 'checkbox-blank-circle' : 'checkbox-blank-circle-outline'}
		type="material-community"
		color="#fff"
		size={20}
		iconStyle={{ marginHorizontal: 8 }}
	/>
);

const PinMode = {
	VERIFY: 1,
	CREATE: 2,
};

const { width } = Dimensions.get('screen');

const VerifyPin = ({
	navigation,
	reload,
	tab = Tab.ACCOUNT,
	Actions,
	canBack = true,
	allowCondition = true,
}) => {
	const [title, setTitle] = useState('');
	const [pin, setPin] = useState('');
	const [confirm, setConfirm] = useState('');
	const [mode, setMode] = useState(PinMode.VERIFY);
	const [isLoading, setIsLoading] = useState(false)
	const [dialog, setDialog] = useState({})

	useEffect(() => {
		checkMode();
		return () => reload && reload();
	}, []);

	useEffect(() => {
		if (pin.length == 6) checkPin();
	}, [pin])

	useFocusEffect(
		useCallback(() => {
			const backHandler = BackHandler.addEventListener(
				'hardwareBackPress',
				checkPressBack,
			);
			return () => backHandler.remove();
		}, [])
	)

	const handleCancel = () => {
		setDialog({
			...dialog,
			status: false
		})
	};

	const checkMode = async () => {
		try {
			setIsLoading(true)
			const pinPersist = await AsyncStorage.getItem('pin');
			await loginWithPin({ user_pin: pinPersist }, (res, done) => {
				if (!done || !res?.data?.status) {
					setMode(PinMode.CREATE);
					setTitle('กรุณาตั้งค่ารหัส PIN ก่อนเข้าใช้งาน');
				} else {
					setTitle('ใส่รหัส Pin เพื่อดำเนินการต่อ');
				}
			});
		} catch (e) {
			console.log("VerifyPin.js checkMode error : ", e)
		} finally {
			setIsLoading(false)
		}
	};

	const loginWithPinData = async () => {
		try {
			setIsLoading(true)
			await loginWithPin({ user_pin: pin }, async (res, done) => {
				if (done && res.data.status) {
					await AsyncStorage.multiSet([
						['pin', `${pin}`],
						['pinPhone', `${res?.data?.data?.mobile_phone}`],
						['pinDate', `${new Date().getTime()}`],
					]).then(() => {
						if (allowCondition) {
							checkCondition((res, done) => {
								// console.log("checkCondition res : ", res)
								if (done && res?.data?.status) {
									Actions.replace('Launcher', {
										tab,
									});
								} else {
									Actions.push('TermAndCondition');
								}
							})
						} else {
							Actions.replace('Launcher', {
								tab,
							});
						}
					});
				} else {
					setPin('');
					setDialog({
						...dialog,
						title: null,
						message: 'Pin ไม่ถูกต้อง',
						status: true
					})
				}
			});
		} catch (e) {
			console.log("VerifyPin.js loginWithPinData error : ", e)
		} finally {
			setIsLoading(false)
		}
	};

	const checkPin = async () => {
		try {
			setIsLoading(true)
			if (mode === PinMode.VERIFY) {
				await loginWithPinData();
			} else {
				if (confirm === '') {
					setConfirm(pin);
					setPin('');
					setTitle('ยืนยัน PIN อีกครั้ง');
				} else if (confirm !== pin) {
					setConfirm('');
					setPin('');
					setTitle('รหัสผ่านไม่ถูกต้อง ลองใหม่อีกครั้ง');
				} else {
					await createUserPin({ pin, pin_confirmation: confirm }, (res, done) => {
						if (done && res.data.status) {
							setConfirm('');
							setPin('');
							setMode(PinMode.VERIFY);
							setTitle('ระบุรหัสผ่าน');
							loginWithPinData();
						} else {
							AsyncStorage.clear().then(() => {
								Actions.replace('Authen');
							});
						}
					});
				}
			}
		} catch (e) {
			console.log("VerifyPin.js checkPin error : ", e)
		} finally {
			setIsLoading(false)
		}
	};

	const _renderButton = ({ item, index }) => {
		const onAddPin = () => {
			if (pin.length < 6) {
				let newPin = pin
				newPin += item
				setPin(newPin);
			}
		};

		const onRemvePin = () => {
			if (pin.length > 0) {
				let newPin = pin
				newPin = pin.slice(0, -1);
				setPin(newPin);
			}
		};

		if (item === -1) {
			return <View style={styles.emptyButton} />;
		}

		if (item === 99) {
			return (
				<TouchableOpacity onPress={onRemvePin} style={styles.numberPad}>
					<Icon
						name="backspace-outline"
						type="material-community"
						color="#fff"
						size={30}
					/>
				</TouchableOpacity>
			);
		}

		return (
			<TouchableOpacity onPress={onAddPin} style={styles.numberPad}>
				<Text style={{ color: 'white', fontSize: 30 }}>{item}</Text>
			</TouchableOpacity>
		);
	};

	const onForgotPin = () => Actions.push('NewPinOTP');

	const onBack = () => {
		if (reload) {
			reload();
		} else {
			Actions.pop()
		}
	};

	const buildBackButton = () => {
		// console.log("debug canGoBack : ", navigation?.canGoBack())
		if (navigation?.canGoBack()) {
			return (
				<TouchableOpacity
					onPress={onBack}
					disabled={!canBack}
					style={{
						marginTop: 50,
						marginLeft: 10,
						alignItems: 'flex-start',
						justifyContent: 'flex-start',
					}}>
					<Icon
						name="chevron-thin-left"
						type="entypo"
						color={canBack ? '#fff' : 'transparent'}
						size={30}
					/>
				</TouchableOpacity>
			)
		} else {
			return (<View style={{ marginTop: 80 }} />)
		}
	}

	const checkPressBack = () => {
		if (!navigation.canGoBack()) {
			Alert.alert('แจ้งเตือน', 'ยืนยันที่จะออกจากแอปหรือไม่?', [
				{
					text: 'ยกเลิก',
					onPress: () => null,
					style: 'cancel',
				},
				{ text: 'ตกลง', onPress: () => BackHandler.exitApp() },
			]);
		} else {
			Actions.pop()
		}
		return true;
	}

	return (
		<AppView isLoading={isLoading} style={{ flex: 1 }}>
			<Dialog isVisible={dialog?.status ? dialog?.status : false} onBackdropPress={handleCancel}>
				<Dialog.Title title="แจ้งเตือน" />
				<Text>{dialog?.message}</Text>
				<Dialog.Actions>
					<Dialog.Button title="ตกลง" onPress={handleCancel} />
				</Dialog.Actions>
			</Dialog>

			<LinearGradient
				locations={[0, 0.4]}
				colors={[Constant.color.violetlight, Constant.color.darkPurple]}
				start={{ x: 0, y: 0 }}
				end={{ x: 0, y: 1 }}
				style={{ ...StyleSheet.absoluteFillObject }}
			/>
			<View style={{ zIndex: 9999, flex: 1 }}>
				{buildBackButton()}
				<View style={{ justifyContent: 'center', alignItems: 'center' }}>
					<View style={styles.numberPad}>
						<Icon
							name="lock-outline"
							type="material-community"
							color="#fff"
							size={30}
						/>
					</View>
					<Text style={{ color: 'white', marginVertical: 10 }}>{title}</Text>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							marginVertical: 8,
						}}>
						<Dot check={pin.length >= 1} />
						<Dot check={pin.length >= 2} />
						<Dot check={pin.length >= 3} />
						<Dot check={pin.length >= 4} />
						<Dot check={pin.length >= 5} />
						<Dot check={pin.length >= 6} />
					</View>
				</View>
				<FlatList
					data={[1, 2, 3, 4, 5, 6, 7, 8, 9, -1, 0, 99]}
					keyExtractor={(data, index) => `num_${index}`}
					numColumns={3}
					contentContainerStyle={{
						justifyContent: 'center',
						alignItems: 'center',
						marginTop: 30,
					}}
					renderItem={_renderButton}
				/>
				<TouchableOpacity
					onPress={onForgotPin}
					style={{
						marginTop: 'auto',
						justifyContent: 'center',
						alignItems: 'center',
						marginBottom: 50,
					}}>
					<Text style={{ color: 'white' }}>ลืมรหัส Pin ?</Text>
				</TouchableOpacity>
			</View>
		</AppView>
	);
};

export default useNavigator(VerifyPin);

const styles = StyleSheet.create({
	numberPad: {
		width: width * 0.18,
		height: width * 0.18,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 2,
		borderColor: 'white',
		borderRadius: 100,
		margin: 10,
	},
	emptyButton: {
		width: width * 0.18,
		height: width * 0.18,
		margin: 10,
	},
});
