import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	Dimensions,
	Text,
	View,
	FlatList,
	TouchableOpacity,
} from 'react-native';
import { Icon, Header } from 'react-native-elements';
import Constant from '../utils/Constant';
import { RowInfo, ItemDividend } from '../items';
import { dividend } from "../service/Services"
import { AppView } from '../component';
import useNavigator from '../utils/useNavigator';
import showError from '../utils/showError';

const width = Dimensions.get('window').width;

const Dividend = ({ navigation, Actions }) => {
	const [text, setText] = useState("")
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
			await dividend((res, err) => {
				console.log("dividend res : ", res)
				if (res?.data?.status == true) {
					setText(res?.data?.data?.text)
					setItem(res?.data?.data?.dividend)
				} else {
					showError("เกิดข้อผิดพลาด")
				}
			});
		} catch (e) {
			console.log("Dividend.js onLoadData error : ", e)
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

				centerComponent={{ text: "เงินปันผล-เฉลี่ยคืน", style: { color: '#fff' } }}
				innerContainerStyles={{ backgroundColor: Constant?.color?.violet }}
				containerStyle={{
					backgroundColor: Constant?.color?.violet,
					borderBottomColor: Constant?.color?.violet,
				}}
			/>

			<View style={styles.body}>
				<View style={styles.contents}>
					<RowInfo keys="ข้อมูลการรับเงินปันผล-เฉลี่ยคืน" name="" />

					<View style={{ padding: 10, paddingLeft: 20, paddingRight: 20 }}>
						<Text>{text}</Text>
					</View>
				</View>
				<View style={styles.content}>
					<RowInfo keys="รายการ" name="" br={false} />
					<FlatList
						itemDimension={width - 20}
						data={item}
						numColumns={1}
						keyExtractor={(item, index) => `${item.id}_${index}`}
						refreshing={refreshing}
						onRefresh={() => onLoadData(true)}
						renderItem={({ item, index }) => (
							<TouchableOpacity
								onPress={() =>
									Actions.push('Dividend_Detail', { item })
								}>
								<ItemDividend {...item} />
							</TouchableOpacity>
						)}
					/>
				</View>
			</View>
		</AppView>
	);
}

export default useNavigator(Dividend)

const styles = StyleSheet.create({
	content: {
		flex: 1,
		flexDirection: 'column',
		marginTop: 15,
		borderRadius: 5,
	},
	contents: {
		flexDirection: 'column',
		paddingTop: 15,
		paddingBottom: 15,
		backgroundColor: Constant?.color?.white,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: Constant?.color?.gray,
	},
	body: {
		flex: 1,
	},
});
