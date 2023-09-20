import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	ScrollView,
} from 'react-native';
import { Header } from 'react-native-elements';
import Constant from '../../utils/Constant';
import { LinearGradient } from 'expo-linear-gradient';
import useNavigator from '../../utils/useNavigator';
import { SizedBox, AppButton, StepBar } from '../../component';
import { Ionicons } from "@expo/vector-icons"
import toCurrency from '../../utils/toCurrency';

const CoopWithdrawSuccess = ({ navigation, Actions, amount, successData = {} }) => {
	const onBack = () => Actions.popToRoot();

	return (
		<LinearGradient
			locations={[0, 0.4]}
			colors={[Constant?.color?.violetlight, Constant?.color?.darkPurple]}
			start={{ x: 0, y: 0 }}
			end={{ x: 0, y: 1 }}
			style={{ ...StyleSheet.absoluteFillObject }}>
			<Header
				centerComponent={{
					text: '',
					style: { color: '#fff' },
				}}
				innerContainerStyles={{ backgroundColor: Constant?.color?.violet }}
				containerStyle={{
					backgroundColor: Constant?.color?.violet,
					borderBottomColor: Constant?.color?.violet,
				}}
			/>

			<ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
				<SizedBox height={28} />
				<StepBar step={3} />
				<SizedBox height={20} />
				<View style={styles.center}>
					<Text style={styles.label}>ดำเนินการถอนเงินฝากสำเร็จ</Text>
					<SizedBox height={20} />
					<Ionicons name="ios-checkmark-circle" size={80} color="#00942C" />
					<SizedBox height={20} />
					<Text style={styles.label}>จำนวนเงิน {toCurrency(amount)}</Text>
					<SizedBox height={10} />
					<Text style={styles.label}>{successData?.transaction?.transactionDateTime}</Text>
					<SizedBox height={5} />
					<Text style={styles.label}>รหัสอ้างอิง : {successData?.transactionReferenceNumber}</Text>
				</View>
				<SizedBox height={50} />
				<AppButton
					text="กลับหน้าหลัก"
					onPress={onBack}
				/>
			</ScrollView>
		</LinearGradient>
	);
};

export default useNavigator(CoopWithdrawSuccess);

const styles = StyleSheet.create({
	body: {
		backgroundColor: 'white',
		borderRadius: 5,
		margin: 15,
		flex: 1,
		padding: 10,
	},
	label: {
		fontSize: 14,
		color: Constant?.color?.dark,
	},
	center: {
		justifyContent: 'center',
		alignItems: 'center',
	},
});
