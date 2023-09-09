import React, { useEffect, useState } from 'react';
import {
	BackHandler,
	StyleSheet,
	View,
} from 'react-native';
import { Header, CheckBox } from 'react-native-elements';
import Constant from '../utils/Constant';
import { LinearGradient } from 'expo-linear-gradient';
import useNavigator from '../utils/useNavigator';
import { AppButton, AppView, SizedBox } from '../component';
import { confirmCondition, getCondition } from "../service/Services"
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useDisableBackButton from '../utils/useDisableBackButton';
import * as ExpoUpdates from "expo-updates"
import showError from '../utils/showError';

const TermAndCondition = ({ navigation, Actions, tab }) => {
	const [condition, setCondition] = useState("")
	const [agree, setAgree] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		init()
	}, [])

	useEffect(() => {
		const backAction = useDisableBackButton(false);
		BackHandler.addEventListener('hardwareBackPress', backAction);
		return () =>
			BackHandler.removeEventListener('hardwareBackPress', backAction);
	}, []);

	const init = async () => {
		try {
			setIsLoading(true)
			await getCondition((res, done) => {
				if (done && res?.data?.status) {
					setCondition(res.data.data.condition)
				} else {
					showError(res.data.message);
				}
			})
			setIsLoading(false)
		} catch (e) {
			console.log("TermsAndCondition.js init error : ", e)
			setIsLoading(false)
		}
	}

	const onReject = async () => {
		await AsyncStorage.clear();
		await ExpoUpdates.reloadAsync();
	}

	const onAccept = async () => {
		try {
			setIsLoading(true)
			await confirmCondition((res, done) => {
				// console.log("confirmCondition res : ", res)
				if (done && res?.data?.status) {
					Actions.replace('Launcher', { tab })
				} else {
					showError(res?.data?.message || "เกิดข้อผิดพลาด");
				}
			})
			setIsLoading(false)
		} catch (e) {
			console.log("TermsAndCondition.js onAccept error : ", e)
			setIsLoading(false)
		}
	}

	return (
		<AppView isLoading={isLoading}>
			<LinearGradient
				locations={[0, 0.4]}
				colors={[Constant?.color?.violetlight, Constant?.color?.darkPurple]}
				start={{ x: 0, y: 0 }}
				end={{ x: 0, y: 1 }}
				style={{ ...StyleSheet.absoluteFillObject }}>
				<Header
					// leftComponent={
					//     <Icon
					//         name="chevron-thin-left"
					//         type="entypo"
					//         color="#fff"
					//         iconStyle={{ backgroundColor: Constant.color.violet }}
					//         onPress={navigation.goBack}
					//     />
					// }
					centerComponent={{
						text: "ข้อตกลงและเงื่อนไขการใช้บริการ",
						style: { color: '#fff' },
					}}
					innerContainerStyles={{ backgroundColor: Constant?.color?.violet }}
					containerStyle={{
						backgroundColor: Constant?.color?.violet,
						borderBottomColor: Constant?.color?.violet,
					}}
				/>
				<View style={styles.body}>
					<WebView
						source={{
							html: `
                    			<!DOCTYPE html>
								<html lang="en">
									<head>
    									<meta charset="UTF-8">
    									<meta http-equiv="X-UA-Compatible" content="IE=edge">
    									<meta name="viewport" content="width=device-width, initial-scale=1.0">
									</head>
									<body>
    									${condition}
									</body>
								</html>
                    		` }}
						style={styles.htmlContent}
						domStorageEnabled={false}
						javaScriptEnabled={false}
						pagingEnabled={false}
						scrollEnabled={true}
						cacheEnabled={true}
						geolocationEnabled={false}
						nestedScrollEnabled={false}
						pullToRefreshEnabled={false}
						thirdPartyCookiesEnabled={false}
					/>
					<View style={styles.checkContainer}>
						<CheckBox
							onPress={() => setAgree(!agree)}
							checked={agree}
							containerStyle={{ borderWidth: 0, backgroundColor: "white" }}
							title="ข้าพเจ้ายอมรับข้อตกลง" />
					</View>
					<View style={styles.buttonGroup}>
						<View style={{ flex: 1 }}>
							<AppButton
								text={`ไม่ยอมรับ`}
								style={{ backgroundColor: 'black' }}
								onPress={onReject}
							/>
						</View>
						<SizedBox width={30} />
						<View style={{ flex: 1 }}>
							<AppButton
								disabled={!agree}
								text={`ยอมรับ`}
								onPress={onAccept}
							/>
						</View>
					</View>
				</View>
			</LinearGradient>
		</AppView>
	);
};

export default useNavigator(TermAndCondition);

const styles = StyleSheet.create({
	body: {
		backgroundColor: 'white',
		flex: 1,
		borderRadius: 5,
		margin: 15,
		padding: 10,
	},
	buttonGroup: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	checkContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginVertical: 20,
	},
	htmlContent: {
		backgroundColor: '#eee'
	},
});
