import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    FlatList,
    TouchableOpacity,
    Text,
    TextInput,
} from 'react-native';
import { Icon, Header } from 'react-native-elements';
import Constant from '../util/Constant';

import LinearGradient from 'react-native-linear-gradient';
import useNavigator from '../util/useNavigator';
import AppButton from '../component/AppButton';
import { } from '../../actions/Service';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AppTextInput from '../component/AppTextInput';
import SizedBox from '../component/SizedBox';
import {WebView} from 'react-native-webview';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const CoopLinkAccount = ({ navigation, Actions, refresh, url }) => {
    return (
        <LinearGradient
            locations={[0, 0.4]}
            colors={[Constant.color.violetlight, Constant.color.darkPurple]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{ ...StyleSheet.absoluteFillObject }}>
            <Header
                leftComponent={
                    <Icon
                        name="chevron-thin-left"
                        type="entypo"
                        color="#fff"
                        iconStyle={{ backgroundColor: Constant.color.violet }}
                        onPress={navigation.goBack}
                    />
                }
                centerComponent={{
                    text: "เชื่อมต่อบัญชี",
                    style: { color: '#fff' },
                }}
                innerContainerStyles={{ backgroundColor: Constant.color.violet }}
                containerStyle={{
                    backgroundColor: Constant.color.violet,
                    borderBottomColor: Constant.color.violet,
                }}
            />

            <View style={styles.body}>
                <WebView 
                    source={{ uri: url }}
                    domStorageEnabled={true}
                    javaScriptEnabled={true}
                    pagingEnabled={true}
                    scrollEnabled={true}
                    cacheEnabled={true}
                    geolocationEnabled={true}
                    nestedScrollEnabled={true}
                    pullToRefreshEnabled={true}
                    thirdPartyCookiesEnabled={true}
                />
            </View>
        </LinearGradient>
    );
};

CoopLinkAccount.defaultProps = {};

export default useNavigator(CoopLinkAccount);

const styles = StyleSheet.create({
    body: {
        backgroundColor: 'white',
        flex: 1,
        // borderRadius: 5,
        // margin: 15,
        // padding: 10,
    },
    br: {
        backgroundColor: '#E1E1E1',
        height: 1,
    },
    label: {
        fontSize: 14,
        color: Constant.color.dark,
    },
    remark: {
        fontSize: 12,
        color: Constant.color.dark,
    },
    subTitle: {
        color: '#727272',
        fontSize: 10,
    },
    twoLabel: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    textArea: {
        height: 120,
    },
});
