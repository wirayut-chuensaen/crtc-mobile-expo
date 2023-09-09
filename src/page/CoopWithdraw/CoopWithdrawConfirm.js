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
import {transferWithdrawConfirm, transferWithdrawConfirmOtp} from '../../../actions/Service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonPicker from '../../component/ButtonPicker';
import AppLoading from '../../component/AppLoading';
import AppListPicker from '../../component/AppListPicker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import StepBar from '../../component/StepBar';
import WantSwitch from '../../component/WantSwitch';
import toCurrency from '../../util/toCurrency';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const CoopWithdrawConfirm = ({navigation, Actions, refresh, remark, info = {}, amount, subscribe = false}) => {
  const [isLoading, setIsLoading] = useState(false);
  const onConfirm = () => {
    setIsLoading(true)
    transferWithdrawConfirm({ amount, remark }, (res, done) => {
      console.log(res)
      setIsLoading(false)
      if (done && res.data.status) {
        Actions.push('CoopOtp', {
          payload: {
            title: "ยืนยันการถอนเงิน",
            success: 'CoopWithdrawSuccess',
            amount,
            remark,
            subscribe,
            info,
            data: {
              transfer_withdraw_id: res.data.data.transfer_withdraw.id,
            },
            action: (data, callback) => transferWithdrawConfirmOtp(data, callback)
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
          text: 'ยืนยันการถอนเงินฝากสหกรณ์',
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
            <Text style={styles.label}>ยืนยันการถอนเงิน</Text>
            <SizedBox height={10} />
            <StepBar step={2} />
            <SizedBox height={22} />
            <View style={styles.twoLabel}>
              <Text style={styles.label}>บัญชีผู้ถอน :</Text>
              <Text style={styles.label}>{info.BAYACNO}</Text>
            </View>
            <SizedBox height={10} />
            <View style={styles.twoLabel}>
              <Text style={styles.label}>ยอดเงินฝาก :</Text>
              <Text style={styles.label}>{toCurrency(info.MAXPERITEM)}</Text>
            </View>
            <SizedBox height={10} />
            <View style={styles.twoLabel}>
              <Text style={styles.label}>ยอดเงินฝากที่สามารถถอนได้ :</Text>
              <Text style={styles.label}>{toCurrency(info.BAL_ATM)}</Text>
            </View>
            <SizedBox height={10} />
            <View style={styles.twoLabel}>
              <Text style={styles.label}>จำนวนเงินที่ต้องการถอน (บาท) :</Text>
              <Text style={styles.label}>{toCurrency(amount)}</Text>
            </View>
            <SizedBox height={10} />
            <View style={styles.twoLabel}>
              <Text style={styles.label}>ต้องการรับการแจ้งรายการ</Text>
              <Text style={styles.label}>{subscribe ? "ต้องการ" : "ไม่ต้องการ"}</Text>
            </View>
            <SizedBox height={13} />
            <Text style={styles.label}>บันทึกช่วยจำ</Text>
            <SizedBox height={16} />
            <View style={styles.twoLabel}>
              <Text style={styles.remark}>{remark}</Text>
            </View>
            <SizedBox height={13} />
            {
              info.note && <View style={{padding: 10, borderColor: Constant.color.lightGray, borderWidth: 1, borderRadius: 4, backgroundColor: Constant.color.whitesmoke}}>
                <Text style={[styles.label, {textAlign: 'center', color: Constant.color.red, fontWeight: 'bold'}]}>{info.note}</Text>
              </View>
            }
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

CoopWithdrawConfirm.defaultProps = {};

export default useNavigator(CoopWithdrawConfirm);

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
