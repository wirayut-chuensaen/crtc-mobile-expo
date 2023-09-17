import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Icon, Header } from 'react-native-elements';
import Constant from '../utils/Constant';
import { RowInfo, ItemWelfare } from '../items';
import { personalData } from "../service/Services"
import { AppView } from '../component';
import useNavigator from '../utils/useNavigator';

const Infomations = ({ navigation, Actions }) => {
	const [info, setInfo] = useState({});
	const [welfare, setWelfare] = useState([]);
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		onLoadData();
	}, []);

	const onLoadData = async () => {
		try {
			setIsLoading(true)
			await personalData((res, done) => {
				const { status, data } = res?.data;
				console.log("personalData res : ", res)
				if (done && status === true) {
					setInfo(data.history_data);
					setWelfare(data.welfare);
				}
			});
		} catch (e) {
			console.log("Information.js onLoadData error : ", e)
		} finally {
			setIsLoading(false)
		}
	};

	const _renderWelfareItem = ({ item, index }) => {
		return <ItemWelfare {...item} />;
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
						onPress={() => navigation.goBack()}
					/>
				}

				centerComponent={{ text: "ข้อมูลทั่วไปและสวัสดิการ", style: { color: '#fff' } }}
				innerContainerStyles={{ backgroundColor: Constant?.color?.violet }}
				containerStyle={{
					backgroundColor: Constant?.color?.violet,
					borderBottomColor: Constant?.color?.violet,
				}}
			/>

			<View style={styles.body}>
				<FlatList
					ListHeaderComponent={(
						<View style={styles.content}>
							<RowInfo keys="ข้อมูลส่วนตัวสมาชิก" name="" />
							<RowInfo keys="ชื่อ - นามสกุล : " name={info?.MNAME} />
							<RowInfo keys="เลขทะเบียน : " name={info?.MEM_ID} />
							<RowInfo keys="วันเกิด : " name={info?.BIRTHDAY} />
							<RowInfo keys="อายุ : " name={info?.age} />
							<RowInfo keys="เงินเดือน : " name={info?.SALARY} />
							<RowInfo keys="วันที่เป็นสมาชิก : " name={info?.APPLY_DATE} />
							<RowInfo keys="หน่วยงาน : " name={info?.NAME} />
							<RowInfo keys="ทุนเรือนหุ้น : " name={info?.BALANCE} />
							<RowInfo keys="ค่าหุ้นรายเดือน : " name={info?.PAYMENT} />
							<RowInfo keys="จำนวนงวด : " name={info?.INSTALMENT} />
							<View style={{ height: 20 }} />
							<RowInfo keys="สวัสดิการของสมาชิก" name="" br={false} />
						</View>
					)}
					data={welfare}
					keyExtractor={(data, index) => `welfare_${index}`}
					renderItem={_renderWelfareItem}
				/>
			</View>
		</AppView>
	);
};

export default useNavigator(Infomations);

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	body: {
		flex: 1,
		backgroundColor: Constant?.color?.white
	},
	content: {
		flexDirection: 'column',
		marginTop: 15,
		borderRadius: 5,
		paddingBottom: 10,
	},
	welfare: {
		marginBottom: 20,
	},
});
