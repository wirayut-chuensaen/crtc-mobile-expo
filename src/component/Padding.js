import React from 'react';
import { View } from 'react-native';

const Padding = ({ left = 0, right = 0, top = 0, bottom = 0, children }) => {
	return (
		<View
			style={{
				paddingTop: top,
				paddingLeft: left,
				paddingRight: right,
				paddingBottom: bottom,
			}}>
			{children}
		</View>
	);
};

export const PaddingSymmetric = ({ horizontal = 0, vertical = 0, children }) => {
	return (
		<View
			style={{
				paddingHorizontal: horizontal,
				paddingVertical: vertical,
			}}>
			{children}
		</View>
	);
};

export default Padding;
