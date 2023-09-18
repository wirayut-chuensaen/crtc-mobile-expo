import React, { useEffect } from 'react';
import { LogBox, StatusBar, Platform } from 'react-native';
import Main from "./src/Main"
import Toast from 'react-native-toast-message';

const App = () => {
	useEffect(() => {
		init()
	}, [])

	const init = () => {
		StatusBar.setBarStyle('light-content');
		Platform.OS === 'android' && StatusBar.setBackgroundColor('transparent');
		Platform.OS === "android" && StatusBar.setTranslucent(true);
		LogBox.ignoreAllLogs(true)
	}

	return (
		<>
			<Main />
			<Toast />
		</>
	);
};

export default App;