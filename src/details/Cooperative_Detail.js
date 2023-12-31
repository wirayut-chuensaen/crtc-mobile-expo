import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import * as ExpoLinking from "expo-linking"
import { Icon, Header, Button } from 'react-native-elements';
import Constant from '../utils/Constant';
import { LinearGradient } from 'expo-linear-gradient';
import { RowInfo } from '../items';
import { cooperative_Detail } from "../service/Services"
import useNavigator from '../utils/useNavigator';
import { AppView } from '../component';

const height = Dimensions.get('window').height;

const Cooperative_Detail = ({ navigation, Actions, item }) => {
	const [info, setInfo] = useState({})
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		init()
	}, [])

	const init = async () => {
		try {
			setIsLoading(true)
			await cooperative_Detail(item?.RECNO, (res, err) => {
				if (res?.data?.status == true) {
					setInfo(res?.data?.data?.net_bill[0])
				} else {
				}
			});
		} catch (e) {
			console.log("Cooperatives_Detail.js init error : ", e)
		} finally {
			setIsLoading(false)
		}
	}

	const handleClick = (url) => {
		ExpoLinking.openURL(encodeURI(url));
	};

	return (
		<AppView isLoading={isLoading} style={{ flex: 1 }}>
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
				centerComponent={{ text: "ใบเสร็จ (สหกรณ์ฯ)", style: { color: '#fff' } }}
				innerContainerStyles={{ backgroundColor: Constant?.color?.violet }}
				containerStyle={{
					backgroundColor: Constant?.color?.violet,
					borderBottomColor: Constant?.color?.violet,
				}}
			/>

			<View style={styles.body}>
				<LinearGradient
					locations={[0, 0.4]}
					colors={[Constant?.color?.violetlight, Constant?.color?.darkPurple]}
					start={{ x: 0, y: 0 }}
					end={{ x: 0, y: 1 }}
					style={styles.linearGradient}>
					<View style={styles.content}>
						<RowInfo keys="รายละเอียด" name="" />
						<RowInfo keys="เลขที่ใบเสร็จ : " name={info?.BILL_NO} />
						<RowInfo
							keys="วันที่ออกใบเสร็จ : "
							name={info?.BILL_DATE}
						/>
						<RowInfo keys="เลขสมาชิก : " name={info?.MEM_ID} />
						<RowInfo
							keys="ชื่อ - สกุล : "
							name={info?.DISBURSE_NAME}
						/>
						{/*<RowInfo keys="วงเงินค้ำฯ : " name={info?.STOCK_BAL} />*/}
						<RowInfo
							keys="ยอดหักรวม : "
							name={info?.AMOUNT}
							color={Constant?.color?.violet}
						/>
							<Button
								title="ดูใบเสร็จและสั่งพิมพ์"
								titleStyle={{ color: Constant?.color?.white }}
								buttonStyle={styles.Button}
								onPress={() => handleClick(info?.URL)}
							/>
					</View>
				</LinearGradient>
			</View>
		</AppView>
	);
}

export default useNavigator(Cooperative_Detail)

const styles = StyleSheet.create({
	content: {
		flex: 1,
		flexDirection: 'column',
		marginTop: 15,
		backgroundColor: Constant.color.white,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: Constant.color.gray,
	},
	body: {
		height: height - 80,
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
});
