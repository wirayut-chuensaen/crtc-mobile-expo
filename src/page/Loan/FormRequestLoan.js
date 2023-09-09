/* eslint-disable react-hooks/rules-of-hooks */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Linking,
} from 'react-native';
import {Icon, Header} from 'react-native-elements';
import Constant from '../../util/Constant';

import LinearGradient from 'react-native-linear-gradient';
import useNavigator from '../../util/useNavigator';
import SizedBox from '../../component/SizedBox';
import AppButton from '../../component/AppButton';
import AppTextInput from '../../component/AppTextInput';
import {getLoanTypeList, loanRequest} from '../../../actions/Service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonPicker from '../../component/ButtonPicker';
import AppListPicker from '../../component/AppListPicker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import showError from '../../util/showError';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const FormRequestLoan = ({navigation, Actions, refresh}) => {
  const [memberId, setMemberId] = useState('');
  const [loanTypeList, setLoanTypeList] = useState([]);
  const [loanTypeName, setLoanTypeName] = useState('');
  const [loanTypeIndex, setLoanTypeIndex] = useState(-1);

  const [salary, setSalary] = useState('');
  const [salwit1, setSalwit1] = useState('');
  const [salwit2, setSalwit2] = useState('');
  const [salOth, setSalOth] = useState('');
  const [tax, setTax] = useState('');
  const [korboko, setKorboko] = useState('');
  const [coop, setCoop] = useState('');
  const [chorpoko, setChorpoko] = useState('');
  const [chorposo, setChorposo] = useState('');
  const [othpay, setOthpay] = useState('');

  const [validate, setValidate] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('mem_id').then(mem_id => {
      if (mem_id != null) {
        setMemberId(mem_id);
      }
    });
  }, []);

  useEffect(() => {
    setValidate(loanTypeIndex > -1 && salary.length > 3);
  }, [loanTypeIndex, salary]);

  useEffect(() => {
    initialData();
  }, []);

  const initialData = () => {
    getLoanTypeList((res, done) => {
      if (done && res.data.status) {
        setLoanTypeList(
          Object.keys(res.data.loan_types).map(key => {
            const name = res.data.loan_types[key];
            return {
              name,
              shortName: key,
              fullName: `${key} - ${name}`,
            };
          }),
        );
      } else {
        showError(res.data.message);
      }
    });
  };

  const prepareData = (data = {}) => {
    for (let key in data) {
      if (data[key] === '') {
        data[key] = 0;
      }
    }

    return data;
  };

  // const onCalculate = () => {
  //   // Actions.push('LoanCalculate');
  //   const calculateData = prepareData({
  //     mem_id: memberId,
  //     txt_salary: salary,
  //     txt_salwit1: salwit1,
  //     txt_salwit2: salwit2,
  //     txt_salOth: salOth,
  //     txt_tax: tax,
  //     txt_korboko: korboko,
  //     txt_coop: coop,
  //     txt_chorpoko: chorpoko,
  //     txt_chorposo: chorposo,
  //     txt_othpay: othpay,
  //     txt_loan_type: loanTypeList[loanTypeIndex].shortName,
  //   });
  //   calculateData.ap_key = '';
  //   calculateData.a_token = '';
  //   loanRequest(calculateData, (res, done) => {
  //     console.log({res});
  //     if (done && res.data.status) {
  //       Actions.push('LoanCalculate', {data: res.data.loan_request, refresh});
  //     } else {
  //       Alert.alert('', 'ทำรายการไม่สำเร็จ');
  //     }
  //   });
  // };

  const onPressNext = async() => {
    const token = await AsyncStorage.getItem('token');
    const tokenString = JSON.parse(token)
    const requestUrl = `https://ecoop.crtc-service.com/alt_loan/frm_slipdata.php?prj=${loanTypeList[loanTypeIndex].shortName}&token=${tokenString}&device=mobile`;
    await Linking.openURL(requestUrl);
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
          text: 'ส่งคำขอกู้ออนไลน์',
          style: {color: '#fff'},
        }}
        innerContainerStyles={{backgroundColor: Constant.color.violet}}
        containerStyle={{
          backgroundColor: Constant.color.violet,
          borderBottomColor: Constant.color.violet,
        }}
      />

      <View style={styles.body}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <View>
            {/* <Text style={styles.label}>ข้อมูลสลิปเงินเดือน</Text>
            <SizedBox height={10} />
            <View style={styles.br} />
            <SizedBox height={13} />
            <Text style={styles.label}>+เงินเดือน :</Text>
            <SizedBox height={5} />
            <AppTextInput
              value={salary}
              onChangeText={setSalary}
              returnKeyType="next"
            />
            <SizedBox height={5} />
            <Text style={styles.label}>+วิทยฐานะ :</Text>
            <SizedBox height={5} />
            <AppTextInput
              value={salwit1}
              onChangeText={setSalwit1}
              returnKeyType="next"
            />
            <SizedBox height={5} />
            <Text style={styles.label}>+ค่าตอบแทน :</Text>
            <SizedBox height={5} />
            <AppTextInput
              value={salwit2}
              onChangeText={setSalwit2}
              returnKeyType="next"
            />
            <SizedBox height={5} />
            <Text style={styles.label}>+เงินได้อื่นๆ :</Text>
            <SizedBox height={5} />
            <AppTextInput
              value={salOth}
              onChangeText={setSalOth}
              returnKeyType="next"
            />
            <SizedBox height={5} />
            <Text style={styles.label}>+ภาษี :</Text>
            <SizedBox height={5} />
            <AppTextInput
              value={tax}
              onChangeText={setTax}
              returnKeyType="next"
            />
            <SizedBox height={5} />
            <Text style={styles.label}>+กบข :</Text>
            <SizedBox height={5} />
            <AppTextInput
              value={korboko}
              onChangeText={setKorboko}
              returnKeyType="next"
            />
            <SizedBox height={5} />
            <Text style={styles.label}>+สหกรณ์ *หักสองทางให้ใส่ยอดรวม :</Text>
            <SizedBox height={5} />
            <AppTextInput
              value={coop}
              onChangeText={setCoop}
              returnKeyType="next"
            />
            <SizedBox height={5} />
            <Text style={styles.label}>+ชพค :</Text>
            <SizedBox height={5} />
            <AppTextInput
              value={chorpoko}
              onChangeText={setChorpoko}
              returnKeyType="next"
            />
            <SizedBox height={5} />
            <Text style={styles.label}>+ชพส :</Text>
            <SizedBox height={5} />
            <AppTextInput
              value={chorposo}
              onChangeText={setChorposo}
              returnKeyType="next"
            />
            <SizedBox height={5} />
            <Text style={styles.label}>+อื่นๆ (ธนาคาร,ประกัน) :</Text>
            <SizedBox height={5} />
            <AppTextInput value={othpay} onChangeText={setOthpay} />
            <SizedBox height={5} /> */}
            <Text style={styles.label}>เลือกประเภทสัญญาเงินกู้</Text>
            <SizedBox height={5} />
            <AppListPicker
              title="เลือกประเภทสัญญาเงินกู้"
              showOnKey="fullName"
              onSelect={({item, index}) => {
                setLoanTypeName(item.fullName);
                setLoanTypeIndex(index);
              }}
              data={loanTypeList}>
              <ButtonPicker text={loanTypeName} />
            </AppListPicker>
            <SizedBox height={20} />
            {/* <AppButton
              text="คำนวณสิทธิ์"
              onPress={onCalculate}
              disabled={!validate}
            /> */}
            <AppButton
              text="ถัดไป"
              onPress={onPressNext}
              disabled={loanTypeIndex == -1}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </LinearGradient>
  );
};

FormRequestLoan.defaultProps = {};

export default useNavigator(FormRequestLoan);

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
