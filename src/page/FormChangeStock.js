import React, { useEffect, useState, useContext } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Keyboard,
} from 'react-native';
import { Icon, Header } from 'react-native-elements';
import Constant from '../utils/Constant';
import { LinearGradient } from 'expo-linear-gradient';
import useNavigator from '../utils/useNavigator';
import { AppButton, AppView, SizedBox, AppTextInput } from '../component';
import { updateStockRegist } from "../service/Services"
import showError from '../utils/showError';
import { AppContext } from "../context"
import Toast from 'react-native-toast-message';

const FormChangeStock = ({ navigation, Actions, currency }) => {
	const [memberId, setMemberId] = useState('');
	const [oldValue, setOldValue] = useState('');
	const [newValue, setNewValue] = useState('');
	const [validate, setValidate] = useState(false);
	const [isLoading, setIsLoading] = useState(false)
	const { memId } = useContext(AppContext)

	useEffect(() => {
		setValidate(
			memberId.length > 0 && oldValue.length > 0 && newValue.length > 0,
		);
	}, [memberId, oldValue, newValue]);

	useEffect(() => {
		setOldValue(`${currency}`);
		if (memId) {
			setMemberId(memId);
		}
	}, [memId]);

	const onSave = async () => {
		Keyboard.dismiss()
		try {
			setIsLoading(true)
			await updateStockRegist(
				{
					account_id: memberId,
					before_amt: oldValue,
					make2_amt: newValue,
				},
				(res, done) => {
					console.log("updateStockRegist res : ", res)
					if (done && res?.data?.status) {
						Toast.show({
							type: 'success',
							text1: res?.data?.message,
						});
						Actions.pop();
					} else {
						showError(res?.data?.message);
					}
				},
			);
		} catch (e) {
			console.log("FormChangeStock.js onSave error : ", e)
		} finally {
			setIsLoading(false)
		}
	};

	return (
		<AppView isLoading={isLoading} style={{ flex: 1 }}>
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
							onPress={navigation.goBack}
						/>
					}
					centerComponent={{
						text: 'ฟอร์มคำขอเปลี่ยนแปลงข้อมูลหุ้น',
						style: { color: '#fff' },
					}}
					innerContainerStyles={{ backgroundColor: Constant?.color?.violet }}
					containerStyle={{
						backgroundColor: Constant?.color?.violet,
						borderBottomColor: Constant?.color?.violet,
					}}
				/>

				<View style={styles.body}>
					<Text style={styles.label}>ฟอร์มคำขอเปลี่ยนแปลงข้อมูลหุ้น</Text>
					<SizedBox height={5} />
					<Text style={styles.subTitle}>
						ส่งคำขอก่อนวันสิ้นเดือน เพื่อมีผลในเดือนถัดไป ค่ะ
					</Text>
					<SizedBox height={10} />
					<View style={styles.br} />
					<SizedBox height={13} />
					<Text style={styles.label}>เลขสมาชิก</Text>
					<Text style={styles.label}>Member ID</Text>
					<SizedBox height={10} />
					<AppTextInput value={memberId} onChangeText={setMemberId} />
					<SizedBox height={20} />
					<Text style={styles.label}>เดิม ส่งดือนละ</Text>
					<Text style={styles.label}>Value Before</Text>
					<SizedBox height={10} />
					<AppTextInput value={oldValue} onChangeText={setOldValue} />
					<SizedBox height={20} />
					<Text style={styles.label}>เปลี่ยนเป็น ส่งหุ้น เดือนละ</Text>
					<Text style={styles.label}>Change Value</Text>
					<SizedBox height={10} />
					<AppTextInput value={newValue} onChangeText={setNewValue} />
					<SizedBox height={20} />
					<AppButton text="บันทึกข้อมูล" onPress={onSave} disabled={!validate} />
				</View>
			</LinearGradient>
		</AppView>
	);
};

export default useNavigator(FormChangeStock);

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
	subTitle: {
		color: '#727272',
		fontSize: 10,
	},
});
