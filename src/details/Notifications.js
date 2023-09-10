import React, { useState } from 'react';
import { StyleSheet, Dimensions, View, FlatList } from 'react-native';
import { Icon, Header } from 'react-native-elements';
import Constant from '../utils/Constant';
import { ItemControl } from '../items';
import { AppView } from '../component';
import useNavigator from '../utils/useNavigator';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const Notifications = ({ Actions }) => {
	const [item, setItem] = useState([
		{
			name: "เปิดการแจ้งเตือน",
			status: false,
		}
	])

	return (
		<AppView>
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
				centerComponent={{ text: "การแจ้งเตือน", style: { color: '#fff' } }}
				innerContainerStyles={{ backgroundColor: Constant?.color?.violet }}
				containerStyle={{
					backgroundColor: Constant?.color?.violet,
					borderBottomColor: Constant?.color?.violet,
				}}
			/>
			<View style={styles.body}>
				<FlatList
					itemDimension={width - 20}
					data={item}
					style={styles.gridView}
					numColumns={1}
					keyExtractor={(data, index) => `item${index}`}
					renderItem={({ item, index }) => (
						<ItemControl {...item} />
					)}
				/>
			</View>
		</AppView>
	);
}

export default useNavigator(Notifications)

const styles = StyleSheet.create({
	body: {
		height: height - 85,
		backgroundColor: Constant.color.white,
	},
	gridView: {
		marginTop: 15,
	},
});
