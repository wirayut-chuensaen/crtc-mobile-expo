import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	Dimensions,
	View,
	TouchableOpacity,
	FlatList,
	Text,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppCarousel from "../AppCarousel"
import { ItemMenu } from '../../items';
import { home, account, linkAccountStatus, checkCondition } from "../../service/Services"
import { Header, AppView } from '../../component';
import { Tab } from '../Launcher';
import * as Application from 'expo-application';
import Constant from "../../utils/Constant"
import showError from '../../utils/showError';

const width = Dimensions.get('window').width;

const baseLocalImagePath = "../../../assets/"

const menuList = [
	{
		icon: require(`${baseLocalImagePath}1.png`),
		name: 'ข้อมูลทั่วไปและสวัสดิการ',
		action: 1,
	},
	{
		icon: require(`${baseLocalImagePath}2.png`),
		name: 'สมาคม',
		action: 7,
	},
	{
		icon: require(`${baseLocalImagePath}5.png`),
		name: 'การค้ำประกัน',
		action: 5,
	},
	{
		icon: require(`${baseLocalImagePath}6.png`),
		name: 'ใบเสร็จ',
		subTitle: '(สหกรณ์)',
		action: 6,
	},
	{
		icon: require(`${baseLocalImagePath}7.png`),
		name: 'ข้อมูลหุ้น',
		action: 2,
	},
	{
		icon: require(`${baseLocalImagePath}8.png`),
		name: 'เงินปันผล',
		subTitle: 'เฉลี่ยคืน',
		action: 8,
	},
	{
		icon: require(`${baseLocalImagePath}9.png`),
		name: 'ส่งคำขอกู้ออนไลน์',
		action: 9,
		iconStyle: { opacity: 0.5 },
	},
	{
		icon: require(`${baseLocalImagePath}12.png`),
		name: 'ฝากเงินเข้าบัญชีสหกรณ์',
		action: 12,
		iconStyle: { opacity: 0.5 },
	},
	{
		icon: require(`${baseLocalImagePath}10.png`),
		name: 'ขอกู้เงินสหกรณ์',
		action: 10,
		iconStyle: { opacity: 0.5 },
	},
	{
		icon: require(`${baseLocalImagePath}11.png`),
		name: 'ถอนเงินฝากบัญชีสหกรณ์',
		action: 11,
		iconStyle: { opacity: 0.5 },
	},
];

const Home = ({ navigation, route, onLoadingChange }) => {
	const [slider, setSlider] = useState([]);

	useEffect(() => {
		onLoadData();
	}, []);

	const checkLinkAccount = async (callback) => {
		try {
			onLoadingChange(true);
			await linkAccountStatus((res, done) => {
				// console.log("linkAccountStatus res : ", res);
				if (done && res?.data?.status) {
					callback && callback();
				} else {
					showError(res?.data?.message);
					navigation.navigate('CoopAccountNotLink', {
						url: res?.data?.data["link-account-url"],
					});
				}
			})
		} catch (e) {
			console.log("Home.js checkLinkAccount error : ", e)
		} finally {
			onLoadingChange(false)
		}
	}

	const onHandleMenu = item => {
		switch (item?.action) {
			case 1:
				return navigation.navigate('Infomations');
			case 2:
				return navigation.navigate('Share');
			case 5:
				return navigation.navigate('Warrantee');
			case 6:
				return navigation.navigate('Cooperatives');
			case 7:
				return navigation.navigate('CremationsList');
			case 8:
				return navigation.navigate('Dividend');
			case 9:
				return navigation.navigate('RequestLoanList');
			// case 10:
			//   return checkLinkAccount(() => {
			//     navigation.navigate('FormCoopLoan');
			//   })
			case 10:
				return navigation.navigate('FormCoopLoan');
			case 11:
				return checkLinkAccount(() => {
					navigation.navigate('FormCoopWithdraw');
				})
			case 12:
				return checkLinkAccount(() => {
					navigation.navigate('FormCoopDeposit');
				})
		}
	};

	const checkVerifyPin = async () => {
		try {
			onLoadingChange(true)
			await account((res, done) => {
				// console.log('account res : ', res)
				if (done && res?.data?.status) {
					checkCondition((res, done) => {
						if (done && res?.data?.status) {
							onLoadingChange(false)
						} else {
							navigation.navigate('TermAndCondition', { tab: Tab.HOME });
						}
					})
				} else {
					return navigation.navigate('VerifyPin', {
						tab: Tab.HOME,
						canBack: false,
						checkCondition: true
					});
				}
			});
		} catch (e) {
			console.log("Home.js checkVerifyPin error : ", e)
		} finally {
			onLoadingChange(false)
		}
	};

	const onLoadData = async () => {
		try {
			onLoadingChange(true)
			home(async (res, done) => {
				if (res.data.status === true || !done) {
					setSlider(res?.data?.data?.slider);
					checkVerifyPin();
				} else {
					if (res?.response?.status === 401) {
						await AsyncStorage.clear();
						navigation.replace('Authen');
					}
				}
			});
		} catch (e) {
			console.log("Home.js onLoadData error : ", e)
		} finally {
			onLoadingChange(false)
		}
	};

	const _renderFooter = () => (
		<View style={styles.spaceFooter}>
			<Text style={styles.itemFooter}>
				Chiangrai Teacher Saving and Credit Cooperative Ltd.
				{'\n'} Version {Application?.nativeApplicationVersion}
			</Text>
		</View>
	);

	return (
		<AppView style={{ flex: 1, paddingTop: 30 }}>
			<View style={styles.contentslider}>
				<AppCarousel imageList={slider} />
			</View>
			<Header onSetting={() => navigation.navigate('Settings')} />
			<View style={styles.contentMenu}>
				<FlatList
					showsVerticalScrollIndicator={false}
					data={menuList}
					keyExtractor={(data, index) => `menu_${index}`}
					ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
					ListFooterComponent={_renderFooter}
					bounces={true}
					onEndReachedThreshold={0.5}
					renderItem={({ item, index }) => (
						<TouchableOpacity
							activeOpacity={0.9}
							onPress={() => onHandleMenu(item)}>
							<ItemMenu {...item} />
						</TouchableOpacity>
					)}
				/>
			</View>
		</AppView>
	);
};

export default Home;

const styles = StyleSheet.create({
	contentslider: {
		width: width,
		height: width / 5.3,
		marginVertical: 20,
	},
	contentMenu: {
		flexDirection: 'column',
		flex: 1,
	},
	scrollview: {
		flexGrow: 1,
	},
	itemFooter: {
		textAlign: 'center',
		color: Constant?.color?.white,
		marginHorizontal: 10,
		marginVertical: 20,
	},
	spaceFooter: {
		height: 100,
	},
});
