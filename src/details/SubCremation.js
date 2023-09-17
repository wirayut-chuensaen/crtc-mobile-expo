import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	Dimensions,
	View,
	FlatList,
	TouchableOpacity,
	Text,
	ActivityIndicator,
} from 'react-native';
import Constant from '../utils/Constant';
import { cremation } from "../service/Services"
import { ItemCremation } from '../items';

const width = Dimensions.get('window').width;

const SubCremation = ({ navigation, Actions, type }) => {
	const [item, setItem] = useState([])
	const [refreshing, setRefreshing] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		onLoadData()
	}, [])

	const onLoadData = async (isRefresh = false) => {
		try {
			if (!isRefresh) {
				setIsLoading(true)
			} else {
				setRefreshing(true)
			}
			await cremation(type, (res, err) => {
				// console.log("cremation res : ", res)
				if (res?.data?.status == true) {
					setItem(res?.data?.data?.cremation)
				}
			});
		} catch (e) {
			console.log("Subcremation.js onLoadData error : ", e)
		} finally {
			setIsLoading(false)
			setRefreshing(false)
		}
	}

	return (
		<View style={styles.content}>
			<Text style={{ fontWeight: 'bold', fontSize: 16 }}>
				ประวัติการชำระเงินสงเคราะห์
			</Text>
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
								key={index}
								onPress={() =>
									Actions.push('Cremation_Detail', { item, cremention_type_id: type })
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

export default SubCremation

const styles = StyleSheet.create({
	content: {
		flex: 1,
		flexDirection: 'column',
		marginTop: 15,
		backgroundColor: Constant.color.white,
	},
});
