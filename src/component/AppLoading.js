import React from 'react';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import Constant from "../utils/Constant"

const AppLoading = ({ }) => {
	return (
		<View style={styles.container}>
			<View style={styles.indicatorContainer}> 
				<ActivityIndicator size="large" color={Constant?.color?.violet} />
			</View>
		</View>
	);
};
export default AppLoading;

const styles = StyleSheet.create({
	container: {
		zIndex: 9999999,
		backgroundColor: '#00000040',
		position: 'absolute',
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center'
	},
	indicatorContainer: {
		padding: 30,
		backgroundColor: Constant?.color?.white,
		borderRadius: 8,
	},
});
