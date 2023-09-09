/* eslint-disable react-hooks/rules-of-hooks */
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
import { getLoanTypeList, getBorrowerMemberProfile } from '../../../actions/Service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonPicker from '../../component/ButtonPicker';
import AppListPicker from '../../component/AppListPicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import StepBar from '../../component/StepBar';
import WantSwitch from '../../component/WantSwitch';
import NumberHelper from '../../util/NumberHelper';
import Spinner from 'react-native-loading-spinner-overlay';
import toCurrency from '../../util/toCurrency';
import showError from '../../util/showError';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const FormCoopLoan = ({ navigation, Actions, refresh }) => {
  const [validate, setValidate] = useState(false);
  const [subscribe, setSubscribe] = useState(true);
  const [borrowProfile, setBorrowProfile] = useState({
    MAXPERITEM: 0,
    BAL_ATM: 0,
  });
  const [amount, setAmount] = useState('');
  const [remark, setRemark] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setValidate(amount.length > 0 && Number(amount) > 0);
  }, [amount]);

  useEffect(() => {
    initialData();
  }, []);

  const initialData = () => {
    setIsLoading(true)
    getBorrowerMemberProfile((res, done) => {
      setIsLoading(false)
      if (done && res.data.status) {
        setBorrowProfile(res.data.data);
      } else {
        showError(res.data.message);
      }
    })
  };

  const onConfirm = () => {
    Actions.push('CoopLoanConfirm', {
      amount,
      remark,
      borrowProfile,
      subscribe,
    });
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
          text: 'ขอกู้เงินสหกรณ์',
          style: { color: '#fff' },
        }}
        innerContainerStyles={{ backgroundColor: Constant.color.violet }}
        containerStyle={{
          backgroundColor: Constant.color.violet,
          borderBottomColor: Constant.color.violet,
        }}
      />

      <View style={styles.body}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Text style={styles.label}>ขอกู้เงินสหกรณ์</Text>
            <SizedBox height={10} />
            <StepBar step={1} />
            <SizedBox height={22} />
            <View style={styles.twoLabel}>
              <Text style={styles.label}>บัญชีผู้กู้ :</Text>
              <Text style={styles.label}>{borrowProfile.BAYACNO}</Text>
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
              <Text style={styles.label}>จำนวนเงินที่ขอกู้ (บาท) :</Text>
              <Text style={styles.label} />
            </View>
            <SizedBox height={10} />
            <AppTextInput
              placeholder="จำนวนเงิน"
              value={amount}
              onChangeText={(text) => {
                if (Number(text) > Number(borrowProfile.BAL_ATM)) {
                  setAmount(Number(borrowProfile.BAL_ATM) + "")
                } else {
                  setAmount(text);
                }
              }}
            />
            <SizedBox height={10} />
            {
              borrowProfile.note && <View style={{padding: 10, borderColor: Constant.color.lightGray, borderWidth: 1, borderRadius: 4, backgroundColor: Constant.color.whitesmoke}}>
                <Text style={[styles.label, {textAlign: 'center', color: Constant.color.red, fontWeight: 'bold'}]}>{borrowProfile.note}</Text>
              </View>
            }
            <SizedBox height={20} />
            <Text style={styles.label}>ต้องการรับแจ้งทำรายการหรือไม่</Text>
            <SizedBox height={10} />
            <WantSwitch
              value={subscribe}
              onChange={() => setSubscribe(!subscribe)}
            />
            <SizedBox height={20} />
            <Text style={styles.label}>กำหนดบันทึกช่วยจำ</Text>
            <SizedBox height={10} />
            <AppTextInput
              value={remark}
              maxLength={20}
              keyboardType="default"
              onChangeText={setRemark}
            />
            <SizedBox height={20} />
            <AppButton
              text="ยืนยันทำรายการ"
              onPress={onConfirm}
              disabled={!validate}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>

      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={{ color: '#000' }}
      />
    </LinearGradient>
  );
};

FormCoopLoan.defaultProps = {};

export default useNavigator(FormCoopLoan);

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
  twoLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  textArea: {
    height: 120,
  },
});
