import React, { useState } from 'react';
import {
	StyleSheet,
	Dimensions,
	Text,
	TextInput,
	View,
	Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon, Header, Dialog, Button } from 'react-native-elements';
import Constant from "../utils/Constant"
import { socialVerify } from "./../service/Services"
import { LinearGradient } from 'expo-linear-gradient';
import useNavigator from '../utils/useNavigator';
import AppLoading from "../component/AppLoading"

const Height = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const Verify = ({ navigation, route, Actions, body }) => {
	const [select, setSelect] = useState(true)
	const [isLoading, setIsLoading] = useState(false)
	const [fcmToken, setFcmToken] = useState("")
	const [title, setTitle] = useState("ยืนยันตัวตนกับระบบ CRTC")
	const [dialog, setDialog] = useState({})
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	const handleCancel = () => {
		setDialog({
			...dialog,
			status: false
		})
	};

	const pressLogin = async () => {
		let body = route.params.body;
		body.username = username;
		body.password = password;
		setIsLoading(true)
		await socialVerify(body, async (res, err) => {
			try {
				var userInfo = res?.data?.data;
				await AsyncStorage.setItem('token', JSON.stringify(userInfo?.token));
				Actions.replace('Launcher');
				setDialog({
					...dialog,
					title: null,
					message: res?.data?.message,
					status: false
				})
				setIsLoading(false)
			} catch (e) {
				setDialog({
					...dialog,
					title: null,
					message: err?.response?.data?.message,
					status: false
				})
				setIsLoading(false)
			}
		});
	};

	return (
		<View style={styles.container}>
			<Header
				leftComponent={
					<Icon
						name="chevron-thin-left"
						type="entypo"
						color="#fff"
						iconStyle={{ backgroundColor: Constant.color.violet }}
						onPress={() => Actions.pop()}
					/>
				}
				centerComponent={{ text: title, style: { color: '#fff' } }}
				innerContainerStyles={{ backgroundColor: Constant.color.violet }}
				containerStyle={{
					backgroundColor: Constant.color.violet,
					borderBottomColor: Constant.color.violet,
				}}
			/>
			{isLoading && <AppLoading />}

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
				style={styles.linearGradient}>

				<View style={styles.wapperCenter}>
					<Image
						source={require('../../assets/logo.png')}
						resizeMode="contain"
						style={{ height: 200, marginBottom: 20 }}
					/>
					{/*<Text style={styles.textSubtitlr}>Please use the login information{'\n'}provided by Hexa Ceram</Text>*/}
					{/*<Text style={styles.textSubtitlr}>{fcmToken}</Text>*/}
				</View>

				<View style={styles.SectionStyle}>
					<Icon name="person" color={Constant.color.white} />
					<TextInput
						style={styles.Input}
						placeholder="ชื่อผู้ใช้งาน"
						underlineColorAndroid="transparent"
						onChangeText={val => setUsername(val)}
					/>
				</View>

				<View style={styles.SectionStyle}>
					<Icon name="lock" color={Constant.color.white} />
					<TextInput
						secureTextEntry
						style={styles.Input}
						placeholder="รหัสผ่าน"
						underlineColorAndroid="transparent"
						onChangeText={val => setPassword(val)}
					/>
				</View>

				<View style={styles.wapperCenter}>
					<Button
						title="ยืนยันตัวตน"
						titleStyle={styles.texts}
						buttonStyle={styles.Button}
						onPress={pressLogin}
					/>
				</View>
				<View style={{ flexDirection: 'row' }}>
					{/*<Text style={styles.requestAccount} onPress={()=>{Actions.push('RequestLogin')}}>Account? Request Login</Text>*/}
					{/*<Text style={styles.forgotPassword} >ลืมรหัสผ่าน?</Text>*/}
				</View>

				<Text style={styles.footer}>
					กรุณายืนยันตัวตน {'\n'}โดยระบุชื่อผู้ใช้และรหัสผ่านของระบบ E-coop
				</Text>
			</LinearGradient>
		</View>
	);
}

export default useNavigator(Verify)

const styles = StyleSheet.create({
	content: {
		height: 0,
		// backgroundColor:Constant.statusbar.uploadBackgroundColor,
	},
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
	Register: {
		alignItems: 'center',
		color: Constant.color.gray,
		marginBottom: 10,
		borderBottomWidth: 1,
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
	textSubtitlr: {
		textAlign: 'center',
	},
	ButtonF: {
		flexDirection: 'row',
		justifyContent: 'center',
		width: deviceWidth - 55,
		alignItems: 'center',
		padding: 10,
		marginBottom: 10,
		borderRadius: 4,
		height: 40,
		backgroundColor: Constant.color.darkBlue,
	},
	SectionStyleF: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		color: Constant.color.white,
	},
	ButtonG: {
		flexDirection: 'row',
		justifyContent: 'center',
		width: deviceWidth - 50,
		alignItems: 'center',
		height: 48,
		marginBottom: 10,
		// color:Constant.color.white
	},
});
