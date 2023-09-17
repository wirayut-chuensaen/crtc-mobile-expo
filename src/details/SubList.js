import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
	FlatList,
	ActivityIndicator,
} from 'react-native';
import Constant from '../utils/Constant';
import { ItemWarrantee } from '../items';
import { warranteeMe } from "../service/Services"

const SubList = ({ navigation, Actions }) => {
	const [item, setItem] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [refreshing, setRefreshing] = useState(false)

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
			await warranteeMe((res, err) => {
				// console.log("warranteeMe res : ", res)
				if (res?.data?.status == true) {
					setItem(res?.data?.data?.guarantee_me)
				}
			});
		} catch (e) {
			console.log("SubList.js onLoadData error : ", e)
		} finally {
			setIsLoading(false)
			setRefreshing(false)
		}
	}

	return (
		<View style={styles.content}>
			{
				!isLoading ?
					<FlatList
						data={item}
						numColumns={1}
						keyExtractor={(data, index) => `item_${index}`}
						refreshing={refreshing}
						onRefresh={() => onLoadData(true)}
						renderItem={({ item, index }) => (
							<TouchableOpacity
								onPress={() =>
									Actions.push('Warrantee_Detail', { item, isWarranteeWho: false })
								}>
								<ItemWarrantee {...item} />
							</TouchableOpacity>
						)}
					/>
					:
					<View style={{ justifyContent: "center", alignItems: "center", marginVertical: "50%" }}>
						<ActivityIndicator size="large" color={Constant?.color?.violet} />
					</View>
			}
		</View>
	);
}

export default SubList

const styles = StyleSheet.create({
	content: {
		flex: 1,
		marginTop: 10,
		flexDirection: 'column',
		backgroundColor: Constant?.color?.white,
		borderRadius: 5,
	},
});
