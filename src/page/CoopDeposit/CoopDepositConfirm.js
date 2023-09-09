import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';
import {Icon, Header} from 'react-native-elements';
import Constant from '../../util/Constant';

import LinearGradient from 'react-native-linear-gradient';
import useNavigator from '../../util/useNavigator';
import {SafeAreaView} from 'react-native-safe-area-context';
import SizedBox from '../../component/SizedBox';
import AppButton from '../../component/AppButton';
import AppTextInput from '../../component/AppTextInput';
import {transferDepositConfirm, transferDepositConfirmOtp} from '../../../actions/Service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonPicker from '../../component/ButtonPicker';
import AppLoading from '../../component/AppLoading';
import AppListPicker from '../../component/AppListPicker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import StepBar from '../../component/StepBar';
import WantSwitch from '../../component/WantSwitch';
import toCurrency from '../../util/toCurrency';
import showError from '../../util/showError';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const CoopDepositConfirm = ({navigation, Actions, refresh, remark, info = {}, amount, subscribe = false, toAccount}) => {
  const [isLoading, setIsLoading] = useState(false);
  const onConfirm = () => {
    setIsLoading(true)
    transferDepositConfirm({ amount, remark, to_accno: toAccount }, (res, done) => {
      console.log("transferDepositConfirm res : ",res.data)
      setIsLoading(false)
      if (done && res.data.status) {
        Actions.push('CoopOtp', {
          payload: {
            title: "ยืนยันการกู้เงินสหกรณ์",
            success: 'CoopDepositSuccess',
            amount,
            remark,
            subscribe,
            info,
            data: {
              transfer_withdraw_id: res.data.data.transfer_withdraw.id,
            },
            action: (data, callback) => transferDepositConfirmOtp(data, callback)
          }
        });
      } else {
        showError(res.data.message);
      }
    })
  }

  return (
    <LinearGradient
      locations={[0, 0.4]}
      colors={[Constant.color.violetlight, Constant.color.darkPurple]}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      style={{...StyleSheet.absoluteFillObject}}>
      <Header
        leftComponent={
          <Icon
            name="chevron-thin-left"
            type="entypo"
            color="#fff"
            iconStyle={{backgroundColor: Constant.color.violet}}
            onPress={navigation.goBack}
          />
        }
        centerComponent={{
          text: 'ฝากเงินเข้าบัญชีสหกรณ์',
          style: {color: '#fff'},
        }}
        innerContainerStyles={{backgroundColor: Constant.color.violet}}
        containerStyle={{
          backgroundColor: Constant.color.violet,
          borderBottomColor: Constant.color.violet,
        }}
      />

      <View style={styles.body}>
        {isLoading && <AppLoading />}
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Text style={styles.label}>ยืนยันการฝากเงินเข้าบัญชีสหกรณ์</Text>
            <SizedBox height={10} />
            <StepBar step={2} />
            <SizedBox height={22} />
            <View style={styles.twoLabel}>
              <Text style={styles.label}>จากเลขบัญชี {info?.bankId} :</Text>
              <Text style={styles.label}>{info.number}</Text>
            </View>
            <SizedBox height={10} />
            <View style={styles.twoLabel}>
              <Text style={styles.label}>ไปยัง บัญชีสหกรณ์ของฉัน</Text>
              <Text style={styles.label}>{toAccount}</Text>
            </View>
            <SizedBox height={10} />
            <View style={styles.twoLabel}>
              <Text style={styles.label}>จำนวนเงิน :</Text>
              <Text style={styles.label}>{toCurrency(amount)}</Text>
            </View>
            <SizedBox height={13} />
            <Text style={styles.label}>บันทึกช่วยจำ</Text>
            <SizedBox height={16} />
            <View style={styles.twoLabel}>
              <Text style={styles.remark}>{remark}</Text>
            </View>
            <SizedBox height={110} />
            <AppButton
              text="ยืนยันข้อมูล"
              onPress={onConfirm}
              // disabled={!validate}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </LinearGradient>
  );
};

CoopDepositConfirm.defaultProps = {};

export default useNavigator(CoopDepositConfirm);

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
