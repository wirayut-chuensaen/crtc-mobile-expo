import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const VirtualKeyboardEvent = {
	NUMBER: 1,
	DELETE: 2,
};

const Button = ({ label = '', onPress }) => (
	<TouchableOpacity activeOpacity={0.9} onPress={onPress} style={{ flex: 1 }}>
		<View style={styles.button}>
			<Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>
				{label}
			</Text>
		</View>
	</TouchableOpacity>
);

const VirtualKeyboard = ({ onPress = () => { } }) => {
	const one = () => onPress(VirtualKeyboardEvent.NUMBER, 1);
	const two = () => onPress(VirtualKeyboardEvent.NUMBER, 2);
	const three = () => onPress(VirtualKeyboardEvent.NUMBER, 3);
	const four = () => onPress(VirtualKeyboardEvent.NUMBER, 4);
	const five = () => onPress(VirtualKeyboardEvent.NUMBER, 5);
	const six = () => onPress(VirtualKeyboardEvent.NUMBER, 6);
	const seven = () => onPress(VirtualKeyboardEvent.NUMBER, 7);
	const eight = () => onPress(VirtualKeyboardEvent.NUMBER, 8);
	const nine = () => onPress(VirtualKeyboardEvent.NUMBER, 9);
	const zero = () => onPress(VirtualKeyboardEvent.NUMBER, 0);
	const del = () => onPress(VirtualKeyboardEvent.DELETE);

	return (
		<View
			style={{ marginTop: 'auto', backgroundColor: '#eee', paddingVertical: 15 }}>
			<View style={styles.buttonContainer}>
				<Button label="1" onPress={one} />
				<Button label="2" onPress={two} />
				<Button label="3" onPress={three} />
			</View>
			<View style={styles.buttonContainer}>
				<Button label="4" onPress={four} />
				<Button label="5" onPress={five} />
				<Button label="6" onPress={six} />
			</View>
			<View style={styles.buttonContainer}>
				<Button label="7" onPress={seven} />
				<Button label="8" onPress={eight} />
				<Button label="9" onPress={nine} />
			</View>
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<View style={{ flex: 1 }} />
				<Button label="0" onPress={zero} />
				<Button label="DEL" onPress={del} />
			</View>
		</View>
	);
};

export default VirtualKeyboard;

const styles = StyleSheet.create({
	buttonContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 10,
		marginHorizontal: 5,
	},
	button: {
		backgroundColor: 'white',
		marginHorizontal: 10,
		borderRadius: 6,
		paddingVertical: 10,
		justifyContent: 'center',
	},
});
