import React, { useState, useEffect, useCallback } from 'react';
import {
	StyleSheet,
	Dimensions,
	View,
	Text,
	TouchableOpacity,
	BackHandler,
	Alert,
} from 'react-native';
import { Icon } from 'react-native-elements';
import Constant from '../utils/Constant';
import { LinearGradient } from "expo-linear-gradient";
import Home from './launcher/Home';
import Account from './launcher/Account';
import { AppView } from '../component';
import useNavigator from '../utils/useNavigator';
import { useFocusEffect } from '@react-navigation/native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export const Tab = {
	HOME: 1,
	ACCOUNT: 2,
	FUND: 3,
	LOAN: 4,
};

const Launcher = ({ navigation, route, Actions, tab }) => {
	const [screenHeight, setScreenHeight] = useState(height)
	const [isLoading, setIsLoading] = useState(false)
	const [tabState, setTabState] = useState(tab || Tab.HOME)

	useFocusEffect(
		useCallback(() => {
			const backHandler = BackHandler.addEventListener(
				'hardwareBackPress',
				checkExitApp,
			);
			return () => backHandler.remove();
		}, [])
	)

	const checkExitApp = () => {
		Alert.alert('แจ้งเตือน', 'ยืนยันที่จะออกจากแอปหรือไม่?', [
			{
				text: 'ยกเลิก',
				onPress: () => null,
				style: 'cancel',
			},
			{ text: 'ตกลง', onPress: () => BackHandler.exitApp() },
		]);
		return true;
	}

	const onContentSizeChange = (contentWidth, contentHeight) => {
		setScreenHeight(contentHeight)
	};

	const onLoading = (loading) => {
		setIsLoading(loading)
	}

	const getColorActive = (tabValue) => {
		if (tabState === tabValue) {
			return Constant?.color?.darkPurple;
		} else {
			return Constant?.color?.darktGray;
		}
	}

	const checkIsVerify = () => {
		if (tabState !== Tab.ACCOUNT) Actions.push('VerifyPin');
	};


	return (
		<AppView isLoading={isLoading} style={styles.container}>
			<View style={styles.body}>
				{
					tabState === Tab.HOME && (
						<LinearGradient
							locations={[0, 0.4]}
							colors={[Constant?.color?.violetlight, Constant?.color?.darkPurple]}
							start={{ x: 0, y: 0 }}
							end={{ x: 0, y: 1 }}
							style={styles.linearGradient}>
							<Home navigation={navigation} onLoadingChange={(loading) => onLoading(loading)} />
						</LinearGradient>
					)
				}
				{
					tabState === Tab.ACCOUNT && (
						<Account navigation={navigation} route={route} />
					)
				}
			</View>
			<View style={styles.tabContainer}>
				<TouchableOpacity
					onPress={() => setTabState(Tab.HOME)}
					style={styles.tabItem}>
					<View style={styles.iconContainer}>
						<Icon
							name="home"
							type="material-community"
							color={getColorActive(Tab.HOME)}
						/>
					</View>
					<Text style={{ color: getColorActive(Tab.HOME) }}>หน้าหลัก</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={checkIsVerify} style={styles.tabItem}>
					<View style={styles.iconContainer}>
						<Icon
							name="cash-multiple"
							type="material-community"
							color={getColorActive(Tab.ACCOUNT)}
						/>
					</View>
					<Text style={{ color: getColorActive(Tab.ACCOUNT) }}>
						ทำธุรกรรม
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => Actions.push('Deposits')}
					style={styles.tabItem}>
					<View style={styles.iconContainer}>
						<Icon
							name="bank"
							type="material-community"
							color={getColorActive(Tab.FUND)}
						/>
					</View>
					<Text style={{ color: getColorActive(Tab.FUND) }}>เงินฝาก</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => Actions.push('Loans')}
					style={styles.tabItem}>
					<View style={styles.iconContainer}>
						<Icon
							name="cash-plus"
							type="material-community"
							color={getColorActive(Tab.LOAN)}
						/>
					</View>
					<Text style={{ color: getColorActive(Tab.LOAN) }}>เงินกู้</Text>
				</TouchableOpacity>
			</View>
		</AppView>
	);
}

export default useNavigator(Launcher)

const styles = StyleSheet.create({
	tabContainer: {
		height: 80,
		backgroundColor: 'white',
		flexDirection: 'row',
		alignItems: 'center',
		borderTopWidth: 1,
		borderTopColor: '#eee',
	},
	tabItem: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingBottom: 10,
	},
	iconContainer: {
		width: 25,
		height: 25,
		justifyContent: 'center',
		alignItems: 'center',
	},
	contents: {
		flexDirection: 'column',
		backgroundColor: Constant?.color?.skyles,
		borderRadius: 10,
		borderWidth: 1.5,
		borderColor: Constant?.color?.gray,
		marginLeft: 15,
		marginRight: 15,
		marginBottom: 15,
	},
	body: {
		flex: 1,
	},
	linearGradient: {
		flex: 1,
	},
	container: {
		flex: 1,
	},
});
