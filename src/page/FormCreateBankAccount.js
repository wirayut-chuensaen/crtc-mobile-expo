import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	View,
	Image,
	Text,
	Keyboard,
} from 'react-native';
import { Icon, Header } from 'react-native-elements';
import Constant from '../utils/Constant';
import { LinearGradient } from 'expo-linear-gradient';
import useNavigator from '../utils/useNavigator';
import {
	AppView,
	AppButton,
	SizedBox,
	AppTextInput,
	AppListPicker,
	ButtonPicker, AppImagePicker
} from '../component';
import { AppButtonView } from '../component/AppButton';
import { addBankAccount, getBankList } from "../service/Services"
import showError from '../utils/showError';
import Toast from 'react-native-toast-message';

const FormCreateBankAccount = ({ navigation, Actions, refresh }) => {
	const [bankList, setBankList] = useState([]);
	const [bankName, setBankName] = useState('');
	const [bankIndex, setBankIndex] = useState(-1);
	const [bankNo, setBankNo] = useState('');
	const [validate, setValidate] = useState(false);
	const [bankImage, setBankImage] = useState(undefined);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		initialData();
	}, []);

	useEffect(() => {
		setValidate(bankIndex !== -1 && bankNo.length >= 6 && bankImage != undefined);
	}, [bankIndex, bankNo, bankImage]);

	const initialData = async () => {
		try {
			setIsLoading(true)
			await getBankList((res, done) => {
				// console.log("getBankList res : ", res)
				if (done && res?.data?.status) {
					setBankList(
						Object.keys(res?.data?.banks).map(key => {
							const name = res?.data?.banks[key];
							return {
								name,
								shortName: key,
								fullName: `${key} - ${name}`,
							};
						}),
					);
				} else {
					showError(res?.data?.message);
				}
			});
		} catch (e) {
			console.log("FormChangeBankAccount.js initialData error : ", e)
		} finally {
			setIsLoading(false)
		}
	};

	const onSave = async () => {
		Keyboard.dismiss()
		try {
			setIsLoading(true)
			const item = {
				file: bankImage,
				bank_id: bankList[bankIndex]?.shortName,
				bank_account: bankNo,
			}
			console.log("item : ", item)
			await addBankAccount(
				{
					file: bankImage,
					bank_id: bankList[bankIndex]?.shortName,
					bank_account: bankNo,
				},
				(res, done) => {
					console.log("addBankAccount res : ", res);
					if (done && res.data.status) {
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
			console.log("FormChangeBankAccount.js onSave error : ", e)
		} finally {
			setIsLoading(false)
		}
	};

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
						text: 'เพิ่มบัญชีใหม่',
						style: { color: '#fff' },
					}}
					innerContainerStyles={{ backgroundColor: Constant?.color?.violet }}
					containerStyle={{
						backgroundColor: Constant?.color?.violet,
						borderBottomColor: Constant?.color?.violet,
					}}
				/>

				<View style={styles.body}>
					<Text style={styles.label}>เพิ่มบัญชีใหม่</Text>
					<SizedBox height={10} />
					<View style={styles.br} />
					<SizedBox height={13} />
					<AppListPicker
						title="เลือกธนาคาร"
						showOnKey="fullName"
						onSelect={({ item, index }) => {
							setBankName(item?.fullName);
							setBankIndex(index);
						}}
						data={bankList}
					>
						<ButtonPicker text={bankName} hintText="ธนาคาร" />
					</AppListPicker>
					<SizedBox height={20} />
					<Text style={styles.label}>เลขบัญชี</Text>
					<SizedBox height={10} />
					<AppTextInput
						placeholder="เลขบัญชี"
						value={bankNo}
						onChangeText={setBankNo}
						maxLength={15}
					/>
					<SizedBox height={20} />
					{
						bankImage != null &&
						<Image
							source={{ uri: bankImage?.uri }}
							style={{
								width: 140,
								height: 100,
								resizeMode: 'contain',
								backgroundColor: 'black',
								borderRadius: 8,
								marginBottom: 10
							}}
						/>
					}
					<AppImagePicker onResult={setBankImage} setIsLoading={setIsLoading}>
						<AppButtonView text="อัพโหลดรูปภาพสมุดบัญชี" style={{ width: '60%', paddingVertical: 6 }} />
					</AppImagePicker>
					<SizedBox height={20} />
					<AppButton text="บันทึกข้อมูล" onPress={onSave} disabled={!validate} />
				</View>
			</LinearGradient>
		</AppView>
	);
};

export default useNavigator(FormCreateBankAccount);

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
