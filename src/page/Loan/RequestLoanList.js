import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Header } from 'react-native-elements';
import Constant from '../../utils/Constant';
import { LinearGradient } from 'expo-linear-gradient';
import useNavigator from '../../utils/useNavigator';
import { getRequestLoanList } from "../../service/Services"
import { AppView, AppButton, SizedBox, TableLoanList } from '../../component';
import { PaddingSymmetric } from '../../component/Padding';
import showError from '../../utils/showError';
import { useFocusEffect } from '@react-navigation/native';

const RequestLoanList = ({ navigation, Actions }) => {
    const [loanRequestList, setLoanRequestList] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    useFocusEffect(
        useCallback(() => {
            initialData();
        }, [])
    )

    const initialData = async () => {
        try {
            setIsLoading(true)
            await getRequestLoanList((res, done) => {
                // console.log("getRequestLoanList res : ", res)
                if (done && res?.data?.status) {
                    setLoanRequestList(res?.data?.list_loan_request);
                } else {
                    showError(res?.data?.message);
                }
            });
        } catch (e) {
            console.log("RequestLoanList.js initialData error : ", e)
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <AppView isLoading={isLoading} style={styles.body}>
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
                centerComponent={{ text: 'ส่งคำขอกู้ออนไลน์', style: { color: '#fff' } }}
                innerContainerStyles={{ backgroundColor: Constant?.color?.violet }}
                containerStyle={{
                    backgroundColor: Constant?.color?.violet,
                    borderBottomColor: Constant?.color?.violet,
                }}
            />

            <View style={styles.body}>
                <LinearGradient
                    locations={[0, 0.4]}
                    colors={[Constant?.color?.violetlight, Constant?.color?.darkPurple]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.linearGradient}>
                    <View style={styles.content}>
                        <TableLoanList
                            key="loan_request"
                            header={[
                                <View>
                                    <SizedBox height={12} />
                                </View>,
                            ]}
                            footer={[
                                <SizedBox height={60} />,
                                <PaddingSymmetric horizontal={10}>
                                    <AppButton
                                        text="ส่งคำขอกู้ออนไลน์"
                                        onPress={() =>
                                            Actions.push('FormRequestLoan')
                                        }
                                    />
                                </PaddingSymmetric>,
                            ]}
                            data={loanRequestList}
                        />
                    </View>
                </LinearGradient>
            </View>
        </AppView>
    );
};

export default useNavigator(RequestLoanList);

const styles = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 15,
        marginBottom: 15,
        backgroundColor: Constant?.color?.white,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Constant?.color?.gray,
    },
    margin: {
        marginLeft: 10,
        marginRight: 10,
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
