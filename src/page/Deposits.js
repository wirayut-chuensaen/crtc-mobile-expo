import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	Dimensions,
	View,
	FlatList,
	TouchableOpacity,
} from 'react-native';
import { Icon, Header } from 'react-native-elements';
import Constant from '../utils/Constant';
import { AppView } from '../component';
import { RowInfo, ItemInfo } from '../items';
import { savemas } from "../service/Services"
import useNavigator from '../utils/useNavigator';

const width = Dimensions.get('window').width;

const Deposits = ({ navigation, Actions }) => {
	const [isLoading, setIsLoading] = useState(false)
	const [item, setItem] = useState([])
	const [refreshing, setRefreshing] = useState(false)

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
			await savemas((res, done) => {
				// console.log("savemas res : ", res)
				if (done && res?.data?.status == true) {
					setItem(res?.data?.data?.savemas || [])
				}
			});
		} catch (e) {
			console.log("Deposits.js onLoadData error : ", e)
		} finally {
			setIsLoading(false)
			setRefreshing(false)
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

				centerComponent={{ text: "เงินฝาก", style: { color: '#fff' } }}
				innerContainerStyles={{ backgroundColor: Constant?.color?.violet }}
				containerStyle={{
					backgroundColor: Constant?.color?.violet,
					borderBottomColor: Constant?.color?.violet,
				}}
			/>

			<View style={styles.body}>
				<View style={styles.content}>
					<RowInfo keys="ข้อมูลการฝากเงิน" name="" />
					<FlatList
						itemDimension={width - 20}
						data={item}
						numColumns={1}
						keyExtractor={(data, index) => `item_${index}`}
						refreshing={refreshing}
						onRefresh={() => onLoadData(true)}
						ListFooterComponent={() => <View style={styles.spaceHeight} />}
						renderItem={({ item, index }) => (
							<TouchableOpacity
								onPress={() =>
									Actions.push('Savemas_Detail', { item })
								}>
								<ItemInfo {...item} />
							</TouchableOpacity>
						)}
					/>
				</View>
			</View>
		</AppView>
	);
}

export default useNavigator(Deposits)

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	content: {
		flex: 1,
		flexDirection: 'column',
		paddingTop: 15,
		backgroundColor: Constant?.color?.white,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: Constant?.color?.gray,
	},
	body: {
		flex: 1,
	},
	spaceHeight: {
		height: 20
	},
});
