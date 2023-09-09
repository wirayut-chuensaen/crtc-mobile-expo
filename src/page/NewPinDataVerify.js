import React, { useState, useCallback } from 'react';
import {
	Text,
	View,
	StyleSheet,
	Alert,
	TextInput,
	TouchableOpacity,
} from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { clearPin, verifyNewPinData } from "../service/Services"
import Constant from '../utils/Constant';
import useNavigator from '../utils/useNavigator';
import moment from 'moment';
import { AppView, AppDatePicker } from '../component';
import showError from '../utils/showError';
import Toast from 'react-native-toast-message';

const NewPinDataVerify = ({ navigation, Actions }) => {
	const [id, setId] = useState('');
	const [birthday, setBirthday] = useState(null);
	const [memberId, setMemberId] = useState('');
	const [isLoading, setIsLoading] = useState(false)

	const onSubmit = useCallback(async () => {
		if (id.length !== 13 || birthday === null || memberId.length !== 6) {
			return Alert.alert('', 'กรุณากรอกข้อมูลให้ครบถ้วน');
		}
		try {
			setIsLoading(true)
			await verifyNewPinData(
				{
					citizen_id: id,
					birth_date: moment(birthday).format('YYYY-MM-DD'),
					mem_id: memberId,
				},
				async (res, done) => {
					if (done && res?.data?.status) {
						removePin();
					} else {
						Alert.alert('', 'กรุณากรอกข้อมูลให้ถูกต้อง');
					}
				},
			);
		} catch (e) {
			console.log("NewPinDataVerify.js onSubmit error : ", e)
			setIsLoading(false)
		} finally {
			setIsLoading(false)
		}
	}, [id, birthday, memberId]);

	const removePin = async () => {
		try {
			setIsLoading(true)
			await clearPin((res, done) => {
				if (done && res?.data?.status) {
					Toast.show({
						type: "success",
						text1: "ลบ Pin สำเร็จ",
					})
					Actions.navigate('ForgotPin');
				} else {
					showError('', res?.data?.message);
				}
			});
		} catch (e) {
			console.log("NewPinDataVerify removePin error : ", e)
		} finally {
			setIsLoading(false)
		}
	}

	const checkMemberId = text => {
		if (text.length > 0) {
			const isAllowFirstChar =
				text[0] === 'ส' || [...new Array(10).keys()].indexOf(+text[0]) !== -1;

			if (isAllowFirstChar) {
				const match = text.slice(1, text.length).match(/[0-9]/g);
				const withNumber =
					text.length > 1 ? (match !== null ? match.join('') : '') : '';
				setMemberId(text[0] + withNumber);
			}
		} else {
			setMemberId('');
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
					text: 'ข้อมูลยืนยันตัวตน',
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
							placeholder="เลขประจำตัวประชาชน"
							value={id}
							onChangeText={setId}
							keyboardType="number-pad"
							placeholderTextColor="#777"
							maxLength={13}
							style={styles.textInput}
						/>
					</View>
					<View style={{ height: 20 }} />
					<AppDatePicker onChange={setBirthday}>
						<View style={styles.otpInputContainer}>
							<TextInput
								placeholder="วัน เดือน ปีเกิด"
								disabled={true}
								value={
									birthday == null
										? ''
										: moment(birthday).format('DD MM YYYY')
								}
								editable={false}
								placeholderTextColor="#777"
								style={styles.textInput}
							/>
							<View style={{ paddingHorizontal: 10 }}>
								<Icon
									type="material-community"
									name="calendar-check"
									color="#777"
									size={30}
								/>
							</View>
						</View>
					</AppDatePicker>
					<View style={{ height: 20 }} />
					<View style={styles.otpInputContainer}>
						<TextInput
							placeholder="รหัสสมาชิก"
							value={memberId}
							onChangeText={checkMemberId}
							placeholderTextColor="#777"
							maxLength={6}
							style={styles.textInput}
						/>
					</View>
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

export default useNavigator(NewPinDataVerify);

const styles = StyleSheet.create({
	submitContainer: {
		backgroundColor: Constant.color.violet,
		height: 50,
		borderRadius: 10,
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
});
