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
import AppLoading from '../component/AppLoading';
import showError from '../util/showError';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const CoopOtp = ({ navigation, Actions, refresh, payload }) => {
    const [otp, setOtp] = useState('');
    const [validate, setValidate] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setValidate(otp.length > 4);
    }, [otp]);

    const onConfirm = () => {
        setIsLoading(true)
        payload.data.otp = otp;
        payload.action(payload.data, (res, done) => {
            console.log("transferDepositConfirmOtp res : ",res)
            setIsLoading(false)
            if (done && res.data.status) {
                payload.successData = res.data.data;
                Actions.push(payload.success, payload);
            } else {
                showError(res.data.message);
            }
        })
    }

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
                    text: payload.title,
                    style: { color: '#fff' },
                }}
                innerContainerStyles={{ backgroundColor: Constant.color.violet }}
                containerStyle={{
                    backgroundColor: Constant.color.violet,
                    borderBottomColor: Constant.color.violet,
                }}
            />

            <View style={styles.body}>
                {isLoading && <AppLoading />}
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <Text style={styles.label}>ยืนยันรหัส OTP</Text>
                        <SizedBox height={10} />
                        <AppTextInput
                            value={otp}
                            maxLength={7}
                            onChangeText={setOtp}
                        />
                        <SizedBox height={10} />
                        <AppButton
                            text="ยืนยันการทำรายการ"
                            onPress={onConfirm}
                            disabled={!validate}
                        />
                    </View>
                </KeyboardAwareScrollView>
            </View>
        </LinearGradient>
    );
};

CoopOtp.defaultProps = {};

export default useNavigator(CoopOtp);

const styles = StyleSheet.create({
    body: {
        backgroundColor: 'white',
        borderRadius: 5,
        margin: 15,
        flex: 1,
        padding: 10,
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
