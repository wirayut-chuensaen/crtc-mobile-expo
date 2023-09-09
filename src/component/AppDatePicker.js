import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const AppDatePicker = ({ children, onChange }) => {
	const [isPickerVisible, setPickerVisibility] = useState(false);

	const showPicker = () => setPickerVisibility(true);

	const hidePicker = () => setPickerVisibility(false);

	const handleConfirm = date => {
		onChange(date);
		hidePicker();
	};

	return (
		<TouchableOpacity activeOpacity={0.9} onPress={showPicker}>
			{children}
			<DateTimePickerModal
				isVisible={isPickerVisible}
				mode="date"
				onConfirm={handleConfirm}
				onCancel={hidePicker}
			/>
		</TouchableOpacity>
	);
};

AppDatePicker.defaultProps = {
	onChange: () => { },
};

export default AppDatePicker;
