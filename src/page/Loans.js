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
import { RowInfo, ItemLoan } from '../items';
import { loan } from "../service/Services"
import { AppView } from '../component';
import useNavigator from '../utils/useNavigator';

const width = Dimensions.get('window').width;

const Loans = ({ navigation, Actions }) => {
	const [isLoading, setIsLoading] = useState(false)
	const [refreshing, setRefreshing] = useState(false)
	const [item, setItem] = useState([])

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
			await loan((res, done) => {
				if (done && res?.data?.status == true) {
					setItem(res?.data?.data?.loan)
				}
			});
		} catch (e) {
			console.log("Loans.js initialData error : ", e)
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
				centerComponent={{ text: "เงินกู้", style: { color: '#fff' } }}
				innerContainerStyles={{ backgroundColor: Constant?.color?.violet }}
				containerStyle={{
					backgroundColor: Constant?.color?.violet,
					borderBottomColor: Constant?.color?.violet,
				}}
			/>

			<View style={styles.body}>
				<View style={styles.content}>
					<RowInfo keys="ข้อมูลเงินกู้" name="" />
					<FlatList
						itemDimension={width - 20}
						data={item}
						numColumns={1}
						keyExtractor={(data, index) => `item_${index}`}
						refreshing={refreshing}
						onRefresh={() => initialData(true)}
						ListFooterComponent={() => <View style={styles.spaceHeight} />}
						renderItem={({ item, index }) => (
							<TouchableOpacity
								onPress={() =>
									Actions.push('Loan_Detail', { item })
								}>
								<ItemLoan {...item} />
							</TouchableOpacity>
						)}
					/>
				</View>
			</View>
		</AppView>
	);
}

export default useNavigator(Loans)

const styles = StyleSheet.create({
	content: {
		flex: 1,
		flexDirection: 'column',
		paddingTop: 15,
		backgroundColor: Constant?.color?.white,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: Constant?.color?.gray,
	},
	container: {
		flex: 1
	},
	body: {
		flex: 1
	},
});
