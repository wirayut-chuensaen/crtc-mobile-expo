import React from 'react';
import { View } from 'react-native';

const SizedBox = ({ height, width }) => {
	return <View style={{ height, width }} />;
};

SizedBox.defaultProps = {
	width: 0,
	height: 0,
};

export default SizedBox;
