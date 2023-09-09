import React from 'react';
import {
	StyleSheet,
	Dimensions,
	View,
	Image,
	TouchableOpacity,
} from 'react-native';
import Constant from '../utils/Constant';
import Carousel from 'react-native-new-snap-carousel';
import * as Linking from 'expo-linking';

const width = Dimensions.get('window').width;
const height = width / 2.048;

const AppCarousel = ({ imageList = [] }) => {
	const handleClick = (item) => {
		Linking.openURL(encodeURI(item?.url));
	};

	return (
		<View style={styles.scrollContainer}>
			<Carousel
				layout={'default'}
				data={imageList || []}
				renderItem={({ item, index }) => (
					<TouchableOpacity onPress={() => handleClick(item)}>
						<View style={styles.itemContent}>
							<View style={styles.images}>
								<Image
									style={styles.image}
									resizeMode="cover"
									source={{ uri: item?.image }}
									key={index}
								/>
							</View>
						</View>
					</TouchableOpacity>
				)}
				sliderWidth={width}
				itemWidth={width}
				loop={true}
				autoplay={true}
				autoplayDelay={500}
				autoplayInterval={5000}
			/>
		</View>
	);
}

export default AppCarousel

const styles = StyleSheet.create({
	borderBar: {
		height: 1,
		width: width - 40,
		backgroundColor: Constant.color.black,
	},
	scrollContainer: {
		height: '100%',
	},
	itemContent: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
	images: {
		width: width - 40,
		flexDirection: 'column',
		borderRadius: 8,
		overflow: 'hidden',
	},
	image: {
		width: undefined,
		height: '100%',
	},
});
