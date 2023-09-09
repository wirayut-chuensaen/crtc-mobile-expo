import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	Dimensions,
	View,
	FlatList,
	TouchableOpacity,
	Text,
	TextInput,
	Image,
	Linking,
} from 'react-native';
import { Icon, Header } from 'react-native-elements';
import Constant from '../util/Constant';

import LinearGradient from 'react-native-linear-gradient';
import useNavigator from '../util/useNavigator';
import AppButton from '../component/AppButton';
import { } from '../../actions/Service';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AppTextInput from '../component/AppTextInput';
import SizedBox from '../component/SizedBox';
import { WebView } from 'react-native-webview';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const CoopAccountNotLink = ({ navigation, Actions, refresh, url }) => {
	return (
		<LinearGradient
			locations={[0, 0.4]}
			colors={[Constant.color.violetlight, Constant.color.darkPurple]}
			start={{ x: 0, y: 0 }}
			end={{ x: 0, y: 1 }}
			style={{ ...StyleSheet.absoluteFillObject }}>
			<Header
				// leftComponent={
				//     <Icon
				//         name="chevron-thin-left"
				//         type="entypo"
				//         color="#fff"
				//         iconStyle={{ backgroundColor: Constant.color.violet }}
				//         onPress={navigation.goBack}
				//     />
				// }
				centerComponent={{
					text: "เชื่อมต่อบัญชี",
					style: { color: '#fff' },
				}}
				innerContainerStyles={{ backgroundColor: Constant.color.violet }}
				containerStyle={{
					backgroundColor: Constant.color.violet,
					borderBottomColor: Constant.color.violet,
				}}
			/>

			<View style={styles.body}>
				<View style={{ alignItems: 'center' }}>
					<Image source={require('../../assest/link.png')} style={{ width: 50, height: 50, }} />
				</View>
				<SizedBox height={10} />
				<Text style={styles.label}>
					ท่านยังไม่ได้ ผูกบัญชีธนาคารกับทางระบบ{'\n'}ต้องทำการผูกบัญชีธนาคารก่อน ถึงจะเริ่มใช้งานได้
				</Text>
				<SizedBox height={20} />
				<AppButton
					text="ทำการผูกบัญชี"
					onPress={() => {
						Linking.openURL(url).finally(() => {
							Actions.pop()
						});
						// navigation.navigate('CoopLinkAccount', {url});
					}}
					icon={<MaterialIcons name='add-link' color={Constant.color.white} size={25} style={{ marginEnd: 4 }} />}
				/>
				<SizedBox height={10} />
				<AppButton
					text="ย้อนกลับ"
					onPress={navigation.goBack}
					icon={<MaterialCommunityIcons name='chevron-left' color={Constant.color.white} size={25} />}
				/>
			</View>
		</LinearGradient>
	);
};

CoopAccountNotLink.defaultProps = {};

export default useNavigator(CoopAccountNotLink);

const styles = StyleSheet.create({
	body: {
		backgroundColor: 'white',
		flex: 1,
		borderRadius: 5,
		margin: 15,
		padding: 10,
	},
	br: {
		backgroundColor: '#E1E1E1',
		height: 1,
	},
	label: {
		fontSize: 14,
		color: Constant.color.black,
		textAlign: 'center'
	},
	remark: {
		fontSize: 12,
		color: Constant.color.dark,
	},
	subTitle: {
		color: '#727272',
		fontSize: 10,
	},
	twoLabel: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 10,
	},
	textArea: {
		height: 120,
	},
});
