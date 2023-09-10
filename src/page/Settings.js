import React, { useState } from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { Icon, Header, Button } from 'react-native-elements';
import Constant from '../utils/Constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ItemSettings } from '../items';
import useNavigator from '../utils/useNavigator';
import { AppView } from '../component';
import { ChangePinMode } from './ForgotPin';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const Settings = ({ navigation, Actions }) => {
    const [item, setItem] = useState([
        {
            icon: 'contacts',
            type: 'antdesign',
            name: 'Contacts us',
            sub: 'ติดต่อเรา',
            action: 1,
        },
        // {
        //     icon: 'notifications-outline',
        //     type: 'ionicon',
        //     name: 'Notification Setting',
        //     sub: 'การแจ้งเตือน',
        //     action: 2,
        // },
        {
            icon: 'Safety',
            type: 'antdesign',
            name: 'Privacy Policy',
            sub: 'นโยบายความเป็นส่วนตัว',
            action: 3,
        },
        {
            icon: 'lock',
            type: 'antdesign',
            name: 'Change Password',
            sub: 'เปลี่ยนรหัสผ่าน',
            action: 4,
        },
        {
            icon: 'lock',
            type: 'antdesign',
            name: 'Change PIN',
            sub: 'เปลี่ยน PIN',
            action: 5,
        },
    ])
    const [isLoading, setIsLoading] = useState(false)

    const onHandleMenu = ({ item }) => {
        switch (item?.action) {
            case 1:
                return Actions.push('Contact');
            case 2:
                return Actions.push('Notifications');
            case 3:
                return Actions.push('PrivacyPolicy');
            case 4:
                return Actions.push('ChangePassword');
            case 5:
                return Actions.push('ForgotPin', {
                    mode: ChangePinMode.VERIFY,
                });
        }
    };

    const pressLogout = async () => {
        setIsLoading(true)
        await AsyncStorage.clear().then(() => setIsLoading(false));
        Actions.replace('Authen');
    };

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
                centerComponent={{ text: "การตั้งค่า", style: { color: '#fff' } }}
                innerContainerStyles={{ backgroundColor: Constant?.color?.violet }}
                containerStyle={{
                    backgroundColor: Constant?.color?.violet,
                    borderBottomColor: Constant?.color?.violet,
                }}
            />
            <View style={styles.body}>
                <View>
                    <FlatList
                        itemDimension={width - 20}
                        data={item}
                        style={styles.gridView}
                        numColumns={1}
                        keyExtractor={(data, index) => `item${index}`}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity onPress={() => onHandleMenu({ item })}>
                                <ItemSettings {...item} />
                            </TouchableOpacity>
                        )}
                    />
                </View>
                <Button
                    title="ออกจากระบบ"
                    titleStyle={{ color: Constant?.color?.violet }}
                    buttonStyle={styles.Button}
                    onPress={pressLogout}
                />
            </View>
        </AppView>
    );
}

export default useNavigator(Settings)

const styles = StyleSheet.create({
    body: {
        height: height - 95,
        paddingLeft: 15,
        paddingRight: 15,
    },
    gridView: {
        backgroundColor: Constant?.color?.white,
        marginTop: 15,
        borderRadius: 5,
    },
    Button: {
        marginBottom: 15,
        marginTop: 15,
        backgroundColor: Constant?.color?.white,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Constant.color.white,
    },
});
