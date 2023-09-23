import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Icon, Header } from 'react-native-elements';
import Constant from '../utils/Constant';
import { LinearGradient } from 'expo-linear-gradient';
import useNavigator from '../utils/useNavigator';
import { AppView, AppButton, SizedBox, AppTextInput } from '../component';
import { updateSavemasRegist } from "../service/Services"
import showError from '../utils/showError';
import Toast from 'react-native-toast-message';

const FormChangeDeposit = ({ navigation, Actions, accno }) => {
    const [memberId, setMemberId] = useState(accno);
    const [oldValue, setOldValue] = useState('');
    const [newValue, setNewValue] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    const [validate, setValidate] = useState(false);
    useEffect(() => {
        setValidate(
            memberId.length > 0 && oldValue.length > 0 && newValue.length > 0,
        );
    }, [memberId, oldValue, newValue]);

    const onSave = async () => {
        try {
            setIsLoading(true)
            await updateSavemasRegist(
                {
                    account_id: memberId,
                    before_amt: oldValue,
                    make2_amt: newValue,
                },
                (res, done) => {
                    if (done && res?.data?.status) {
                        Toast.show({
                            type: "success",
                            text1: "บันทึกสำเร็จ",
                        })
                        Actions.pop();
                    } else {
                        showError(res?.data?.message);
                    }
                },
            );
        } catch (e) {
            console.log("FormChangeDeposit.js onSave error : ", e)
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <AppView isLoading={isLoading}>
            <LinearGradient
                locations={[0, 0.4]}
                colors={[Constant?.color?.violetlight, Constant?.color?.darkPurple]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{ ...StyleSheet.absoluteFillObject }}>
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
                    centerComponent={{
                        text: 'เปลี่ยนแปลงข้อมูลการฝากเงิน',
                        style: { color: '#fff' },
                    }}
                    innerContainerStyles={{ backgroundColor: Constant?.color?.violet }}
                    containerStyle={{
                        backgroundColor: Constant?.color?.violet,
                        borderBottomColor: Constant?.color?.violet,
                    }}
                />

                <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
                    <Text style={styles.label}>
                        ฟอร์มคำขอเปลี่ยนแปลงข้อมูลการฝากเงิน
                    </Text>
                    <SizedBox height={5} />
                    <Text style={styles.subTitle}>
                        ส่งคำขอก่อนวันที่ 10 ของทุกเดือนจึงจะมีผลในเดือนนั้นๆ ค่ะ
                    </Text>
                    <SizedBox height={10} />
                    <View style={styles.br} />
                    <SizedBox height={13} />
                    <Text style={styles.label}>เลขบัญชี</Text>
                    <Text style={styles.label}>Member ID</Text>
                    <SizedBox height={10} />
                    <AppTextInput
                        value={memberId}
                        onChangeText={setMemberId}
                        returnKeyType="done"
                    />
                    <SizedBox height={20} />
                    <Text style={styles.label}>เดิม หักฝาก เดือนละ</Text>
                    <Text style={styles.label}>Value Before</Text>
                    <SizedBox height={10} />
                    <AppTextInput
                        value={oldValue}
                        onChangeText={setOldValue}
                        returnKeyType="done"
                    />
                    <SizedBox height={20} />
                    <Text style={styles.label}>เปลี่ยนเป็น หักฝาก เดือนละ</Text>
                    <Text style={styles.label}>Change Value</Text>
                    <SizedBox height={10} />
                    <AppTextInput
                        value={newValue}
                        onChangeText={setNewValue}
                        returnKeyType="done"
                    />
                    <SizedBox height={20} />
                    <AppButton
                        text="บันทึกข้อมูล"
                        onPress={onSave}
                        disabled={!validate}
                    />
                </ScrollView>
            </LinearGradient>
        </AppView>
    );
};

export default useNavigator(FormChangeDeposit);

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
    subTitle: {
        color: '#727272',
        fontSize: 10,
    },
});
