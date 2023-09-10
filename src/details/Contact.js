import React, { Component, useState, useEffect } from 'react';
import {
	StyleSheet,
	Dimensions,
	Text,
	View,
	TouchableOpacity,
} from 'react-native';
import * as ExpoLinking from "expo-linking"
import { Icon, Header } from 'react-native-elements';
import Constant from '../utils/Constant';
import { contact } from "../service/Services"
import { RowInfo_More } from '../items';
import useNavigator from '../utils/useNavigator';
import { AppView } from '../component';
import showError from '../utils/showError';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const Contact = ({ navigation, Actions }) => {
	const [address, setAddress] = useState("")
	const [phoneNumber, setPhoneNumber] = useState("")
	const [lineId, setLineId] = useState("")
	const [lineUrl, setLineUrl] = useState("")
	const [facebookUrl, setFacebookUrl] = useState("")
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		init()
	}, [])

	const init = async () => {
		try {
			setIsLoading(true)
			await contact((res, err) => {
				if (res?.data?.status == true) {
					const { contacts_us } = res?.data?.data
					console.log("debug contact_us : ", contacts_us)
					setAddress(contacts_us?.address || "")
					setPhoneNumber(contacts_us?.phone_number || "")
					setLineId(contacts_us?.line_id || "")
					setLineUrl(contacts_us?.line_url || "")
					setFacebookUrl(contacts_us?.facebook_url || "")
				} else {
					showError("มีบางอย่างผิดพลาด")
				}
			});
		} catch (e) {
			console.log("Contact.js init error : ", e)
		} finally {
			setIsLoading(false)
		}
	}

	const openLink = (data) => {
		if (data !== "No data") {
			ExpoLinking.openURL(data)
		} else {
			showError("ไม่พบลิงค์ปลายทาง")
		}
	}

	return (
		<AppView isLoading={isLoading}>
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
				centerComponent={{ text: "ติดต่อเรา", style: { color: '#fff' } }}
				innerContainerStyles={{ backgroundColor: Constant?.color?.violet }}
				containerStyle={{
					backgroundColor: Constant?.color?.violet,
					borderBottomColor: Constant?.color?.violet,
				}}
			/>
			<View style={styles.body}>
				<View style={styles.content}>
					<RowInfo_More keys="ที่ตั้งสำนักงาน" name="" />
					<Text style={{ paddingLeft: 20, paddingRight: 20 }}>
						{address}
					</Text>
					<RowInfo_More keys="ติดต่อเรา" name="" />
					<View style={{ flexDirection: 'row' }}>
						<View style={{ flex: 1, flexDirection: 'row', padding: 10 }}>
							<TouchableOpacity
								style={styles.ButtonF}
								onPress={() => {
									openLink('tel:' + phoneNumber)
								}}>
								<Icon
									name="phone-portrait-outline"
									type="ionicon"
									color={Constant?.color?.darkOrange}
								/>
							</TouchableOpacity>
						</View>
						<View style={{ flex: 1, flexDirection: 'row', padding: 10 }}>
							<TouchableOpacity
								style={styles.ButtonF}
								onPress={() => {
									openLink(lineId)
								}}>
								<Icon
									name="line"
									type="fontisto"
									color={Constant?.color?.green}
								/>
							</TouchableOpacity>
						</View>
						<View style={{ flex: 1, flexDirection: 'row', padding: 10 }}>
							<TouchableOpacity
								style={styles.ButtonF}
								onPress={() => {
									openLink(facebookUrl)
								}}>
								<Icon
									name="sc-facebook"
									type="evilicon"
									color={Constant?.color?.darkBlue}
								/>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</View>
		</AppView>
	);
}

export default useNavigator(Contact)

const styles = StyleSheet.create({
	content: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: Constant.color.white,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: Constant.color.gray,
	},
	body: {
		height: height - 85,
	},
	linearGradient: {
		flex: 1,
		paddingLeft: 15,
		paddingRight: 15,
	},
	Button: {
		marginTop: 20,
		margin: 10,
		backgroundColor: Constant.color.violetlight,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: Constant.color.gray,
	},
	ButtonF: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
		marginBottom: 10,
		borderRadius: 5,
		backgroundColor: Constant.color.white,
		borderWidth: 1,
		borderColor: Constant.color.gray,
	},
});
