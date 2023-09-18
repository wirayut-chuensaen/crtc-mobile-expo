import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constant from '../utils/Constant';
import PropTypes from 'prop-types';
import SizedBox from './SizedBox';

const UploadLabel = ({ key, title, labelList = [], footer }) => {
	return (
		<View>
			<Text style={styles.label}>{title}</Text>

			<View style={styles.subLabelContainer}>
				{labelList.map((label, index) => {
					return (
						<Text key={`${key}_label_${index}`} style={styles.subLabel}>
							{`\u2022 ${label}`}
						</Text>
					);
				})}
			</View>
			<SizedBox height={15} />
			{footer}
		</View>
	);
};

UploadLabel.propType = {
	key: PropTypes.string.isRequired,
	footer: PropTypes.elementType,
};

export default UploadLabel;

const styles = StyleSheet.create({
	label: {
		fontSize: 16,
		color: Constant?.color?.dark,
	},
	subLabel: {
		fontSize: 14,
		color: '#00942C',
	},
	subTitle: {
		color: '#727272',
		fontSize: 10,
	},
	subLabelContainer: {
		padding: 5,
	},
});
