import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	Dimensions,
} from 'react-native';
import { Icon, Header } from 'react-native-elements';
import { beneficiary } from "../service/Services"
import Constant from '../utils/Constant';
import { ItemBeneficiary } from '../items';
import showError from '../utils/showError';
import useNavigator from '../utils/useNavigator';

const width = Dimensions.get('window').width;

const Beneficiary = ({ navigation, Actions, type }) => {
	const [isLoading, setIsLoading] = useState(false)
	const [item, setItem] = useState([])
	const [refreshing, setRefreshing] = useState(false)

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
			await beneficiary(type, (res, done) => {
				// console.log("beneficiary res : ", res)
				if (done && res?.data?.status) {
					setItem(res?.data?.data?.beneficiaries)
				} else {
					showError(res?.data?.message);
				}
			});
		} catch (e) {
			console.log("Beneficiary.js initialData error : ", e)
		} finally {
			setIsLoading(false)
			setRefreshing(false)
		}
	}

	return (
		<View style={{ flex: 1, backgroundColor: 'white' }}>
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
				centerComponent={{ text: "ผู้รับผลประโยชน์", style: { color: '#fff' } }}
				innerContainerStyles={{ backgroundColor: Constant?.color?.violet }}
				containerStyle={{
					backgroundColor: Constant?.color?.violet,
					borderBottomColor: Constant?.color?.violet,
				}}
			/>

			<View style={styles.body}>
				<View style={styles.content}>
					<Text style={{ fontWeight: 'bold', fontSize: 16 }}>
						ผู้รับผลประโยชน์
					</Text>
					<FlatList
						itemDimension={width - 20}
						data={item}
						numColumns={1}
						keyExtractor={(data, index) => `item${index}`}
						refreshing={refreshing}
						onRefresh={() => initialData(true)}
						renderItem={({ item, index }) => (
							<View>
								<ItemBeneficiary {...item} />
							</View>
						)}
					/>
				</View>
			</View>
		</View>
	);
}

export default useNavigator(Beneficiary)

const styles = StyleSheet.create({
	body: {
		flex: 1,
		paddingHorizontal: 20,
	},
	content: {
		flex: 1,
		flexDirection: 'column',
		marginTop: 15,
		backgroundColor: Constant.color.white,
	},

	contents: {
		flexDirection: 'column',
		marginTop: 15,
		backgroundColor: Constant.color.white,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: Constant.color.gray,
	},
	wapper_content: {
		flex: 1,
	},
	linearGradient: {
		flex: 1,
		paddingLeft: 15,
		paddingRight: 15,
	},
	Button: {
		margin: 10,
		marginBottom: 15,
		marginTop: 15,
		backgroundColor: Constant.color.violetlight,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: Constant.color.white,
	},
});
