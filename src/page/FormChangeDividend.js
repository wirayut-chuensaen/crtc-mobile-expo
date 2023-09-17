import React, { useEffect, useState, useCallback } from 'react';
import {
	StyleSheet,
	View,
	Text,
} from 'react-native';
import { Icon, Header } from 'react-native-elements';
import Constant from '../utils/Constant';
import { LinearGradient } from 'expo-linear-gradient';
import useNavigator from '../utils/useNavigator';
import { AppView, AppButton, SizedBox, ButtonPicker, AppListPicker } from '../component';
import { getBankAccount, updateDividendAccount } from "../service/Services"
import { RowInfo } from '../items';
import { useFocusEffect } from '@react-navigation/native';
import showError from '../utils/showError';
import Toast from 'react-native-toast-message';

const FormChangeDividend = ({ navigation, Actions }) => {
	const [accountName, setAccountName] = useState('');
	const [accountIndex, setAccountIndex] = useState(-1);
	const [accountList, setAccountList] = useState([]);
	const [validate, setValidate] = useState(false);
	const [before, setBefore] = useState({});
	const [after, setAfter] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	useFocusEffect(
		useCallback(() => {
			initialData();
		}, [])
	)

	useEffect(() => {
		setValidate(accountIndex !== -1);
	}, [accountIndex]);

	const initialData = async () => {
		try {
			setIsLoading(true)
			await getBankAccount((res, done) => {
				// console.log("getBankAccount res : ", res)
				if (done && res?.data?.status) {
					setAccountList(
						res?.data?.bank_accounts?.map(x => {
							x.fullName = `${x?.BANKID} - ${x?.BANKACNO?.trim()}`;
							return x;
						}),
					);
					setBefore(res?.data?.bank_account_befor)
					setAfter(res?.data?.bank_account_after)
				} else {
					showError(res?.data?.message || res?.response?.data?.message || null);
				}
			});
		} catch (e) {
			console.log("FormChangeDividend.js initialData error : ", e)
		} finally {
			setIsLoading(false)
		}
	};

	const onSave = async () => {
		try {
			setIsLoading(true)
			await updateDividendAccount(
				{
					bankid: accountList[accountIndex]?.BANKID,
					bankacno: accountList[accountIndex]?.BANKACNO?.trim(),
				},
				(res, done) => {
					// console.log("updateDividendAccount res : ", res)
					if (done && res?.data?.status) {
						Toast.show({
							type: "success",
							text1: res?.data?.message
						})
						Actions.pop();
					} else {
						showError(res?.data?.message);
					}
				},
			);
		} catch (e) {
			console.log("FormChangeDividend.js onSave error : ", e)
		} finally {
			setIsLoading(false)
		}
	};

	const toCreateNewBankAccount = () => Actions.push('FormCreateBankAccount');

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
						text: 'เปลี่ยนแปลงเลขบัญชีรับปันผล',
						style: { color: '#fff' },
					}}
					innerContainerStyles={{ backgroundColor: Constant?.color?.violet }}
					containerStyle={{
						backgroundColor: Constant?.color?.violet,
						borderBottomColor: Constant?.color?.violet,
					}}
				/>
				<View style={styles.body}>
					<Text style={styles.label}>เปลี่ยนแปลงเลขบัญชีรับปันผล</Text>
					<SizedBox height={10} />
					<View style={styles.br} />
					<SizedBox height={13} />
					<AppButton text="เพิ่มบัญชีใหม่" onPress={toCreateNewBankAccount} />
					<SizedBox height={20} />
					<Text style={styles.label}>บัญชีที่มีอยู่แล้ว</Text>
					<SizedBox height={10} />
					<AppListPicker
						title="เลือกบัญชี"
						showOnKey="fullName"
						onSelect={({ item, index }) => {
							setAccountName(item?.fullName);
							setAccountIndex(index);
						}}
						data={accountList}
					>
						<ButtonPicker text={accountName} hintText="บัญชี" />
					</AppListPicker>
					<SizedBox height={20} />
					<AppButton text="บันทึกข้อมูล" onPress={onSave} disabled={!validate} />
					<SizedBox height={20} />
					{before != undefined && <>
						<RowInfo
							keys="เปลี่ยนแปลงบัญชีรับปันผลแล้ว"
							name=""
							labelColor="#00942C"
							containerStyle={{ paddingVertical: 10, paddingHorizontal: 0 }}
						/>
						<RowInfo
							keys="ชื่อบัญชีเดิม : "
							name={before?.BANKID}
							containerStyle={{ paddingVertical: 10, paddingHorizontal: 0 }}
						/>
						<RowInfo
							keys="เลขบัญชี : "
							name={before?.BANKACNO}
							containerStyle={{ paddingVertical: 10, paddingHorizontal: 0 }}
						/>
						<SizedBox height={20} />
					</>}

					{
						after != undefined && <>
							<RowInfo
								keys="เปลี่ยนเป็น"
								name=""
								labelColor="#00942C"
								containerStyle={{ paddingVertical: 10, paddingHorizontal: 0 }}
							/>
							<RowInfo
								keys="ชื่อบัญชี : "
								name={after?.BANKID}
								containerStyle={{ paddingVertical: 10, paddingHorizontal: 0 }}
							/>
							<RowInfo
								keys="เลขบัญชี : "
								name={after?.BANKACNO}
								containerStyle={{ paddingVertical: 10, paddingHorizontal: 0 }}
							/>
							<RowInfo
								keys="วันที่บันทึก : "
								name={after?.last_update}
								containerStyle={{ paddingVertical: 10, paddingHorizontal: 0 }}
							/>
							{/* <RowInfo
								keys="เมื่อวันที่ : "
								name={before.BANKACNO}
							/> */}
						</>
					}

				</View>
			</LinearGradient>
		</AppView>
	);
};

export default useNavigator(FormChangeDividend);

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
