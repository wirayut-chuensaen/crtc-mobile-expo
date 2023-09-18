import React from 'react';
import { TouchableOpacity, Platform } from 'react-native';
// import DocumentPicker from 'react-native-document-picker';  // change to expo doc picker
import * as ExpoDocumentPicker from "expo-document-picker"

const getFileResult = result => {
	// const uri = result.fileCopyUri;
	const uri = result?.uri;
	const fileName = `${Date.now()}.${uri.split('.').slice(-1)[0]}`;
	return {
		name: fileName,
		type: result?.type,
		uri: Platform.OS === 'android' ? uri : uri.replace('file://', ''),
		fileSize: result?.size,
	};
};

const AppPdfPicker = ({ children, onResult, disabled = false }) => {
	const onStorage = async () => {
		try {
			// const pickerResult = await DocumentPicker.pickSingle({
			// 	presentationStyle: 'fullScreen',
			// 	transitionStyle: 'crossDissolve',
			// 	mode: 'open',
			// 	type: [DocumentPicker.types.pdf],
			// 	copyTo: 'cachesDirectory',
			// });
			const pickerResult = await ExpoDocumentPicker.getDocumentAsync({
				copyToCacheDirectory: true,
				type: "application/pdf",
				multiple: false,
			})
			onResult(getFileResult(pickerResult));
		} catch (e) {
			console.log('AppPdfPicker.js onStorage error : ', e);
		}
	};

	return (
		<TouchableOpacity
			disabled={disabled}
			activeOpacity={0.9}
			onPress={onStorage}>
			{children}
		</TouchableOpacity>
	);
};

AppPdfPicker.defaultProps = {
	onResult: () => { },
	disabled: false,
};

export default AppPdfPicker;
