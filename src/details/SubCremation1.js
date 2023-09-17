import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	Dimensions,
	View,
	FlatList,
	TouchableOpacity,
	ActivityIndicator,
} from 'react-native';
import Constant from '../utils/Constant';
import { RowInfo, ItemCremation } from '../items';
import { cremationDeduct } from "../service/Services"

const width = Dimensions.get('window').width;

const SubCremation1 = ({ navigation, Actions, type }) => {
	const [title, setTitle] = useState("")
	const [item, setItem] = useState([])
	const [refreshing, setRefreshing] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		onLoadData();
	}, [])

	const onLoadData = async (isRefresh = false) => {
		try {
			if (!isRefresh) {
				setIsLoading(true)
			} else {
				setRefreshing(true)
			}
			await cremationDeduct(type, (res, err) => {
				// console.log("cremationDeduct res : ", res)
				if (res?.data?.status == true) {
					setTitle(res?.data?.cremation_title)
					setItem(res?.data?.data?.cremation)
				}
			});
		} catch (e) {
			console.log("SubCremation1 onLoadData error : ", e)
		} finally {
			setRefreshing(false)
			setIsLoading(false)
		}
	}

	return (
		<View style={styles.content}>
			<RowInfo keys="ใบเสร็จประจำเดือนของสมาคมฌาปนกิจสงเคราะห์" name="" />
			{
				!isLoading ?
					<FlatList
						itemDimension={width - 20}
						data={item}
						numColumns={1}
						keyExtractor={(data, index) => `item${index}`}
						refreshing={refreshing}
						onRefresh={() => onLoadData(true)}
						renderItem={({ item, index }) => (
							<TouchableOpacity
								onPress={() =>
									Actions.push('Cremation_Detail', { item, type: "deduct", cremention_type_id: type })
								}>
								<ItemCremation {...item} />
							</TouchableOpacity>
						)}
					/>
					:
					<View style={{ justifyContent: "center", alignItems: "center", marginVertical: "30%" }}>
						<ActivityIndicator size="large" color={Constant?.color?.violet} />
					</View>
			}
		</View>
	);
}

export default SubCremation1

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
});
