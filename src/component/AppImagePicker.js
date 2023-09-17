import React, { useRef } from 'react';
import {
	View,
	StyleSheet,
	TouchableOpacity,
	Platform,
	Text,
} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import Constant from '../utils/Constant';
import { MaterialCommunityIcons } from "@expo/vector-icons"
import SizedBox from './SizedBox';
import * as ExpoImagePicker from 'expo-image-picker';

const PickerItem = ({ icon, text, onPress }) => (
	<TouchableOpacity
		style={styles.buttonPicker}
		activeOpacity={0.9}
		onPress={onPress}>
		{icon}
		<Text style={styles.textPicker} bold>
			{text}
		</Text>
	</TouchableOpacity>
);

const getResult = result => {
	if (!result && result?.canceled == true) {
		return null;
	}
	const asset = result?.assets[0];
	const uri = asset?.uri;
	const fileName = `${Date.now()}.${uri.split('.').slice(-1)[0]}`;
	return {
		name: fileName,
		type: "image/png",
		uri: Platform.OS === 'android' ? uri : uri?.replace('file://', ''),
		fileSize: asset?.fileSize,
	};
};

const getImageGallery = async () =>
	await ExpoImagePicker.launchImageLibraryAsync({
		mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
		allowsEditing: true,
		quality: 0.7,
		aspect: [150, 150],
	})

const getImageCamera = async () =>
	await ExpoImagePicker.launchCameraAsync({
		mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
		allowsEditing: true,
		quality: 0.7,
		aspect: [150, 150],
	})

const sleep = m => new Promise(r => setTimeout(r, m));

const AppImagePicker = ({ children, onResult, disabled = false, setIsLoading }) => {
	const actionSheetRef = useRef();

	const showModal = () => actionSheetRef.current?.setModalVisible(true);
	const onCancel = () => actionSheetRef.current?.setModalVisible(false);

	const getCameraPermissionAsync = async () => {
		const { status } = await ExpoImagePicker.requestCameraPermissionsAsync()
		return status === "granted"
	}

	const getMediaLibraryPermissionAsync = async () => {
		const { status } = await ExpoImagePicker.requestMediaLibraryPermissionsAsync()
		return status === "granted"
	}

	const onCamera = async () => {
		onCancel();
		await sleep(500);
		try {
			const status = await getCameraPermissionAsync()
			setIsLoading && setIsLoading(true)
			if (status) {
				const result = await getImageCamera();
				// console.log("ImagePicker camera result : ", getResult(result));
				result && onResult(getResult(result));
			}
		} catch (error) {
			console.log('AppImagePicker.js onCamera error : ', error);
		} finally {
			setIsLoading && setIsLoading(false)
		}
	};

	const onAlbum = async () => {
		onCancel();
		await sleep(500);
		try {
			const status = await getMediaLibraryPermissionAsync()
			setIsLoading && setIsLoading(true)
			if (status) {
				const result = await getImageGallery();
				// console.log("ImagePicker medialibrary result : ", result);
				result && onResult(getResult(result));
			}
		} catch (error) {
			console.log('AppImagePicker.js onAlbum error : ', error);
		} finally {
			setIsLoading && setIsLoading(false)
		}
	};

	return (
		<TouchableOpacity
			disabled={disabled}
			activeOpacity={0.9}
			onPress={showModal}
		>
			{children}
			<ActionSheet ref={actionSheetRef} bounceOnOpen={true}>
				<View style={styles.container}>
					<PickerItem
						icon={<MaterialCommunityIcons name="camera" size={24} />}
						text="ถ่ายรูป"
						onPress={onCamera}
					/>
					<PickerItem
						icon={<MaterialCommunityIcons name="image" size={24} />}
						text="เลือกรูปภาพจากเครื่อง"
						onPress={onAlbum}
					/>
					<View style={styles.line} />
					<TouchableOpacity
						style={styles.cancelContainer}
						activeOpacity={0.9}
						onPress={onCancel}>
						<Text style={styles.cancelText}>ยกเลิก</Text>
					</TouchableOpacity>
					<SizedBox height={20} />
				</View>
			</ActionSheet>
		</TouchableOpacity>
	);
};

AppImagePicker.defaultProps = {
	onResult: () => { },
	disabled: false,
};

export default AppImagePicker;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 50,
		paddingTop: 30,
	},
	buttonPicker: {
		flexDirection: 'row',
		height: 50,
		alignItems: 'center',
	},
	iconPicker: {
		width: 21,
		height: 21,
		tintColor: Constant?.color?.gray,
	},
	textPicker: {
		marginLeft: 15,
		fontSize: 18,
		color: Constant?.color?.black,
	},
	line: {
		backgroundColor: Constant?.color?.lightGray,
		marginVertical: 15,
		height: 1,
	},
	cancelContainer: {
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
	},
	cancelText: {
		color: Constant?.color?.black,
		fontSize: 20
	},
});
