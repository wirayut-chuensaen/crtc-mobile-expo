import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, Dimensions, StatusBar, Platform, LogBox } from "react-native";
import ContextProvider from "./src/context/state"
import Main from "./src/Main";
import * as ExpoUpdates from "expo-updates";
import { LinearGradient } from 'expo-linear-gradient';
import Constant from "./src/utils/Constant"
import { LinearProgress } from "react-native-elements";
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';

StatusBar.setBarStyle('light-content');
Platform.OS === 'android' && StatusBar.setBackgroundColor('transparent');
StatusBar.setTranslucent(true);

LogBox.ignoreAllLogs(true)

const screenWidth = Dimensions.get("window").width

export default App = () => {
	const [isCheckingUpdate, setIsCheckingUpdate] = useState(true)
	const [updateProgress, setUpdateProgress] = useState(0)
	const [updateStatusText, setUpdateStatusText] = useState("กำลังตรวจสอบการอัพเดต...")

	useEffect(() => {
		initApp()
		initTrackingTransparency()
	}, [])

	const initApp = async () => {
		try {
			increateUpdateProgress()
			if (!__DEV__) {
				const update = await ExpoUpdates.checkForUpdateAsync();
				if (update.isAvailable) {
					setUpdateProgress(1)
					setUpdateStatusText("พบการอัพเดต, กำลังเริ่มแอปใหม่")
					setTimeout(async () => {
						await ExpoUpdates.fetchUpdateAsync().then(async () => {
							await ExpoUpdates.reloadAsync();
						});
					}, 1000)
				}
			}
			setTimeout(() => {
				setIsCheckingUpdate(false)
			}, 2000)
		} catch (e) {
			console.log("App.js initApp error : ", e)
			setUpdateProgress(1)
			setIsCheckingUpdate(false)
		}
	}

	const increateUpdateProgress = () => {
		setTimeout(() => {
			setUpdateProgress(0.2)
		}, 300)
		setTimeout(() => {
			setUpdateProgress(0.55)
		}, 600)
		setTimeout(() => {
			setUpdateProgress(0.75)
		}, 800)
		setTimeout(() => {
			setUpdateProgress(0.9)
		}, 1000)
	}

	// only ios
	const initTrackingTransparency = async () => {
		if (Platform.OS === "ios") {
			const { status } = await requestTrackingPermissionsAsync();
			if (status === 'granted') {
				// console.log('Yay! I have user permission to track data');
			}
		}
	}

	return (
		isCheckingUpdate ?
			<View style={{ flex: 1 }}>
				<LinearGradient
					locations={[0, 0.4]}
					colors={[Constant.color.violetlight, Constant.color.darkPurple]}
					start={{ x: 0, y: 0 }}
					end={{ x: 0, y: 1 }}
					style={{ ...StyleSheet.absoluteFillObject }}
				>
					<View style={styles.container}>
						<Image source={require("./assets/logo.png")} style={{ width: screenWidth * 0.6, height: screenWidth * 0.6 }} resizeMode="contain" />
						<Text style={styles.updateTextStatusStyle}>{updateStatusText}</Text>
						<LinearProgress
							style={{ width: screenWidth * 0.6 }}
							color={Constant?.color?.violetlight}
							value={updateProgress}
							variant="determinate"
						/>
					</View>
				</LinearGradient>
			</View>
			:
			<ContextProvider>
				<Main />
			</ContextProvider>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	updateTextStatusStyle: {
		color: Constant.color.white,
		fontSize: 16,
		fontWeight: "bold",
		marginVertical: 10,
	}
})