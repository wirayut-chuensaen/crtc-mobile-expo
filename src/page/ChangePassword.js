import React, { useState, useCallback } from 'react';
import {
	StyleSheet,
	Dimensions,
	Text,
	TextInput,
	View,
	Image,
	TouchableOpacity,
	BackHandler,
	Keyboard,
} from 'react-native';
import { Icon, Header, Button, Dialog } from 'react-native-elements';
import Constant from '../utils/Constant';
import { changePassword } from "../service/Services"
import { LinearGradient } from 'expo-linear-gradient';
import { AppView } from '../component';
import useNavigator from '../utils/useNavigator';
import * as ExpoUpdates from "expo-updates"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const Height = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const ChangePassword = ({ Actions }) => {
	const [dialog, setDialog] = useState({})
	const [isLoading, setIsLoading] = useState(false)
	const [visibleOldPassword, setVisibleOldPassword] = useState(false)
	const [visibleNewPassword, setVisibleNewPassword] = useState(false)
	const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false)
	const [oldPassword, setOldPassword] = useState("")
	const [newPassword, setNewPassword] = useState("")
	const [confirmNewPassword, setConfirmNewPassword] = useState("")
	const [isDone, setIsDone] = useState(false)

	useFocusEffect(
		useCallback(() => {
			const backHandler = BackHandler.addEventListener(
				'hardwareBackPress',
				async () => {
					if (isDone) {
						await onLogout()
					}
					return true
				},
			);
			return () => backHandler.remove();
		}, [])
	)

	const handleCancel = async () => {
		if (!isDone) {
			setDialog({
				...dialog,
				status: false,
			})
		} else {
			await onLogout()
		}
	};

	const pressChangePassword = async () => {
		Keyboard.dismiss()
		try {
			setIsLoading(true)
			var body = {};
			body.old_password = oldPassword
			body.password = newPassword
			body.password_confirmation = confirmNewPassword
			await changePassword(body, (res, done) => {
				console.log("changePassword res : ", res)
				if (done && res?.data) {
					setIsDone(true)
					setDialog({
						...dialog,
						title: null,
						message: res?.data?.message,
						status: true,
					})
				} else {
					setIsDone(false)
					setDialog({
						...dialog,
						title: null,
						message: res?.response?.data?.message,
						status: true,
					})
				}
			});
		} catch (e) {
			console.log("ChangePassword.js pressLogin error : ", e)
		} finally {
			setIsLoading(false)
		}
	};

	const toggleVisible = (key) => {
		return () => {
			if (key === 'old_password') {
				setVisibleOldPassword(!visibleOldPassword)
			}
			if (key === 'new_password') {
				setVisibleNewPassword(!visibleNewPassword)
			}
			if (key === 'confirm_password') {
				setVisibleConfirmPassword(!visibleConfirmPassword)
			}
		};
	}

	const onLogout = async () => {
		setIsLoading(true)
		await AsyncStorage.clear().then(() => setIsLoading(false))
		await ExpoUpdates.reloadAsync()
	}

	return (
		<AppView isLoading={isLoading} style={styles.container}>
			<Dialog isVisible={dialog?.status ? dialog?.status : false} onBackdropPress={handleCancel}>
				<Dialog.Title title="แจ้งเตือน" />
				<Text>{dialog?.message}</Text>
				<Dialog.Actions>
					<Dialog.Button title="ตกลง" onPress={handleCancel} />
				</Dialog.Actions>
			</Dialog>

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
				centerComponent={{ text: "เปลี่ยนรหัสผ่าน CRTC", style: { color: '#fff' } }}
				innerContainerStyles={{ backgroundColor: Constant?.color?.violet }}
				containerStyle={{
					backgroundColor: Constant?.color?.violet,
					borderBottomColor: Constant?.color?.violet,
				}}
			/>
			<LinearGradient
				locations={[0, 0.4]}
				colors={[Constant?.color?.violetlight, Constant?.color?.darkPurple]}
				start={{ x: 0, y: 0 }}
				end={{ x: 0, y: 1 }}
				style={styles.linearGradient}>

				<View style={{ alignItems: "center" }}>
					<Image
						source={require('../../assets/logo.png')}
						resizeMode="contain"
						style={{ height: 200, marginBottom: 20 }}
					/>
				</View>

				<View style={styles.SectionStyle}>
					<Icon name="lock" color={Constant?.color?.white} />
					<TextInput
						secureTextEntry={visibleOldPassword}
						style={styles.Input}
						placeholder="รหัสผ่านเก่า"
						underlineColorAndroid="transparent"
						onChangeText={(old_password) => setOldPassword(old_password)}
					/>
					<TouchableOpacity onPress={() => toggleVisible('old_password')}>
						<Icon
							type="material-community"
							name={visibleOldPassword ? 'eye-off' : 'eye'}
							color={Constant?.color?.white}
						/>
					</TouchableOpacity>
				</View>

				<View style={styles.SectionStyle}>
					<Icon name="lock" color={Constant?.color?.white} />
					<TextInput
						secureTextEntry={visibleNewPassword}
						style={styles.Input}
						placeholder="รหัสผ่านใหม่"
						underlineColorAndroid="transparent"
						onChangeText={(password) => setNewPassword(password)}
					/>
					<TouchableOpacity onPress={() => toggleVisible('new_password')}>
						<Icon
							type="material-community"
							name={visibleOldPassword ? 'eye-off' : 'eye'}
							color={Constant?.color?.white}
						/>
					</TouchableOpacity>
				</View>

				<View style={styles.SectionStyle}>
					<Icon name="lock" color={Constant.color.white} />
					<TextInput
						secureTextEntry={visibleConfirmPassword}
						style={styles.Input}
						placeholder="รหัสผ่านใหม่ ยืนยัน"
						underlineColorAndroid="transparent"
						onChangeText={(password_confirmation) => setConfirmNewPassword(password_confirmation)}
					/>
					<TouchableOpacity onPress={() => toggleVisible('confirm_password')}>
						<Icon
							type="material-community"
							name={visibleConfirmPassword ? 'eye-off' : 'eye'}
							color={Constant?.color?.white}
						/>
					</TouchableOpacity>
				</View>

				<View style={styles.wapperCenter}>
					<Button
						title="ยืนยันเปลี่ยนรหัสผ่าน"
						titleStyle={styles.texts}
						buttonStyle={styles.Button}
						onPress={pressChangePassword}
					/>
				</View>
				<View style={{ flexDirection: 'row' }}>
					{/*<Text style={styles.requestAccount} onPress={()=>{this.props.navigation.navigate('RequestLogin')}}>Account? Request Login</Text>*/}
					{/*<Text style={styles.forgotPassword} >ลืมรหัสผ่าน?</Text>*/}
				</View>

				<Text style={styles.footer}>
					กรุณายืนยันการเปลี่ยนรหัสผ่าน {'\n'}
					โดยระบุรหัสผ่านใหม่และรหัสผ่านของระบบ E-coop
				</Text>
			</LinearGradient>
		</AppView>
	);
}

export default useNavigator(ChangePassword)

const styles = StyleSheet.create({
	linearGradient: {
		flex: 1,
		justifyContent: 'center',
		paddingLeft: 15,
		paddingRight: 15,
	},
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		backgroundColor: Constant.color.green,
	},
	wapperCenter: {
		alignItems: 'center',
	},
	ImageStyle: {
		padding: 10,
		margin: 5,
		height: 25,
		width: 25,
		resizeMode: 'stretch',
		alignItems: 'center',
	},
	SectionStyle: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		// backgroundColor: '#fff',
		borderBottomWidth: 1,
		borderBottomColor: Constant.color.white,
		height: 40,
		// borderRadius: 5 ,
		marginLeft: 15,
		marginRight: 15,
		marginBottom: 15,
	},
	Input: {
		paddingLeft: 10,
		flex: 1,
		color: Constant.color.white,
	},
	requestAccount: {
		flex: 1,
		flexDirection: 'column',
		textAlign: 'left',
		color: Constant.color.gray,
		margin: 10,
	},
	forgotPassword: {
		flex: 1,
		flexDirection: 'column',
		textAlign: 'right',
		color: Constant.color.gray,
		margin: 10,
	},
	footer: {
		textAlign: 'center',
		color: Constant.color.dark,
		margin: 10,
	},
	Button: {
		flexDirection: 'row',
		justifyContent: 'center',
		width: deviceWidth - 50,
		alignItems: 'center',
		marginBottom: 10,
		borderRadius: 5,
		height: 40,
		backgroundColor: Constant.color.blueDark,
		// color:Constant.color.white
	},
});
