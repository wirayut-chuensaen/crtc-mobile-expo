import React, { useEffect, useState, useContext } from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	TextInput,
	View,
	Image,
	Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon, Button, Dialog } from 'react-native-elements';
import Constant from '../utils/Constant';
// import {
// 	AccessToken,
// 	GraphRequest,
// 	GraphRequestManager,
// 	LoginManager,
// 	Settings,
// } from 'react-native-fbsdk-next';
// import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons"
import Toast from 'react-native-toast-message'
// import firebase from '@react-native-firebase/app';
import { authen, checkSocialVerify } from "../service/Services"
import { LinearGradient } from "expo-linear-gradient"
// import {
// 	appleAuth,
// 	AppleButton,
// } from '@invertase/react-native-apple-authentication';
import * as Application from 'expo-application';
import useNavigator from '../utils/useNavigator';
import { AppView, AppButton, Padding } from '../component';
import { AppContext } from '../context';

const Authen = ({ Actions }) => {
	const [isLoading, setIsLoading] = useState(false)
	const [fcmToken, setFcmToken] = useState("")
	const [dialog, setDialog] = useState({})
	const [userInfo, setUserInfo] = useState({})
	const [username, setUsername] = useState(__DEV__ ? "eaku" : "")  //eaku
	const [password, setPassword] = useState(__DEV__ ? "6548" : "")  //6548
	const { setToken, setMemId, setUserPin } = useContext(AppContext)

	useEffect(() => {
		// initGoogle();
		// Settings.initializeSDK();
	}, [])

	// const initGoogle = () => {
	// 	// initNotification();
	// 	GoogleSignin.configure({
	// 		scopes: ['email'], // what API you want to access
	// 		iosClientId:
	// 			'831856074930-24vd64gj35dlu68229qrfbgfhn4ohc3c.apps.googleusercontent.com',
	// 		webClientId:
	// 			'831856074930-qef2s73g5v4k5jt8tnhte5570bp9n1n8.apps.googleusercontent.com',
	// 		offlineAccess: true,
	// 		// hostedDomain: '',
	// 		// forceConsentPrompt: true,
	// 		// accountName: ''
	// 	});
	// }

	const handleCancel = () => {
		setDialog({
			...dialog,
			status: false
		})
	};

	const pressLogin = async () => {
		Keyboard.dismiss()
		try {
			let body = {};
			body.device_token = fcmToken
			body.device_type = Platform.OS === 'ios' ? 'ios' : 'android';
			body.username = username;
			body.password = password;

			setIsLoading(true)
			await authen(body, async (res, done) => {
				// console.log("authen res : ", res)
				if (done) {
					if (res?.data?.status) {
						var userInfo = res?.data?.data;
						const userPin = res?.data?.user_pin;

						await AsyncStorage.multiSet([
							['token', JSON.stringify(userInfo?.token)],
							['mem_id', userInfo?.mem_id],
						]);
						setToken(JSON.stringify(userInfo?.token))
						setMemId(userInfo?.mem_id)
						if (userPin?.pin && userPin?.pin !== null) {
							await AsyncStorage.setItem('pin', `${userPin?.pin}`);
							setUserPin(userPin?.pin)
						}
						Actions.replace('Launcher');
					} else {
						if (res?.data?.message) {
							await AsyncStorage.clear();
							setDialog({
								...dialog,
								title: null,
								message: res?.data?.message,
								status: true,
							})
							setIsLoading(false)
						} else {
							Toast.show({
								type: 'error',
								text1: 'เข้าสู่ระบบล้มเหลว',
							});
						}
					}
				} else {
					setDialog({
						...dialog,
						title: null,
						message: 'เข้าสู่ระบบล้มเหลว',
						status: true,
					})
				}
				setIsLoading(false)
			});
		} catch (e) {
			console.log("Authen.js pressLogin error : ", e)
			setIsLoading(false)
		}
	};

	// notification
	// const initNotification = async () => {
	// 	await setPermission();
	// 	const fcmToken = await firebase.messaging().getToken();
	// 	setFcmToken(fcmToken)
	// };

	// const setPermission = async () => {
	// 	try {
	// 		const enabled = await firebase.messaging().hasPermission();
	// 		if (!enabled) {
	// 			await firebase.messaging().requestPermission();
	// 		}
	// 	} catch (error) {
	// 		console.log('Authen.js setPermission error : ', error);
	// 	}
	// };

	// login facebook
	// const logoutWithFacebook = () => {
	// 	LoginManager.logOut();
	// 	setUserInfo({})
	// };

	// const loginWithFacebook = () => {
	// 	// Attempt a login using the Facebook login dialog asking for default permissions.
	// 	LoginManager.logInWithPermissions(['email']).then(
	// 		login => {
	// 			if (login?.isCancelled) {
	// 				console.log('Login Facebook cancelled');
	// 			} else {
	// 				AccessToken.getCurrentAccessToken().then(data => {
	// 					const accessToken = data.accessToken.toString();
	// 					getInfoFromToken(accessToken);
	// 				});
	// 			}
	// 		},
	// 		error => {
	// 			console.log('Login fail with error: ' + error);
	// 			alert(error);
	// 		},
	// 	);
	// };

	// const getInfoFromToken = token => {
	// 	const PROFILE_REQUEST_PARAMS = {
	// 		fields: {
	// 			string: 'id,name,first_name,last_name,email',
	// 		},
	// 	};
	// 	const profileRequest = new GraphRequest(
	// 		'/me',
	// 		{ token, parameters: PROFILE_REQUEST_PARAMS },
	// 		(error, user) => {
	// 			if (error) {
	// 				console.log('login info has error: ' + error);
	// 				alert(error);
	// 			} else {
	// 				setUserInfo(user)
	// 				var body = {};
	// 				body.device_type = Platform.OS === 'ios' ? 'ios' : 'android';
	// 				body.device_token = fcmToken
	// 				body.social_type = 'facebook';
	// 				body.social_id = user?.id;
	// 				body.social_token = token;
	// 				body.name = user?.name;
	// 				body.email = user?.email;
	// 				pressLoginSocial(body);
	// 			}
	// 		},
	// 	);
	// 	new GraphRequestManager().addRequest(profileRequest).start();
	// };

	// google
	// const googleSignIn = async () => {
	// 	try {
	// 		await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
	// 		const userInfo = await GoogleSignin.signIn();

	// 		var body = {};
	// 		body.device_type = Platform.OS === 'ios' ? 'ios' : 'android';
	// 		body.device_token = fcmToken
	// 		body.social_type = 'google';
	// 		body.social_id = userInfo?.user.id;
	// 		body.social_token = userInfo?.user.id;
	// 		body.name = userInfo?.user.name;
	// 		body.email = userInfo?.user.email;

	// 		pressLoginSocial(body);
	// 	} catch (error) {
	// 		alert(error.code);
	// 		console.log("Authen.js googleSignIn error : ", error);
	// 		if (error.code === statusCodes.SIGN_IN_CANCELLED) {
	// 			// user cancelled the login flow
	// 			// alert('Cancel');
	// 		} else if (error.code === statusCodes.IN_PROGRESS) {
	// 			alert('Signin in progress' + error);
	// 			// operation (f.e. sign in) is in progress already
	// 		} else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
	// 			alert('PLAY_SERVICES_NOT_AVAILABLE');
	// 			// play services not available or outdated
	// 		} else {
	// 			// some other error happened
	// 		}
	// 		setIsLoading(false)
	// 	}
	// };

	const pressLoginSocial = async (body) => {
		try {
			setIsLoading(true)
			await checkSocialVerify(body, async (res, err) => {
				// console.log("checkSocialVerify res : ", res);
				try {
					if (res?.data?.status == true && res?.data?.is_verify == true) {
						const userInfo = res?.data?.data;
						const userPin = res?.data?.user_pin;
						await AsyncStorage.setItem('token', JSON.stringify(userInfo?.token));
						if (userPin?.pin && userPin?.pin !== null) {
							await AsyncStorage.setItem('pin', `${userPin?.pin}`);
						}
						setTimeout(() => {
							Actions.replace('Launcher');
						}, 1000);
					} else {
						Actions.navigate('Verify', { body });
					}
				} catch (e) {
					setDialog({
						...dialog,
						title: null,
						message: err?.response?.data?.message,
						status: true,
					})
					setIsLoading(false)
				}
			});
		} catch (e) {
			console.log("Authen.js pressSocialLogin error : ", e)
			setIsLoading(false)
		}
	};

	// apple
	// const onAppleButtonPress = () => {
	// 	// performs login request
	// 	appleAuth
	// 		.performRequest({
	// 			requestedOperation: appleAuth.Operation.LOGIN,
	// 			requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
	// 		})
	// 		.then(appleAuthRequestResponse => {
	// 			let { identityToken, email, fullName } = appleAuthRequestResponse;
	// 			var body = {};
	// 			body.device_type = Platform.OS === 'ios' ? 'ios' : 'android';
	// 			body.device_token = fcmToken
	// 			body.social_type = 'apple';
	// 			body.social_id = email;
	// 			body.social_token = identityToken;
	// 			body.name = fullName?.givenName + ' ' + fullName?.familyName;
	// 			body.email = email;

	// 			pressLoginSocial(body);
	// 		});
	// };

	//     // get current authentication state for user
	//     // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
	//     const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
	//
	//     // use credentialState response to ensure the user is authenticated
	//     if (credentialState === appleAuth.State.AUTHORIZED) {
	//         // user is authenticated
	//     }
	//
	//     var body = {};
	//     body.device_type = Platform.OS === 'ios' ? "ios" : "android";
	//     body.device_token = fcmToken
	//     body.social_type = "apple";
	//     body.social_id = userInfo?.user?.id;
	//     body.social_token = userInfo?.user?.id;
	//     body.name = userInfo?.user?.name;
	//     body.email = userInfo?.user?.email;
	//
	//     pressLoginSocial(body)
	// }

	// const isLogin = userInfo?.name ? true : false;
	// const buttonText = isLogin ? 'Logout With Facebook' : 'Login From Facebook';
	// const onPressButton = isLogin
	//   ? logoutWithFacebook()
	//   : loginWithFacebook();

	return (
		<AppView isLoading={isLoading} style={styles.container}>
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
				<View style={{ alignItems: "center" }}>
					<Image
						source={require('../../assets/logo.png')}
						resizeMode="contain"
						style={{ height: 200, marginBottom: 10 }}
					/>
					{/*<Text style={styles.textSubtitlr}>Please use the login information{'\n'}provided by Hexa Ceram</Text>*/}
					{/*<Text style={styles.textSubtitlr}>{fcmToken}</Text>*/}
				</View>

				<View style={styles.SectionStyle}>
					<Icon name="person" color={Constant.color.white} />
					<TextInput
						style={styles.Input}
						placeholder="Username"
						underlineColorAndroid="transparent"
						value={username}
						onChangeText={value => setUsername(value)}
					/>
				</View>

				<View style={styles.SectionStyle}>
					<Icon name="lock" color={Constant.color.white} />
					<TextInput
						secureTextEntry
						style={styles.Input}
						placeholder="Password"
						underlineColorAndroid="transparent"
						value={password}
						onChangeText={value => setPassword(value)}
					/>
				</View>

				<Padding left={10} right={10}>
					<AppButton
						onPress={pressLogin}
						text="เข้าสู่ระบบ"
						textStyle={{
							color: Constant.color.white,
							fontSize: 14
						}}
						style={{
							backgroundColor: Constant?.color?.blueDark,
							borderRadius: 6,
							height: 45,
							paddingVertical: 0,
							marginBottom: 10
						}} />

					{/* <View style={{ flexDirection: 'row' }}>
            <Text style={styles.requestAccount} onPress={()=>{Actions.navigate('RequestLogin')}}>Account? Request Login</Text>
            <Text style={styles.forgotPassword} >ลืมรหัสผ่าน?</Text>
          </View> */}

					{/* Social sign in section */}
					{/* <AppButton
							onPress={loginWithFacebook}
							iconPosition='floatLeft'
							icon={<MaterialCommunityIcons
								name="facebook"
								size={25}
								style={{ marginTop: 1 }}
								color={Constant.color.white}
							/>}
							text="Sign in with Facebook"
							textStyle={{
								color: Constant.color.white,
								fontSize: 14
							}}
							style={{
								backgroundColor: '#1878F2',
								borderRadius: 6,
								height: 45,
								paddingVertical: 0,
								marginBottom: 10
							}} />

						<AppButton
							onPress={googleSignIn}
							iconPosition='floatLeft'
							icon={<Image source={require('../../assets/ic_google.png')} style={{ width: 20, height: 20, marginTop: 4 }} resizeMode='contain' />}
							text="Sign in with Google"
							textStyle={{
								color: Constant.color.dark,
								fontSize: 14
							}}
							style={{
								backgroundColor: 'white',
								borderRadius: 6,
								height: 45,
								paddingVertical: 0,
								marginBottom: 10
							}} />

						{
							Platform.OS === 'ios' && (
								<AppButton
									onPress={onAppleButtonPress}
									iconPosition='floatLeft'
									icon={<FontAwesome name="apple" color={Constant.color.dark} size={25} />}
									text="Sign in with Apple"
									textStyle={{
										color: Constant.color.dark,
										fontSize: 14
									}}
									style={{
										backgroundColor: 'white',
										borderRadius: 6,
										height: 45,
										paddingVertical: 0,
										marginBottom: 10
									}} />
							)
						} */}
				</Padding>

				<Text style={styles.footer}>
					Chiangrai Teacher Saving and Credit Cooperative Ltd.
					{'\n'} Version {Application?.nativeApplicationVersion}
				</Text>
			</LinearGradient>
		</AppView>
	);
}

export default useNavigator(Authen)

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
		color: Constant.color.white,
		margin: 10,
		marginTop: 50,
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
		width: '100%',
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
});
