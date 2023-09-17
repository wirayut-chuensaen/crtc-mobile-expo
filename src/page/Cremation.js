import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Icon, Header } from 'react-native-elements';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Constant from '../utils/Constant';
import { AppView } from "../component"
import { SubCremation, SubCremation1 } from "../details"
import { cremationTop } from "../service/Services"
import showError from '../utils/showError';
import useNavigator from '../utils/useNavigator';

const Cremation = ({ navigation, Actions, type }) => {
	const [isLoading, setIsLoading] = useState(false)
	const [index, setIndex] = useState(0)
	const [routes, setRoutes] = useState([
		{ key: 'first', title: 'ใบเสร็จสมาคมฯ' },
		{ key: 'second', title: 'ใบเสร็จสมาคมฯ ฝากหัก' },
	])
	const [cremationTopDetail, setCremationTopDetail] = useState({
		cmtidno: '',
		nxsngkaobal: '0.00',
	})
	const [title, setTitle] = useState("สมาคมฌาปนกิจสงเคราะห์")

	useEffect(() => {
		init()
	}, [])

	const init = async () => {
		try {
			setIsLoading(true)
			await cremationTop(type, (res, done) => {
				// console.log("cremationTop res : ", res?.data)
				if (done && res?.data?.status) {
					setTitle(res?.data?.data?.cremation_title)
					setCremationTopDetail(res?.data?.data?.cremation_top_detail)
				} else {
					showError(res?.data?.message);
				}
			});
		} catch (e) {
			console.log("Cremation.js init error : ", e)
		} finally {
			setIsLoading(false)
		}
	}

	const toBeneficiary = () => {
		Actions.push('Beneficiary', { type: type });
	}

	return (
		<AppView isLoading={isLoading} style={{ flex: 1, backgroundColor: 'white' }}>
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
				centerComponent={{ text: title, style: { color: '#fff' } }}
				innerContainerStyles={{ backgroundColor: Constant?.color?.violet }}
				containerStyle={{
					backgroundColor: Constant?.color?.violet,
					borderBottomColor: Constant?.color?.violet,
				}}
			/>

			<View style={styles.body}>
				<View style={{ padding: 20, ...Constant.color.shadow }}>
					<Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>
						รายละเอียด
					</Text>
					<View style={styles.label}>
						<Text style={{ fontSize: 16 }}>เลขที่สมาคมฯ :</Text>
						<Text style={{ fontSize: 16 }}>
							{cremationTopDetail?.cmtidno}
						</Text>
					</View>

					<View style={styles.label}>
						<Text style={{ fontSize: 16 }}>เงินฝากสงเคราะห์ล่วงหน้า :</Text>
						<Text style={{ fontSize: 16 }}>
							{cremationTopDetail?.nxsngkaobal}
						</Text>
					</View>

					<View style={styles.label}>
						<Text style={{ fontSize: 16 }}>ผู้รับผลประโยชน์ :</Text>
						<TouchableOpacity onPress={toBeneficiary}>
							<Text
								style={{
									textDecorationLine: 'underline',
									color: Constant?.color?.darkPurple,
									fontSize: 16,
								}}>
								ดูผู้รับผลประโยชน์
							</Text>
						</TouchableOpacity>
					</View>
				</View>
				<View style={styles.content}>
					<TabView
						onIndexChange={index => setIndex(index)}
						navigationState={{ index, routes }}
						renderScene={SceneMap({
							first: () => (
								<SubCremation navigation={navigation} Actions={Actions} setIsLoading={setIsLoading} type={type} />
							),
							second: () => (
								<SubCremation1 navigation={navigation} Actions={Actions} setIsLoading={setIsLoading} type={type} />
							),
						})}
						renderTabBar={props => (
							<TabBar
								{...props}
								indicatorStyle={{
									backgroundColor: Constant?.color?.violetlight,
									height: '100%',
								}}
								style={{ backgroundColor: Constant?.color?.cream }}
								renderLabel={({ route, focused, color }) => (
									<Text numberOfLines={1} style={{ color, margin: 8 }}>
										{route?.title}
									</Text>
								)}
							/>
						)}
					/>
				</View>
			</View>
		</AppView>
	);
}

export default useNavigator(Cremation)

const styles = StyleSheet.create({
	content: {
		flex: 1,
		flexDirection: 'column',
		padding: 20,
		backgroundColor: Constant?.color?.white,
	},
	body: {
		flex: 1,
	},
	label: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 8,
		borderBottomWidth: 1,
		borderColor: '#eee',
	},
});
