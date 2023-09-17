import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon, Header } from 'react-native-elements';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Constant from '../utils/Constant';
import { SubList, SubListWho } from '../details';
import { AppView } from '../component';
import useNavigator from '../utils/useNavigator';

const Warrantee = ({ navigation, Actions }) => {
	const [index, setIndex] = useState(0)
	const [routes, setRoutes] = useState([
		{ key: 'first', title: 'ใครค้ำประกันให้เรา' },
		{ key: 'second', title: 'เราค้ำประกันให้ใครบ้าง' },
	])

	return (
		<AppView style={styles.wapper_content}>
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

				centerComponent={{ text: "การค้ำประกัน", style: { color: '#fff' } }}
				innerContainerStyles={{ backgroundColor: Constant?.color?.violet }}
				containerStyle={{
					backgroundColor: Constant?.color?.violet,
					borderBottomColor: Constant?.color?.violet,
				}}
			/>

			<View style={styles.body}>
				<View style={styles.content}>
					<TabView
						onIndexChange={(index) => setIndex(index)}
						navigationState={{ index, routes }}
						renderScene={SceneMap({
							first: () => <SubList navigation={navigation} Actions={Actions} />,
							second: () => <SubListWho navigation={navigation} Actions={Actions} />,
						})}
						renderTabBar={(props) => (
							<TabBar
								{...props}
								indicatorStyle={{
									backgroundColor: Constant?.color?.violetlight,
									height: '100%',
								}}
								style={{ backgroundColor: Constant?.color?.cream }}
								renderLabel={({ route, focused, color }) => (
									<Text numberOfLines={1} style={{ color, margin: 8 }}>
										{route?.title}
									</Text>
								)}
							/>
						)}
					/>
				</View>
			</View>
		</AppView>
	);
}

export default useNavigator(Warrantee)

const styles = StyleSheet.create({
	content: {
		flex: 1,
		flexDirection: 'column',
		paddingTop: 15,
		padding: 10,
		backgroundColor: Constant.color.white,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: Constant.color.gray,
	},
	body: {
		flex: 1,
	},
	wapper_content: {
		flex: 1,
	},
});
