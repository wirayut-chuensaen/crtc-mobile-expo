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
import { LinearGradient } from 'expo-linear-gradient';
import { RowInfo, ItemCremation } from '../items';
import { cremation } from "../service/Services"
import useNavigator from '../utils/useNavigator';
import { AppView } from '../component';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const Cremations = ({ navigation, Actions, type }) => {
	const [title, setTitle] = useState("");
	const [item, setItem] = useState([]);
	const [refreshing, setRefreshing] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		initialData();
	}, [])

	const initialData = async (isRefresh = false) => {
		try {
			if (!isRefresh) {
				setIsLoading(true)
			} else {
				setRefreshing(true)
			}
			await cremation(type, (res, done) => {
				// console.log("cremations res : ", res)
				if (done && res?.data?.status === true) {
					setItem(res?.data?.data?.cremation)
				}
			});
		} catch (e) {
			console.log("Cremations initialData error : ", e)
		} finally {
			setIsLoading(false)
			setRefreshing(false)
		}
	}

	return (
		<AppView isLoading={isLoading}>
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
				centerComponent={{ text: title, style: { color: '#fff' } }}
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
						<RowInfo
							keys="ใบเสร็จประจำเดือนของสมาคมฌาปนกิจสงเคราะห์"
							name=""
						/>
						<FlatList
							itemDimension={width - 20}
							data={item}
							style={styles.gridView}
							numColumns={1}
							keyExtractor={(data, index) => `item${index}`}
							refreshing={refreshing}
							onRefresh={() => initialData(true)}
							renderItem={({ item, index }) => (
								<TouchableOpacity
									onPress={() =>
										Actions.push.navigate('Cremation_Detail', { item, cremention_type_id: type })
									}>
									<ItemCremation {...item} />
								</TouchableOpacity>
							)}
						/>
					</View>
				</LinearGradient>
			</View>
		</AppView>
	);
}

export default useNavigator(Cremations);

const styles = StyleSheet.create({
	content: {
		flex: 1,
		flexDirection: 'column',
		marginTop: 15,
		backgroundColor: Constant?.color?.white,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: Constant?.color?.gray,
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
