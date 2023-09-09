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
import Constant from '../../util/Constant';

import LinearGradient from 'react-native-linear-gradient';
import useNavigator from '../../util/useNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import SizedBox from '../../component/SizedBox';
import AppButton from '../../component/AppButton';
import AppTextInput from '../../component/AppTextInput';
import { transferBorrowConfirmOtp, transferBorrowConfirm } from '../../../actions/Service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonPicker from '../../component/ButtonPicker';
import AppListPicker from '../../component/AppListPicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import StepBar from '../../component/StepBar';
import WantSwitch from '../../component/WantSwitch';
import AppLoading from '../../component/AppLoading';
import NumberHelper from '../../util/NumberHelper';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-toast-message';
import toCurrency from '../../util/toCurrency';
import showError from '../../util/showError';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const CoopLoanConfirm = ({ navigation, Actions, refresh, remark, amount, borrowProfile = {}, subscribe = false }) => {
  const [isLoading, setIsLoading] = useState(false);

  const onConfirm = () => {
    setIsLoading(true)
    transferBorrowConfirm({ amount, remark }, (res, done) => {
      setIsLoading(false)
      if (done && res.data.status) {
        Actions.push('CoopOtp', {
          payload: {
            title: "ยืนยันการกู้เงินสหกรณ์",
            success: 'CoopLoanSuccess',
            amount,
            remark,
            subscribe,
            info: borrowProfile,
            data: {
              transfer_withdraw_id: res.data.data.transfer_withdraw.id,
            },
            action: (data, callback) => transferBorrowConfirmOtp(data, callback)
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
          text: 'ยืนยันการกู้เงินสหกรณ์',
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
            <Text style={styles.label}>ยืนยันการกู้เงินสหกรณ์</Text>
            <SizedBox height={10} />
            <StepBar step={2} />
            <SizedBox height={22} />
            <View style={styles.twoLabel}>
              <Text style={styles.label}>บัญชีผู้กู้ :</Text>
              <Text style={styles.label}>{borrowProfile.BAYACNO}</Text>
            </View>
            <SizedBox height={10} />
            <View style={styles.twoLabel}>
              <Text style={styles.label}>ประเภทการกู้เงิน :</Text>
              <Text style={styles.label}>สามัญ ATM</Text>
            </View>
            <SizedBox height={10} />
            <View style={styles.twoLabel}>
              <Text style={styles.label}>วงเงินกู้ :</Text>
              <Text style={styles.label}>{toCurrency(borrowProfile.MAXPERITEM)}</Text>
            </View>
            <SizedBox height={10} />
            <View style={styles.twoLabel}>
              <Text style={styles.label}>วงเงินกู้คงเหลือ :</Text>
              <Text style={styles.label}>{toCurrency(borrowProfile.BAL_ATM)}</Text>
            </View>
            <SizedBox height={10} />
            <View style={styles.twoLabel}>
              <Text style={styles.label}>จำนวนเงินที่ขอกู้ :</Text>
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
            <SizedBox height={16} />
            {
              borrowProfile.note && <View style={{padding: 10, borderColor: Constant.color.lightGray, borderWidth: 1, borderRadius: 4, backgroundColor: Constant.color.whitesmoke}}>
                <Text style={[styles.label, {textAlign: 'center', color: Constant.color.red, fontWeight: 'bold'}]}>{borrowProfile.note}</Text>
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

      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={{ color: '#fff' }}
      />
    </LinearGradient>
  );
};

CoopLoanConfirm.defaultProps = {};

export default useNavigator(CoopLoanConfirm);

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
