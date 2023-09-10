import Toast from 'react-native-toast-message';

const showError = message =>
	Toast.show({
		type: 'error',
		text1: message || "เกิดข้อผิดพลาด",
		text1NumberOfLines: 2,
		onPress: () => Toast.hide(),
	});

export default showError;