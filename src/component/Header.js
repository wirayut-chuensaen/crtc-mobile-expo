import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import { personalData } from "../service/Services"
import { Icon } from 'react-native-elements';

const Header = ({ onSetting = () => { } }) => {
	const [profile, setProfile] = useState({});

	useEffect(() => {
		initData()
	}, []);

	const initData = async () => {
		try {
			await personalData((res, done) => {
				const { status, data } = res?.data;
				if (status) setProfile(data?.history_data);
			});
		} catch (e) {
			console.log("Header.js initData error : ", e)
		}
	}

	return (
		<View style={styles.headerContainer}>
			<View style={{ flex: 1 }}>
				<Text style={{ color: 'white', fontWeight: 'bold' }}>สวัสดี</Text>
				<View
					style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
					<Icon
						name="account-circle"
						type="material-community"
						color="#fff"
						iconStyle={{ color: 'white' }}
						onPress={onSetting}
					/>
					<Text
						style={{
							color: 'white',
							fontWeight: 'bold',
							marginLeft: 8,
							fontSize: 16,
						}}>
						{profile?.MNAME}
					</Text>
				</View>
			</View>
			<View>
				<Icon
					name="cog"
					type="material-community"
					color="#fff"
					iconStyle={{ color: 'white' }}
					onPress={onSetting}
				/>
			</View>
		</View>
	);
};

export default Header;

const styles = StyleSheet.create({
	headerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 0,
		marginBottom: 20,
		paddingVertical: 10,
		paddingHorizontal: 20,
	},
});
