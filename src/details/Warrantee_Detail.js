import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { Icon, Header } from 'react-native-elements';
import Constant from '../utils/Constant';
import { LinearGradient } from 'expo-linear-gradient';
import { RowInfo } from '../items';
import { warranteeMe_Detail, warranteeWho_Detail } from "../service/Services"
import useNavigator from '../utils/useNavigator';
import { AppView } from '../component';

const height = Dimensions.get('window').height;

const Warrantee_Detail = ({ navigation, Actions, item, isWarranteeWho = false }) => {
	const [info, setInfo] = useState({})
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		init()
	}, [])

	const init = async () => {
		try {
			setIsLoading(true)
			if (!isWarranteeWho) {
				await warranteeMe_Detail(item?.RECNO, (res, err) => {
					if (res?.data?.status == true) {
						setInfo(res?.data?.data?.guarantee_me_datail[0])
					}
				});
			} else {
				await warranteeWho_Detail(item?.RECNO, (res, err) => {
					if (res?.data?.status == true) {
						setInfo(res?.data?.data?.guarantee_who_datail[0])
					}
				});
			}
		} catch (e) {
			console.log("Warrantee_Detail.js init error : ", e)
		} finally {
			setIsLoading(false)
		}
	}

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
				centerComponent={{ text: "การค้ำประกัน", style: { color: '#fff' } }}
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
						{/*<RowInfo keys="ประเภทสัญญา : " name={info?.loan_type} />*/}
						<RowInfo keys="เลขที่สัญญา : " name={info?.LOAN_NO} />
						<RowInfo
							keys="วันที่ทำสัญญา : "
							name={info?.APPLY_DATE}
						/>
						<RowInfo keys="เลขที่สมาชิก : " name={info?.MEM_ID} />
						<RowInfo
							keys="ชื่อ - สกุล ผู้กู้ : "
							name={!isWarranteeWho ? info?.WARRNAME : info?.MNAME}
						/>
						<RowInfo keys="วงเงินค้ำฯ : " name={info?.AMOUNT} />
						<RowInfo
							keys="หนี้คงเหลือ : "
							name={info?.BALANCE}
							color={Constant?.color?.violet}
						/>
					</View>
				</LinearGradient>
			</View>
		</AppView>
	);
}

export default useNavigator(Warrantee_Detail)

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
});
