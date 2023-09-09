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
import { getDepositMemberProfile } from '../../../actions/Service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonPicker from '../../component/ButtonPicker';
import AppListPicker from '../../component/AppListPicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import StepBar from '../../component/StepBar';
import WantSwitch from '../../component/WantSwitch';
import AppLoading from '../../component/AppLoading';
import showError from '../../util/showError';
import toCurrency from '../../util/toCurrency';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const FormCoopDeposit = ({ navigation, Actions, refresh }) => {
  const [validate, setValidate] = useState(false);
  const [subscribe, setSubscribe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [info, setInfo] = useState({

  });
  const [crtcAccount, setCrtcAccount] = useState([]);
  const [toAccount, setToAccount] = useState('');
  const [remark, setRemark] = useState('');
  const [amount, setAmount] = useState(0);
  const [accountSelect, setAccountSelect] = useState();

  useEffect(() => {
    setValidate(amount.length > 0 && toAccount.length > 0);
  }, [amount, toAccount]);

  useEffect(() => {
    initialData();
  }, []);

  const initialData = () => {
    setIsLoading(true);
    getDepositMemberProfile((res, done) => {
      console.log("getDepositMemberProfile res : ", res)
      setIsLoading(false)
      if (done && res.data.status) {
        setInfo({
          ...res.data.data.bank_account,
          bankId: res?.data?.data?.BANKID
        });
        setCrtcAccount(res.data.data.crtc_accounts.map(x => {
          x.fullName = 'เลขบัญชี ' + x.accno;
          x.shortName = 'เลขบัญชี ' + x.accno;
          return x;
        }));
      } else {
        showError(res.data.message)
      }
    })
  };

  const onConfirm = () => Actions.push('CoopDepositConfirm', {
    amount,
    remark,
    info,
    subscribe,
    toAccount,
  });

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
          text: 'ฝากเงินเข้าบัญชีสหกรณ์',
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
            <Text style={styles.label}>ฝากเงินเข้าบัญชีสหกรณ์</Text>
            <SizedBox height={10} />
            <StepBar step={1} />
            <SizedBox height={22} />
            <View style={styles.twoLabel}>
              <Text style={styles.label}>จากเลขบัญชี {info?.bankId} :</Text>
              <Text style={styles.label}>{info.number}</Text>
            </View>
            <SizedBox height={10} />
            <View style={styles.twoLabel}>
              <Text style={styles.label}>ไปยัง บัญชีสหกรณ์ของฉัน</Text>
              <Text style={styles.label} />
            </View>
            <SizedBox height={10} />
            <AppListPicker
              data={crtcAccount}
              title="เลือกบัญชีสหกรณ์"
              showOnKey='fullName'
              onSelect={({ item, index }) => {
                setToAccount(item.accno);
                setAccountSelect(item.shortName);
              }}
            >
              <ButtonPicker text={accountSelect || 'เลือกบัญชีสหกรณ์'} />
            </AppListPicker>
            <SizedBox height={10} />
            <View style={styles.twoLabel}>
              <Text style={styles.label}>จำนวนเงินที่จะฝาก (บาท) :</Text>
              <Text style={styles.label} />
            </View>
            <SizedBox height={10} />
            <AppTextInput placeholder="จำนวนเงิน"
              onChangeText={setAmount}
            />
            <SizedBox height={20} />
            <Text style={styles.label}>กำหนดบันทึกช่วยจำ</Text>
            <SizedBox height={10} />
            <AppTextInput
              style={styles.textArea}
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
              keyboardType="default"
              onChangeText={setRemark}
            />
            <SizedBox height={20} />
            <AppButton
              text="ยืนยันข้อมูล"
              onPress={onConfirm}
              disabled={!validate}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </LinearGradient>
  );
};

FormCoopDeposit.defaultProps = {};

export default useNavigator(FormCoopDeposit);

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
