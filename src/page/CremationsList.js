import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	Dimensions,
	View,
	FlatList,
} from 'react-native';
import { Icon, Header } from 'react-native-elements';
import Constant from '../utils/Constant';
import { LinearGradient } from 'expo-linear-gradient';
import { cremationType } from "../service/Services"
import { AppButton, SizedBox, AppView } from '../component';
import useNavigator from '../utils/useNavigator';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const CreamtionsList = ({ navigation, Actions }) => {
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
			await cremationType((res, done) => {
				// console.log("cremationType res : ", res)
				if (done && res?.data?.status === true) {
					setItem(res?.data?.cremation_type)
				}
			});
		} catch (e) {
			console.log("CremationsList initialData error : ", e)
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
				centerComponent={{ text: "สมาคม", style: { color: '#fff' } }}
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
						<FlatList
							itemDimension={width - 20}
							data={item}
							style={styles.gridView}
							numColumns={1}
							keyExtractor={(data, index) => `item${index}`}
							ItemSeparatorComponent={() => <SizedBox height={10} />}
							ListHeaderComponent={() => <SizedBox height={20} />}
							refreshing={refreshing}
							onRefresh={() => initialData(true)}
							renderItem={({ item, index }) => (
								<AppButton text={item.name} onPress={() =>
									Actions.push('Cremations', { type: item?.id })
								} />
							)}
						/>
					</View>
				</LinearGradient>
			</View>
		</AppView>
	);
}

export default useNavigator(CreamtionsList)

const styles = StyleSheet.create({
	gridView: {
		marginHorizontal: 10,
	},
	content: {
		flex: 1,
		flexDirection: 'column',
		marginTop: 15,
		backgroundColor: Constant.color.white,
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
