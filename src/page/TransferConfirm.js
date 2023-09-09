/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
} from 'react-native';
import { Icon, Header } from 'react-native-elements';
import Constant from '../util/Constant';
import LinearGradient from 'react-native-linear-gradient';
import { Tab } from './Launcher';
import useNavigator from '../util/useNavigator';
import NumberHelper from '../util/NumberHelper';
import { CommonActions } from '@react-navigation/native';
import AppLoading from "../component/AppLoading"

const TransferConfirm = ({
  navigation,
  toAccount,
  fromAccount,
  remark,
  amount,
  fee,
  Actions,
}) => {
  const onNext = () => {
    setIsLoading(true)
    navigation.navigate('VerifyOTP', {
      toAccount,
      fromAccount,
      remark,
      amount,
      fee,
    });
    setIsLoading(false)
  };

  const [isLoading, setIsLoading] = useState(false);
  var navFocusListener = null;

  useEffect(() => {
    navFocusListener = navigation.addListener(
      'didFocus',
      payload => setIsLoading(false)
    );

    BackHandler.addEventListener('hardwareBackPress', onCancel);
    return function () {
      BackHandler.removeEventListener('hardwareBackPress', onCancel);
      if (navFocusListener != null) {

        navFocusListener.remove();
        navFocusListener = null;
      }
    };
  }, []);

  const onCancel = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {
            name: 'Launcher',
            params: {
              tab: Tab.ACCOUNT,
            },
          },
        ],
      }),
    );

    return true;
  };

  return (
    <>
      {isLoading && <AppLoading />}

      <TouchableOpacity activeOpacity={1} onPress={() => { }} style={{ flex: 1 }}>
        <Header
          leftComponent={
            <Icon
              name="chevron-thin-left"
              type="entypo"
              color="#fff"
              iconStyle={{ backgroundColor: Constant.color.violet }}
              onPress={onCancel}
            />
          }
          centerComponent={{ text: 'โอนเงิน', style: { color: '#fff' } }}
          innerContainerStyles={{ backgroundColor: Constant.color.violet }}
          containerStyle={{
            backgroundColor: Constant.color.violet,
            borderBottomColor: Constant.color.violet,
          }}
        />
        <View
          style={{
            justifyContent: 'center',
            padding: 20,
            backgroundColor: '#e1e1e1',
          }}>
          <Text style={{ fontWeight: 'bold', fontSize: 15 }}>จาก</Text>
          <View style={{ marginVertical: 10 }}>
            <View style={styles.inputContainer}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 14 }}>
                    {fromAccount.ACNAME}
                  </Text>
                  <Text style={{ fontSize: 11, marginTop: 4 }}>
                    {fromAccount.ACCNO}
                  </Text>
                </View>
              </View>
              <View style={{ alignItems: 'flex-start' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 22 }}>
                  {NumberHelper.numberFormat(fromAccount.BALANCE)} <Text style={{ fontSize: 12 }}>THB</Text>
                </Text>
              </View>
            </View>
          </View>

          <Text style={{ fontWeight: 'bold', fontSize: 15 }}>ไปยัง</Text>
          <View style={{ marginTop: 10 }}>
            <View style={styles.inputContainer}>
              <Text style={{ fontWeight: 'bold', fontSize: 14 }}>
                {toAccount.ACNAME}
              </Text>
              <Text style={{ fontSize: 11, marginTop: 4 }}>{toAccount.ACCNO}</Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 1, backgroundColor: 'white', padding: 20 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 10,
            }}>
            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>จำนวนเงิน</Text>
            <Text style={{ fontWeight: 'bold', fontSize: 22 }}>
              {NumberHelper.numberFormat(amount, 2)}{' '}
              <Text style={{ fontSize: 12 }}>THB</Text>
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 10,
            }}>
            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>ค่าธรรมเนียม</Text>
            <Text style={{ fontWeight: 'bold', fontSize: 22 }}>
              {fee} <Text style={{ fontSize: 12 }}>THB</Text>
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 10,
            }}>
            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>บันทึกช่วยจำ</Text>
            <Text style={{ fontSize: 15 }}>{remark}</Text>
          </View>

          <View style={{ marginTop: 'auto' }}>
            <View style={{ marginVertical: 20 }}>
              <TouchableOpacity onPress={onNext}>
                <LinearGradient
                  locations={[0, 0.4]}
                  colors={[Constant.color.violetlight, Constant.color.darkPurple]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    height: 50,
                    borderRadius: 8,
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={{ color: 'white', fontSize: 14 }}>ยืนยัน</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <View style={{ marginBottom: 30 }}>
              <TouchableOpacity
                onPress={onCancel}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 30,
                }}>
                <Text style={{ color: 'black', fontSize: 14 }}>ยกเลิกรายการ</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default useNavigator(TransferConfirm);

const styles = StyleSheet.create({
  inputContainer: {
    padding: 14,
    borderRadius: 4,
    backgroundColor: 'white',
  },
  remarkContainer: {
    borderRadius: 4,
    borderColor: '#eee',
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: '#eee',
    paddingHorizontal: 10,
    borderRadius: 4,
    marginBottom: 10,
  },
});
