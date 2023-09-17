import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	Dimensions,
	View,
	FlatList,
	TouchableOpacity,
} from 'react-native';
import { Icon, Header } from 'react-native-elements';
import Constant from '../utils/Constant';
import { RowInfo, ItemCooperative } from '../items';
import { netbill } from "../service/Services"
import { AppView } from '../component';
import useNavigator from '../utils/useNavigator';

const width = Dimensions.get('window').width;

const Cooperatives = ({ navigation, Actions }) => {
	state = {
		item: [],
		refreshing: false,
	};
	const [item, setItem] = useState([])
	const [refreshing, setRefreshing] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		initialData()
	}, [])

	const initialData = async (isRefresh = false) => {
		try {
			if (!isRefresh) {
				setIsLoading(true)
			} else {
				setRefreshing(true)
			}
			await netbill((res, done) => {
				// console.log("netbill res : ", res)
				if (done && res?.data?.status == true) {
					setItem(res?.data?.data?.netBill)
				}
			});
		} catch (e) {
			console.log("Cooperatives.js initialData error : ", e)
		} finally {
			setIsLoading(false)
			setRefreshing(false)
		}
	}

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
				centerComponent={{ text: "ใบเสร็จ (สหกรณ์ฯ)", style: { color: '#fff' } }}
				innerContainerStyles={{ backgroundColor: Constant?.color?.violet }}
				containerStyle={{
					backgroundColor: Constant?.color?.violet,
					borderBottomColor: Constant?.color?.violet,
				}}
			/>

			<View style={styles.body}>
				<View style={styles.content}>
					<RowInfo keys="ใบเสร็จประจำเดือนของสหกรณ์ฯ" name="" />
					<FlatList
						itemDimension={width - 20}
						data={item}
						numColumns={1}
						keyExtractor={(data, index) => `item_${index}`}
						refreshing={refreshing}
						onRefresh={() => initialData(true)}
						renderItem={({ item, index }) => (
							<TouchableOpacity
								onPress={() =>
									Actions.push('Cooperative_Detail', { item })
								}>
								<ItemCooperative {...item} />
							</TouchableOpacity>
						)}
					/>
				</View>
			</View>
		</AppView>
	);
}

export default useNavigator(Cooperatives)

const styles = StyleSheet.create({
	content: {
		flex: 1,
		flexDirection: 'column',
		paddingTop: 15,
		backgroundColor: Constant.color.white,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: Constant.color.gray,
	},
	body: {
		flex: 1,
	},
});
