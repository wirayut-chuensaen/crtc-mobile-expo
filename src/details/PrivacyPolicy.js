import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, Text, View, ScrollView } from 'react-native';
import { Icon, Header } from 'react-native-elements';
import Constant from '../utils/Constant';
import { privacyPolicy } from "../service/Services"
import { RowInfo_More } from '../items';
import showError from '../utils/showError';
import useNavigator from '../utils/useNavigator';
import { AppView } from '../component';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const PrivacyPolicy = ({ Actions }) => {
	const [isLoading, setIsLoading] = useState(false)
	const [info, setInfo] = useState("")

	useEffect(() => {
		init()
	}, [])

	const init = async () => {
		try {
			setIsLoading(true)
			await privacyPolicy((res, done) => {
				console.log("privacyPolicy res : ", res)
				if (done && res?.data?.status) {
					setInfo(res?.data?.data?.privacy_policy || "")
				} else {
					showError(res?.data?.message);
				}
			});
		} catch (e) {
			console.log("PrivacyPolicy init error : ", e)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<AppView isLoading={isLoading} style={styles.body}>
			<Header
				leftComponent={
					<Icon
						name="chevron-thin-left"
						type="entypo"
						color="#fff"
						iconStyle={{ backgroundColor: Constant?.color?.violet }}
						onPress={() => Actions.pop()}
					/>
				}
				centerComponent={{ text: "นโยบายความเป็นส่วนตัว", style: { color: '#fff' } }}
				innerContainerStyles={{ backgroundColor: Constant?.color?.violet }}
				containerStyle={{
					backgroundColor: Constant?.color?.violet,
					borderBottomColor: Constant?.color?.violet,
				}}
			/>
			<ScrollView style={styles.body}>
				<RowInfo_More keys="นโยบายความเป็นส่วนตัว" name="" />
				<Text style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 10 }}>
					{info}
				</Text>
			</ScrollView>
		</AppView>
	);
}

export default useNavigator(PrivacyPolicy)

const styles = StyleSheet.create({
	body: {
		flex: 1,
		backgroundColor: Constant?.color?.white,
	},
});
