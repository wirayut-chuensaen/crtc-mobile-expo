import React, { useState, useEffect, useCallback } from 'react';
import {
	StyleSheet,
	Dimensions,
	View,
	Image,
	ScrollView,
} from 'react-native';
import { Icon, Header, Dialog } from 'react-native-elements';
import Constant from '../utils/Constant';
import { LinearGradient } from 'expo-linear-gradient';
import { RowInfo, RowInfos } from '../items';
import { dividend_Detail } from "../service/Services"
import { AppView, AppButton, SizedBox } from '../component';
import showError from '../utils/showError';
import useNavigator from '../utils/useNavigator';
import * as ExpoLinking from "expo-linking"
import { useFocusEffect } from '@react-navigation/native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const Dividend_Detail = ({ navigation, Actions, item }) => {
	const [dialogVisible, setDialogVisible] = useState(false)
	const [screenHeight, setScreenHeight] = useState(height)
	const [info, setInfo] = useState({})
	const [itemData, setItemData] = useState({})
	const [obj1, setObj1] = useState({})
	const [obj2, setObj2] = useState({})
	const [obj3, setObj3] = useState({})
	const [web1, setWeb1] = useState("")
	const [web2, setWeb2] = useState("")
	const [isLoading, setIsLoading] = useState(false)

	useFocusEffect(
		useCallback(() => {
			init()
		}, [])
	)

	const onContentSizeChange = (contentWidth, contentHeight) => {
		setScreenHeight(contentHeight)
	};

	const init = async () => {
		try {
			setIsLoading(true)
			await dividend_Detail(item?.AACYEAR, (res, done) => {
				// console.log("dividend_Detail res : ", res);
				if (done && res?.data?.status) {
					setInfo(res?.data?.data?.dividend_detail)
					setItemData(res?.data?.data?.dividend[0])
					setObj1(res?.data?.data?.dividend_detail?.detail[0])
					setObj2(res?.data?.data?.dividend_detail?.detail[1])
					setObj3(res?.data?.data?.dividend_detail?.detail[2])
					setWeb1(res?.data?.data?.URL_receipt)
					setWeb2(res?.data?.data?.URL_calculate)
				} else {
					showError(res?.data?.message);
				}
			});
		} catch (e) {
			console.log("Dividend_Detail.js init error : ", e)
		} finally {
			setIsLoading(false)
		}
	}

	const onOpenUrl = () => {
		try {
			ExpoLinking.openURL(obj1?.image).catch(err =>
				alert('link : ' + item[0]?.image),
			);
		} catch (e) {
			console.log("Dividend_Detail.js onOpenUrl error : ", e)
		}
		if (item.length > 0) {
			ExpoLinking.openURL(item[0]?.image).catch(err =>
				alert('link : ' + item[0]?.image),
			);
		}
	};

	const handleClick = url => {
		ExpoLinking.openURL(encodeURI(url));
	};

	const onLoadList = obj => {
		try {
			var views = [];
			for (var i = 0; i < obj.length; i++) {
				views.push(<RowInfos key={i} {...obj[i]} />);
			}
			return views;
		} catch (e) {
			console.log("Dividend_Detail.js onLoadList error : ", e)
		}
	};

	const scrollEnabled = screenHeight > height;

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
				centerComponent={{ text: "เงินปันผล-เฉลี่ยคืน", style: { color: '#fff' } }}
				innerContainerStyles={{ backgroundColor: Constant?.color?.violet }}
				containerStyle={{
					backgroundColor: Constant?.color?.violet,
					borderBottomColor: Constant?.color?.violet,
				}}
				rightComponent={
					<Icon
						name="infocirlceo"
						type="antdesign"
						color="#fff"
						iconStyle={{ backgroundColor: Constant?.color?.violet }}
						onPress={onOpenUrl}
					/>
				}
			/>

			<View style={styles.body}>
				<LinearGradient
					locations={[0, 0.4]}
					colors={[Constant?.color?.violetlight, Constant?.color?.darkPurple]}
					start={{ x: 0, y: 0 }}
					end={{ x: 0, y: 1 }}
					style={styles.linearGradient}>
					<ScrollView
						style={{ flex: 1 }}
						contentContainerStyle={styles.scrollview}
						scrollEnabled={scrollEnabled}
						onContentSizeChange={onContentSizeChange}>
						<View style={styles.contents}>
							<RowInfo keys="รายละเอียด" name="" />
							<RowInfo keys="ประจำปี : " name={itemData?.AACYEAR} />
							<RowInfo keys="วันที่จ่าย : " name={itemData?.P_DATE} />
							<RowInfo keys="ปันผล(%) : " name={itemData?.DDVRATE} />
							<RowInfo
								keys="เฉลี่ยคืน(%) : "
								name={itemData?.IRFRATE}
							/>
							<RowInfo
								keys="จำนวนคืน : "
								name={itemData?.total_PUNPON_INTREFUND}
							/>
						</View>

						<View>
							<View style={styles.content}>
								<RowInfo keys="รายการ" name="" />
								<RowInfo keys="เงินปันผล : " name={info?.PUNPON} />
								<RowInfo
									keys="เงินเฉลี่ยคืน : "
									name={info?.INTREFUND}
								/>

								{onLoadList(info?.detail)}
								{/*<RowInfos keys="หัก สอค: " name={info?.ADDAMT} />*/}
								<RowInfo
									keys="รวมเป็น : "
									name={info?.total_PUNPON_INTREFUND}
								/>
								<RowInfo
									keys="รวมยอดหัก : "
									name={info?.ISUPREMIUM}
								/>
								<RowInfo
									keys={
										'คงเหลือ เข้าบัญชี ' + info?.bank_name + ' : '
									}
									name={info?.OTHEXP}
									color={Constant?.color?.violet}
								/>
								<SizedBox height={10} />
								<AppButton
									text="ใบเสร็จรายการหัก"
									style={styles.margin}
									onPress={() => handleClick(web1)}
								/>
								<SizedBox height={5} />
								<AppButton
									text="วิธีคิดคำนวนผลและเฉลี่ยคืน"
									style={styles.margin}
									onPress={() => handleClick(web2)}
								/>
								<SizedBox height={10} />
								<AppButton
									text="เปลี่ยนแปลงเลขบัญชีรับปันผล"
									style={styles.margin}
									onPress={() =>
										Actions.push('FormChangeDividend')
									}
								/>
								<SizedBox height={30} />
							</View>
						</View>
					</ScrollView>
				</LinearGradient>
			</View>
			<Dialog
				visible={dialogVisible}
				animationType="fade"
				dialogStyle={{
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: Constant?.color?.transparent,
				}}
				contentStyle={{
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: Constant?.color?.transparent,
				}}
				onTouchOutside={() => setDialogVisible(false)}>
				<View>
					<Image
						source={{
							uri: 'https://dev.crtc-service.com/images/code-dvd-all.jpg',
						}}
						style={{
							width: width - 90,
							height: (width - 90) / 1.5,
							resizeMode: 'cover',
						}}
					/>
				</View>
			</Dialog>
		</AppView>
	);
}

export default useNavigator(Dividend_Detail)

const styles = StyleSheet.create({
	scrollview: {
		flexGrow: 1,
		paddingLeft: 15,
		paddingRight: 15,
	},
	content: {
		flex: 1,
		flexDirection: 'column',
		marginTop: 15,
		marginBottom: 15,
		backgroundColor: Constant.color.white,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: Constant.color.gray,
	},
	margin: {
		marginLeft: 10,
		marginRight: 10,
	},
	contents: {
		flexDirection: 'column',
		marginTop: 15,
		paddingBottom: 15,
		backgroundColor: Constant.color.white,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: Constant.color.gray,
	},
	body: {
		flex: 1,
	},
	linearGradient: {
		flex: 1,
	},
});
