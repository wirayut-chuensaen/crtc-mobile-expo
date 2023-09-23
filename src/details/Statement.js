import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	Dimensions,
	View,
	Image,
	FlatList,
} from 'react-native';
import * as ExpoLinking from "expo-linking"
import { Icon, Header, Dialog } from 'react-native-elements';
import Constant from '../utils/Constant';
import { LinearGradient } from 'expo-linear-gradient';
import { AppView } from '../component';
import { RowInfo, ItemStatement } from '../items';
import { statement } from "../service/Services"
import useNavigator from '../utils/useNavigator';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const Statement = ({ navigation, Actions, accno }) => {
	const [isLoading, setIsLoading] = useState(false)
	// const [dialogVisible, setDialogVisible] = useState(false)
	const [item, setItem] = useState([])
	const [refreshing, setRefreshing] = useState(false)
	const [image, setImage] = useState("")

	useEffect(() => {
		init()
	}, [])

	const init = async (isRefresh = false) => {
		try {
			if (!isRefresh) {
				setIsLoading(true)
			} else {
				setRefreshing(true)
			}
			await statement(accno, (res, err) => {
				if (res?.data?.status == true) {
					setItem(res?.data?.data?.savemas_statements)
					setImage(res?.data?.data?.loan_statment[0]?.image)
				} else {
				}
			});
		} catch (e) {
			console.log("Statement.js init error : ", e)
		} finally {
			setIsLoading(false)
			setRefreshing(false)
		}
	}

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
							onRefresh={() => init(true)}
							renderItem={({ item, index }) => (
								<ItemStatement {...item} />
							)}
						/>
					</View>
				</LinearGradient>
			</View>
			{/* <Dialog
				visible={this.state.dialogVisible}
				animationType="fade"
				dialogStyle={{
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: Constant.color.transparent,
				}}
				contentStyle={{
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: Constant.color.transparent,
				}}
				onTouchOutside={() => this.setState({ dialogVisible: false })}>
				<View>
					<Image
						source={{
							uri: 'https://dev.crtc-service.com/images/saving-code19.jpg',
						}}
						style={{
							width: width,
							height: (width - 40) / 1.5,

							// backgroundColor: "black",
							// marginTop: 10,
							resizeMode: 'contain',
						}}
					/>
				</View>
			</Dialog> */}
		</AppView>
	);
}

export default useNavigator(Statement)

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
	contents: {
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
