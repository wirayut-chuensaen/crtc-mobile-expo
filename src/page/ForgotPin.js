import React, { useState, useEffect } from 'react';
import {
	Text,
	View,
	StyleSheet,
	FlatList,
	Dimensions,
	TouchableOpacity,
	Alert,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { createUserPin, loginWithPin } from "../service/Services"
import { Header } from 'react-native-elements';
import Constant from '../utils/Constant';
import { Tab } from './Launcher';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useNavigator from '../utils/useNavigator';
import { AppView } from '../component';
import showError from '../utils/showError';

const Dot = ({ check = false }) => (
	<Icon
		name={check ? 'checkbox-blank-circle' : 'checkbox-blank-circle-outline'}
		type="material-community"
		color="#000"
		size={30}
		iconStyle={{ marginHorizontal: 8 }}
	/>
);

const { width } = Dimensions.get('screen');

export const ChangePinMode = {
	VERIFY: 1,
	CREATE: 2,
};

const ForgotPin = ({ navigation, Actions, mode }) => {
	const [title, setTitle] = useState('');
	const [pin, setPin] = useState('');
	const [confirm, setConfirm] = useState('');
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		checkMode();
	}, []);

	useEffect(() => {
		if (pin.length === 6) {
			checkPin();
		}
	}, [pin])

	const checkMode = () => {
		if (mode === ChangePinMode.VERIFY) {
			setTitle('ใส่รหัส Pin เดิม');
		} else {
			setTitle('รหัส Pin ใหม่');
		}
	};

	const loginWithPinData = async () => {
		try {
			setIsLoading(true)
			await loginWithPin({ user_pin: pin }, async (res, done) => {
				if (done && res?.data?.status) {
					await AsyncStorage.multiSet([
						['pin', `${pin}`],
						['pinPhone', `${res?.data?.data?.mobile_phone}`],
						['pinDate', `${new Date().getTime()}`],
					]).then(() => {
						Actions.push('NewPinOTP');
					});
				} else {
					setPin('');
					Alert.alert('', 'Pin ไม่ถูกต้อง');
				}
			});
		} catch (e) {
			console.log("ForgotPin.js loginWithPinData error : ", e)
		} finally {
			setIsLoading(false)
		}
	};

	const checkPin = async () => {
		if (mode === ChangePinMode.CREATE) {
			if (confirm === '') {
				setConfirm(pin);
				setPin('');
				setTitle('รหัส Pin ใหม่');
			} else if (confirm !== pin) {
				setConfirm('');
				setPin('');
				setTitle('รหัส Pin ไม่ตรงกัน ลองใหม่อีกครั้ง');
			} else {
				await createUserPin({ pin, pin_confirmation: confirm }, (res, err) => {
					if (res?.data?.status) {
						Actions.replace('VerifyPin', { tab: Tab.HOME });
					} else {
						showError("เกิดข้อผิดพลาด")
					}
				});
			}
		} else {
			loginWithPinData();
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
						color={Constant.color.violet}
						size={30}
					/>
				</TouchableOpacity>
			);
		}

		return (
			<TouchableOpacity onPress={onAddPin} style={styles.numberPad}>
				<Text style={{ color: Constant.color.violet, fontSize: 30 }}>{item}</Text>
			</TouchableOpacity>
		);
	};

	return (
		<AppView isLoading={isLoading} style={{ flex: 1, backgroundColor: "#eee" }}>
			<Header
				leftComponent={
					<Icon
						name="chevron-thin-left"
						type="entypo"
						color={Constant.color.violet}
						iconStyle={{ backgroundColor: '#fff' }}
						onPress={() => Actions.pop()}
					/>
				}
				centerComponent={{
					text: 'เปลี่ยนรหัส PIN',
					style: { color: Constant.color.violet },
				}}
				innerContainerStyles={{ backgroundColor: '#fff' }}
				containerStyle={{
					backgroundColor: '#fff',
					borderBottomColor: '#fff',
				}}
			/>
			<View style={{ alignItems: 'center', flex: 1, paddingTop: 20 }}>
				<Text style={{ color: 'black', marginVertical: 15 }}>{title}</Text>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						marginVertical: 20,
					}}>
					<Dot check={pin.length >= 1} />
					<Dot check={pin.length >= 2} />
					<Dot check={pin.length >= 3} />
					<Dot check={pin.length >= 4} />
					<Dot check={pin.length >= 5} />
					<Dot check={pin.length >= 6} />
				</View>
			</View>
			<View style={styles.keyboardContainer}>
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
			</View>
		</AppView>
	);
};

ForgotPin.defaultProps = {
	mode: ChangePinMode.CREATE,
};

export default useNavigator(ForgotPin);

const styles = StyleSheet.create({
	numberPad: {
		width: width * 0.3,
		height: width * 0.16,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 10,
	},
	emptyButton: {
		width: width * 0.3,
		height: width * 0.16,
		margin: 10,
	},
	keyboardContainer: {
		backgroundColor: 'white',
	},
});
