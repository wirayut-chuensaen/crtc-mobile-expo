import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import Constant from '../utils/Constant';

const StepBar = ({ step }) => {
	const getView = () => {
		return [1, 2, 3].join('|||-|||').split('|||');
	};

	const viewList = getView().map((x, index) => {
		if (x === '-') {
			return <View key={index} style={styles.seperate} />;
		}

		return (
			<View
				key={index}
				style={[styles.numberContainer, x == step && styles.activeContainer]}
			>
				<Text style={[styles.number, x == step && styles.activeNumber]}>
					{x}
				</Text>
			</View>
		);
	});

	return <View style={styles.container}>{viewList}</View>;
};

StepBar.defaultProps = {
	step: 0,
};

StepBar.propType = {
	step: PropTypes.number,
};

export default StepBar;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	seperate: {
		height: 1,
		width: 50,
		backgroundColor: '#4F4F4F',
	},
	numberContainer: {
		width: 25,
		height: 25,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 100,
		borderWidth: 1,
		borderColor: '#46009F',
	},
	number: {
		textAlign: 'center',
		fontSize: 13,
		color: Constant?.color?.dark,
	},
	activeContainer: {
		backgroundColor: '#46009F',
	},
	activeNumber: {
		color: 'white',
	},
});
