import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	Dimensions,
	View,
	Image,
	FlatList,
} from 'react-native';
import { Icon, Header, Dialog } from 'react-native-elements';
import * as ExpoLinking from "expo-linking"
import Constant from '../utils/Constant';
import { LinearGradient } from 'expo-linear-gradient';
import { RowInfo, ItemLoanStatement } from '../items';
import { loanStatement } from "../service/Services"
import showError from '../utils/showError';
import { AppView } from '../component';
import useNavigator from '../utils/useNavigator';

const width = Dimensions.get('window').width;

const Loan_Statement = ({ navigation, Actions, RECNO }) => {
	const [isLoading, setIsLoading] = useState(false)
	const [dialogVisible, setDialogVisible] = useState(false)
	const [item, setItem] = useState([])
	const [refreshing, setRefreshing] = useState(false)
	const [image, setImage] = useState("")

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
			await loanStatement(RECNO, (res, done) => {
				// console.log("loanStatement res : ", res?.data)
				if (done && res?.data?.status) {
					setItem(res?.data?.data?.loan_statment)
					setImage(res?.data?.data?.loan_statment[0]?.image)
				} else {
					showError(res?.data?.message);
				}
			});
		} catch (e) {
			console.log("Loan_Statement.js onLoadData error : ", e)
		} finally {
			setIsLoading(false)
			setRefreshing(false)
		}
	};

	const onOpenUrl = () => {
		if (item.length > 0) {
			ExpoLinking.openURL(item[0]?.image).catch((err) =>
				alert('link : ' + item[0]?.image),
			);
		}
	};

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
				centerComponent={{ text: "รายการเดินบัญชี", style: { color: '#fff' } }}
				innerContainerStyles={{ backgroundColor: Constant?.color?.violet }}
				containerStyle={{
					backgroundColor: Constant?.color?.violet,
					borderBottomColor: Constant?.color?.violet,
				}}
				rightComponent={
					<Icon
						name="infocirlceo"
						type="antdesign"
						color="#fff"
						iconStyle={{ backgroundColor: Constant?.color?.violet }}
						onPress={() => onOpenUrl()}
					/>
				}
			/>

			<View style={styles.body}>
				<LinearGradient
					locations={[0, 0.4]}
					colors={[Constant?.color?.violetlight, Constant?.color?.darkPurple]}
					start={{ x: 0, y: 0 }}
					end={{ x: 0, y: 1 }}
					style={styles.linearGradient}>
					<View style={styles.content}>
						<RowInfo keys="รายการเดินบัญชี" name="" />
						<FlatList
							itemDimension={width - 20}
							data={item}
							numColumns={1}
							keyExtractor={(data, index) => `item_${index}`}
							refreshing={refreshing}
							onRefresh={() => onLoadData(true)}
							renderItem={({ item, index }) => (
								<ItemLoanStatement {...item} />
							)}
						/>
					</View>
				</LinearGradient>
			</View>
			{/* <Dialog
				visible={dialogVisible}
				animationType="fade"
				dialogStyle={{
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: Constant?.color?.transparent,
				}}
				contentStyle={{
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: Constant?.color?.transparent,
				}}
				onTouchOutside={() => setDialogVisible(false)}>
				<View>
					<Image
						source={{
							uri: 'https://dev.crtc-service.com/images/loan-code19.jpg',
						}}
						style={{
							width: width - 60,
							height: (width - 40) / 3,
							resizeMode: 'contain',
						}}
					/>
				</View>
			</Dialog> */}
		</AppView>
	);
}

export default useNavigator(Loan_Statement)

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	content: {
		flex: 1,
		flexDirection: 'column',
		marginVertical: 15,
		backgroundColor: Constant?.color?.white,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: Constant?.color?.gray,
	},
	contents: {
		flexDirection: 'column',
		marginTop: 15,
		backgroundColor: Constant?.color?.white,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: Constant?.color?.gray,
	},
	body: {
		flex: 1,
	},
	linearGradient: {
		flex: 1,
		paddingLeft: 15,
		paddingRight: 15,
	},
});
