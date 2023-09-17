import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import * as ExpoLinking from "expo-linking"
import { Icon, Header, Button } from 'react-native-elements';
import Constant from '../utils/Constant';
import { LinearGradient } from 'expo-linear-gradient';
import { RowInfo } from '../items';
import { cremation_Detail, cremationDeductDetail } from "../service/Services"
import useNavigator from '../utils/useNavigator';
import { AppView } from '../component';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const Cremation_Detail = ({ navigation, Actions, type, item, cremention_type_id }) => {
	const [title, setTitle] = useState("ใบเสร็จ (สมาคมฯ)")
	const [info, setInfo] = useState({})
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		init()
	}, [])

	const init = async () => {
		try {
			setIsLoading(true)
			const id = item?.billno;
			if (type == 'deduct') {
				await cremationDeductDetail(id, cremention_type_id, (res, done) => {
					// console.log("cremationDeductDetail res : ", res)
					if (done && res?.data?.status == true) {
						setInfo(res?.data?.data?.cremation[0])
						setTitle(res?.data?.data?.cremation_title)
					}
				});
			} else {
				await cremation_Detail(id, cremention_type_id, (res, done) => {
					// console.log("cremation_Detail res : ", res)
					if (done && res?.data?.status == true) {
						setInfo(res?.data?.data?.cremation_detail[0])
						setTitle(res?.data?.data?.cremation_title)
					}
				});
			}
		} catch (e) {
			console.log("Cremation_Detail.js init error : ", e)
		} finally {
			setIsLoading(false)
		}
	}

	const handleClick = (url) => {
		ExpoLinking.openURL(encodeURI(url));
	};

	return (
		<AppView isLoading={isLoading} style={styles.container}>
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
				<LinearGradient
					locations={[0, 0.4]}
					colors={[Constant?.color?.violetlight, Constant?.color?.darkPurple]}
					start={{ x: 0, y: 0 }}
					end={{ x: 0, y: 1 }}
					style={styles.linearGradient}>
					<View style={styles.content}>
						<RowInfo keys="รายละเอียด" name="" />
						<RowInfo keys="เลขที่ใบเสร็จ : " name={info?.billno} />
						<RowInfo
							keys="วันที่ออกใบเสร็จ : "
							name={info?.cshindate}
						/>
						<RowInfo
							keys="เลขที่สมาคมฯ : "
							name={info?.dductdivid}
						/>
						<RowInfo keys="รายการ : " name={info?.corpse} />
						<RowInfo
							keys="จำนวนเงิน : "
							name={info?.totpay}
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

export default useNavigator(Cremation_Detail)

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
