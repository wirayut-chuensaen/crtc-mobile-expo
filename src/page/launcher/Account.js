import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { Icon, Header } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { account, CancelableToken } from "../../service/Services"
import Constant from "../../utils/Constant"
import { ItemAccount } from "../../items"
import DataPersistant, { DataPersistantType } from '../../utils/DataPersistant';
import { AppView } from '../../component';
import showError from '../../utils/showError';

const Account = ({ navigation, route }) => {
	const [accountList, setAccountList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [refreshing, setRefreshing] = useState(false);

	useEffect(() => {
		initialData();
		return () => {
			CancelableToken.cancel('cancel');
		};
	}, []);

	const initialData = async () => {
		try {
			let hasCache = false;
			const cacheAccountList = await DataPersistant.getItem(
				'account',
				DataPersistantType.ARRAY,
			);
			if (cacheAccountList.length > 0) {
				hasCache = true;
				setAccountList(cacheAccountList);
			}
			if (!hasCache) {
				setIsLoading(true);
			}
			account((res, done) => {
				setIsLoading(false);
				setRefreshing(false);
				console.log({ res });
				if (done && res?.data?.status) {
					const { accounts } = res?.data?.data;
					const finalData = accounts.filter(x => !Array.isArray(x));
					setAccountList(finalData);
					DataPersistant.setItem('account', finalData);
				} else {
					showError(res?.data?.message);
					return navigation.navigate('VerifyPin');
				}
			});
		} catch (e) {
			console.log("Account.js initialData error : ", e)
		}
	};

	const _renderItem = ({ item, index }) => {
		const toDetail = () => {
			CancelableToken.cancel('cancel');
			navigation.navigate('AccountDetail', {
				account_number: item?.ACCNO?.replace('-', ''),
			});
		};

		const onTransfer = () => {
			CancelableToken.cancel('cancel');
			navigation.navigate('TransferAction', {
				account: item,
			});
		};

		return (
			<TouchableOpacity onPress={toDetail}>
				<ItemAccount {...item} onTransfer={onTransfer} />
			</TouchableOpacity>
		);
	};

	const _renderFooter = () => {
		CancelableToken.cancel('cancel');
		const toAddAccount = () => {
			navigation.navigate('AddAccount', {
				onAddSuccess: initialData,
			});
		};

		return (
			<View style={{ marginVertical: 20 }}>
				<TouchableOpacity onPress={toAddAccount}>
					<LinearGradient
						locations={[0, 0.4]}
						colors={[Constant.color.violetlight, Constant.color.darkPurple]}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 1 }}
						style={{
							height: 50,
							marginHorizontal: 20,
							borderRadius: 8,
							justifyContent: 'center',
						}}>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'center',
							}}>
							<Icon
								name="plus-circle"
								type="material-community"
								color="#fff"
								size={20}
								iconStyle={{ marginRight: 8 }}
							/>
							<Text style={{ color: 'white', fontSize: 14 }}>เพิ่มบัญชี</Text>
						</View>
					</LinearGradient>
				</TouchableOpacity>
			</View>
		);
	};

	const onRefresh = () => {
		setRefreshing(true);
		initialData();
	};

	return (
		<AppView isLoading={isLoading} style={{ flex: 1, backgroundColor: '#efefef' }}>
			<Header
				centerComponent={{ text: 'บัญชีของฉัน', style: { color: '#fff' } }}
				innerContainerStyles={{ backgroundColor: Constant.color.violet }}
				containerStyle={{
					backgroundColor: Constant.color.violet,
					borderBottomColor: Constant.color.violet,
				}}
			/>
			<FlatList
				data={accountList}
				keyExtractor={(data, index) => `transaction_${index}`}
				ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
				ListHeaderComponent={() => <View style={{ height: 20 }} />}
				ListFooterComponent={() => <View style={{ height: 20 }} />}
				renderItem={_renderItem}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			/>
		</AppView>
	);
};

export default Account;
