import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	View,
	Text,
	ScrollView,
} from 'react-native';
import { Icon, Header } from 'react-native-elements';
import Constant from '../utils/Constant';
import { LinearGradient } from 'expo-linear-gradient';
import useNavigator from '../utils/useNavigator';
import { AppView, AppButton, AppTextInput, SizedBox } from '../component';
import showError from '../utils/showError';

const CoopOtp = ({ navigation, Actions, payload }) => {
	const [otp, setOtp] = useState('');
	const [validate, setValidate] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setValidate(otp.length > 4);
	}, [otp]);

	const onConfirm = async () => {
		try {
			setIsLoading(true)
			payload.data.otp = otp;
			await payload?.action(payload?.data, (res, done) => {
				// console.log("transferDepositConfirmOtp res : ", res)
				if (done && res?.data?.status) {
					payload.successData = res?.data?.data;
					Actions.push(payload?.success, payload);
				} else {
					showError(res?.data?.message);
				}
			})
		} catch (e) {
			console.log("CoopOtp.js onConfirm error : ", e)
		} finally {
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
					leftComponent={
						<Icon
							name="chevron-thin-left"
							type="entypo"
							color="#fff"
							iconStyle={{ backgroundColor: Constant?.color?.violet }}
							onPress={() => Actions.pop()}
						/>
					}
					centerComponent={{
						text: payload?.title,
						style: { color: '#fff' },
					}}
					innerContainerStyles={{ backgroundColor: Constant?.color?.violet }}
					containerStyle={{
						backgroundColor: Constant?.color?.violet,
						borderBottomColor: Constant?.color?.violet,
					}}
				/>

				<ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
					<View>
						<Text style={styles.label}>ยืนยันรหัส OTP</Text>
						<SizedBox height={10} />
						<AppTextInput
							value={otp}
							maxLength={7}
							onChangeText={setOtp}
						/>
						<SizedBox height={10} />
						<AppButton
							text="ยืนยันการทำรายการ"
							onPress={onConfirm}
							disabled={!validate}
						/>
					</View>
				</ScrollView>
			</LinearGradient>
		</AppView>
	);
};

export default useNavigator(CoopOtp);

const styles = StyleSheet.create({
	body: {
		backgroundColor: 'white',
		borderRadius: 5,
		margin: 15,
		flex: 1,
		padding: 10,
	},
	br: {
		backgroundColor: '#E1E1E1',
		height: 1,
	},
	label: {
		fontSize: 14,
		color: Constant?.color?.dark,
	},
});
