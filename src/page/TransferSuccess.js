import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
	Text,
	View,
	StyleSheet,
	BackHandler,
	ScrollView,
	TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import Constant from '../utils/Constant';
import { Tab } from './Launcher';
import ViewShot from 'react-native-view-shot';
import useNavigator from '../utils/useNavigator';
import { CommonActions } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { AppView } from '../component';
import { useFocusEffect } from '@react-navigation/native';
import * as ExpoMediaLibrary from "expo-media-library"
import * as ExpoFileSystem from "expo-file-system"

const TransferSuccess = ({
	navigation,
	toAccount,
	fromAccount,
	fee,
	transfer_date_time,
	transfer_amount,
	transfer_from_account,
	transfer_to_account,
	remark,
	token,
}) => {
	let _viewShotRef = useRef(null);
	const [isCapture, setIsCapture] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useFocusEffect(
		useCallback(() => {
			const backHandler = BackHandler.addEventListener(
				'hardwareBackPress',
				onBack,
			);
			return () => backHandler.remove();
		}, [])
	)

	useEffect(() => {
		checkPermision();
	}, []);

	const onBack = () => {
		navigation.dispatch(
			CommonActions.reset({
				index: 1,
				routes: [
					{
						name: 'Launcher',
						params: {
							tab: Tab.ACCOUNT,
						},
					},
				],
			}),
		);
		return true;
	};

	const checkPermision = async () => {
		await ExpoMediaLibrary.requestPermissionsAsync().then(({ granted }) => {
			if (granted) {
				capture()
			} else {
				Toast.show({
					type: 'error',
					text1: 'บันทึกไม่สำเร็จ ไม่สามารถเข้าถึงโฟลเดอร์รูปภาพได้',
				});
			}
		})
	};

	const saveBase64ToFile = async (base64) => {
		// const fileName = `Crtc-${Date.now()}.jpg`;
		// const dir = `${RNFS.ExternalDirectoryPath}/Pictures/`;
		// const newPath = `${dir}${fileName}`;
		// await RNFS.mkdir(dir);
		// // console.log(newPath);

		// try {
		// 	const result = await FileSystem.writeFile(newPath, base64, 'base64');
		// 	console.log(result)
		// 	Toast.show({
		// 		type: 'success',
		// 		text1: 'บันทึกสำเร็จ',
		// 	});
		// } catch (error) {
		// 	Toast.show({
		// 		type: 'error',
		// 		text1: err.message,
		// 	});
		// }

		try {
			setIsLoading(true)
			const fileName = ExpoFileSystem.documentDirectory + `Crtc-${Date.now()}.jpg`;
			await ExpoFileSystem.writeAsStringAsync(fileName, base64, {
				encoding: ExpoFileSystem.EncodingType.Base64
			})
			const asset = await ExpoMediaLibrary.createAssetAsync(fileName)
			if (asset) {
				const dir = await ExpoMediaLibrary.getAlbumAsync("Pictures")
				if (dir != null) {
					await ExpoMediaLibrary.addAssetsToAlbumAsync([asset], dir, false)
				} else {
					await ExpoMediaLibrary.createAlbumAsync("Pictures", asset, false)
				}
				Toast.show({
					type: 'success',
					text1: 'บันทึกสำเร็จ',
				});
			} else {
				onCaptureFailure()
			}
		} catch (e) {
			console.log("TransferSuccess.js saveBase64ToFile error : ", e)
		} finally {
			setIsLoading(false)
		}
	};

	const onCapture = (data) => {
		saveBase64ToFile(data)
			.then(() => setIsCapture(true))
			.catch(onCaptureFailure);
	};

	const onCaptureFailure = (error) => {
		// console.log('TransferSuccess.js onCaptureFailure : ', error)
		Toast.show({
			type: 'error',
			text1: "บันทึกไม่สำเร็จ",
		});
	};

	const capture = () => {
		setIsLoading(true);
		try {
			setTimeout(() => {
				if (_viewShotRef.current != null) {
					_viewShotRef.current.capture();
				} else {
					Toast.show({
						type: 'error',
						text1: 'บันทึกไม่สำเร็จ',
					});
				}
			}, 1000);
		} catch (e) {
			console.log("TransferSuccess.js capture error : ", e)
			Toast.show({
				type: 'error',
				text1: e?.message,
			});
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
				style={{ ...StyleSheet.absoluteFillObject }}
			/>
			<View style={{ marginTop: 50 }} />
			{isCapture && (
				<View style={styles.toast}>
					<Text style={{ color: 'white' }}>บันทึกสลิปโอนเงินเรียบร้อย</Text>
				</View>
			)}

			<ScrollView style={{ zIndex: 9999 }}>
				<ViewShot
					ref={_viewShotRef}
					options={{ format: 'jpg', quality: 0.9, result: 'base64' }}
					onCapture={onCapture}
					onCaptureFailure={onCaptureFailure}
					style={{
						backgroundColor: 'white',
						marginHorizontal: 20,
					}}>
					<View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
						<View style={{ marginTop: 5 }}>
							<Icon
								name="check-circle-o"
								type="font-awesome"
								size={40}
								color={Constant.color.green}
							/>
						</View>
						<View style={{ alignItems: 'center' }}>
							<Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 12 }}>
								รายการสำเร็จแล้ว
							</Text>
							<Text style={{ fontSize: 12, marginTop: 6 }}>
								{transfer_date_time}
							</Text>
							<Text style={{ fontSize: 12, marginTop: 6 }}>จำนวนเงิน</Text>
							<Text style={{ fontSize: 22, fontWeight: 'bold', marginTop: 6 }}>
								{Number(transfer_amount).toFixed(2)}{' '}
								<Text style={{ fontSize: 12 }}>THB</Text>
							</Text>
						</View>
						<Text style={{ fontSize: 14, fontWeight: 'bold', marginVertical: 6 }}>
							จาก
						</Text>
						<View style={styles.accountContainer}>
							<Text style={{ fontSize: 14, fontWeight: 'bold' }}>
								{fromAccount?.ACNAME}
							</Text>
							<Text style={{ fontSize: 12, marginTop: 6 }}>
								{transfer_from_account}
							</Text>
						</View>
						<Text style={{ fontSize: 14, fontWeight: 'bold', marginVertical: 6 }}>
							ไปยัง
						</Text>
						<View style={styles.accountContainer}>
							<Text style={{ fontSize: 16, fontWeight: 'bold' }}>
								{toAccount?.ACNAME}
							</Text>
							<Text style={{ fontSize: 12, marginTop: 6 }}>
								{transfer_to_account}
							</Text>
						</View>
						<Text style={{ fontSize: 12, marginTop: 10 }}>
							ค่าธรรมเนียม <Text style={{ marginLeft: 20 }}>{fee} THB</Text>
						</Text>
						<Text style={{ fontSize: 12, marginTop: 7 }}>
							บันทึกช่วยจำ : <Text style={{ marginLeft: 20 }}>{remark}</Text>
						</Text>
					</View>
					<View style={{ backgroundColor: '#e5e5e5', padding: 20 }}>
						<Text>หมายเลขอ้างอิง {token}</Text>
					</View>
				</ViewShot>
				<View style={{ marginVertical: 20 }}>
					<TouchableOpacity style={styles.shadowButton} onPress={onBack}>
						<LinearGradient
							locations={[0, 0.4]}
							colors={[Constant?.color?.violetlight, Constant?.color?.darkPurple]}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 1 }}
							style={{
								height: 50,
								justifyContent: 'center',
							}}>
							<View
								style={{
									flexDirection: 'row',
									alignItems: 'center',
									justifyContent: 'center',
								}}>
								<Text style={{ color: 'white', fontSize: 14 }}>
									กลับหน้าบัญชี
								</Text>
							</View>
						</LinearGradient>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</AppView>
	);
};

export default useNavigator(TransferSuccess);

const styles = StyleSheet.create({
	shadowButton: {
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5,
		backgroundColor: 'white',
		borderRadius: 8,
		overflow: 'hidden',
		marginHorizontal: 20,
	},
	accountContainer: {
		borderColor: '#eee',
		borderRadius: 4,
		padding: 10,
		borderWidth: 1,
	},
	toast: {
		marginHorizontal: 20,
		marginBottom: 20,
		paddingVertical: 12,
		backgroundColor: '#43952E',
		justifyContent: 'center',
		alignItems: 'center',
	},
});
