import React, { useCallback } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
	BackHandler,
} from 'react-native';
import { Header } from 'react-native-elements';
import Constant from '../utils/Constant';
import { LinearGradient } from 'expo-linear-gradient';
import useNavigator from '../utils/useNavigator';
import { AppButton, SizedBox } from '../component';
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"
import * as ExpoLinking from "expo-linking"
import { useFocusEffect } from '@react-navigation/native';

const CoopAccountNotLink = ({ navigation, Actions, url }) => {
	useFocusEffect(
		useCallback(() => {
			const backHandler = BackHandler.addEventListener(
				'hardwareBackPress',
				() => { return true },
			);
			return () => backHandler.remove();
		}, [])
	)

	return (
		<LinearGradient
			locations={[0, 0.4]}
			colors={[Constant?.color?.violetlight, Constant?.color?.darkPurple]}
			start={{ x: 0, y: 0 }}
			end={{ x: 0, y: 1 }}
			style={{ ...StyleSheet.absoluteFillObject }}>
			<Header
				centerComponent={{
					text: "เชื่อมต่อบัญชี",
					style: { color: '#fff' },
				}}
				innerContainerStyles={{ backgroundColor: Constant?.color?.violet }}
				containerStyle={{
					backgroundColor: Constant?.color?.violet,
					borderBottomColor: Constant?.color?.violet,
				}}
			/>

			<View style={styles.body}>
				<View style={{ alignItems: 'center' }}>
					<Image source={require("../../assets/link.png")} style={{ width: 50, height: 50, }} />
				</View>
				<SizedBox height={10} />
				<Text style={styles.label}>
					ท่านยังไม่ได้ ผูกบัญชีธนาคารกับทางระบบ{'\n'}ต้องทำการผูกบัญชีธนาคารก่อน ถึงจะเริ่มใช้งานได้
				</Text>
				<SizedBox height={20} />
				<AppButton
					text="ทำการผูกบัญชี"
					onPress={() => {
						ExpoLinking.openURL(url).finally(() => {
							Actions.pop()
						});
					}}
					icon={<MaterialIcons name="add-link" color={Constant?.color?.white} size={25} style={{ marginEnd: 4 }} />}
				/>
				<SizedBox height={10} />
				<AppButton
					text="ย้อนกลับ"
					onPress={navigation.goBack}
					icon={<MaterialCommunityIcons name='chevron-left' color={Constant?.color?.white} size={25} />}
				/>
			</View>
		</LinearGradient>
	);
};

export default useNavigator(CoopAccountNotLink);

const styles = StyleSheet.create({
	body: {
		backgroundColor: 'white',
		flex: 1,
		borderRadius: 5,
		margin: 15,
		padding: 10,
	},
	label: {
		fontSize: 14,
		color: Constant.color.black,
		textAlign: 'center'
	},
});
