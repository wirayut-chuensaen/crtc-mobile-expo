import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Dimensions, Platform } from "react-native";
import ContextProvider from "./context/state"
import * as ExpoUpdates from "expo-updates";
import { LinearGradient } from 'expo-linear-gradient';
import Constant from "./utils/Constant"
import { LinearProgress } from "react-native-elements";
import Routes from "./Routes";
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';

const screenWidth = Dimensions.get("window").width

const Main = () => {
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		initApp()
		initTrackingTransparency()
	}, [])

	const initApp = async () => {
		try {
			if (!__DEV__) {
				const update = await ExpoUpdates.checkForUpdateAsync();
				console.log("update isAvailable : ", update.isAvailable);
				if (update.isAvailable) {
					console.log("update available...")
					await ExpoUpdates.fetchUpdateAsync();
					console.log("update fetchUpdateAsync...")
					await ExpoUpdates.reloadAsync();
					console.log("update reloadAsync...")
				}
			}
		} catch (e) {
			console.log("App.js initApp error : ", e)
		} finally {
			console.log("finally")
			setTimeout(() => {
				console.log("setIsLoading(false)")
				setIsLoading(false)
			}, 3000)
		}
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
		!isLoading ?
			<ContextProvider>
				<Routes />
			</ContextProvider>
			:
			<View style={{ flex: 1 }}>
				<LinearGradient
					locations={[0, 0.4]}
					colors={[Constant.color.violetlight, Constant.color.darkPurple]}
					start={{ x: 0, y: 0 }}
					end={{ x: 0, y: 1 }}
					style={{ ...StyleSheet.absoluteFillObject }}
				>
					<View style={styles.container}>
						<Image source={require("./../assets/logo.png")} style={{ width: screenWidth * 0.6, height: screenWidth * 0.6 }} resizeMode="contain" />
						<LinearProgress
							style={{ width: screenWidth * 0.6, marginTop: 16 }}
							color={Constant?.color?.violetlight}
							variant="indeterminate"
						/>
					</View>
				</LinearGradient>
			</View>
	)
}

export default Main

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
})