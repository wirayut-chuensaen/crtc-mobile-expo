/* eslint-disable react-hooks/rules-of-hooks */
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
import {} from '../../../actions/Service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonPicker from '../../component/ButtonPicker';
import AppListPicker from '../../component/AppListPicker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import StepBar from '../../component/StepBar';
import WantSwitch from '../../component/WantSwitch';
import NumberHelper from '../../util/NumberHelper';
import withSeparate from '../../util/withSeparate';
import toCurrency from '../../util/toCurrency';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const LoanCalculate = ({navigation, Actions, refresh, data}) => {
  const [memberId, setMemberId] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('mem_id').then(mem_id => {
      if (mem_id != null) {
        setMemberId(mem_id);
      }
    });
  }, []);

  const onConfirm = () => Actions.push('FormUploadDocument');

  const buildLabel = (left, right, rightColor) => (
    <View>
      <View style={styles.twoLabel}>
        <Text style={styles.label}>{left}</Text>
        <Text style={[styles.label, rightColor && {color: rightColor}]}>
          {right}
        </Text>
      </View>
      {!rightColor && (
        <>
          <SizedBox height={6} />
          <View style={styles.br} />
          <SizedBox height={10} />
        </>
      )}
    </View>
  );

  const approve = data.loan_types.length > 0;

  const _renderLoanType = () => {
    const viewList = data.loan_types.map((loan, index) => (
      <View style={styles.content}>
        <SizedBox height={16} />
        <View style={styles.twoLabel}>
          <Text style={styles.title}>ส่งชำระ แบบ {index + 1}</Text>
        </View>
        <SizedBox height={5} />
        {buildLabel(loan.txtshow, '')}
        {buildLabel('ส่งชำระเดือนละ :', toCurrency(loan.total))}
        {buildLabel('ตอนนี้มีหุ้นอยู่ :', toCurrency(loan.stock))}
        {buildLabel('ใช้ผู้ค้ำ :', `${loan.n_warr} คน`)}
        {buildLabel('ต้องหักลบหนี้เดิม :', loan.deduct_old_loan)}
        <View style={styles.center}>
          <AppButton
            text={`เลือกส่งแบบที่ ${index + 1}`}
            onPress={() =>
              Actions.push('FormUploadDocument', {data, loan, refresh})
            }
          />
        </View>
        <SizedBox height={14} />
      </View>
    ));

    return withSeparate(viewList, <SizedBox height={10} />);
  };

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
          text: 'ผลการคำนวณสิทธิ์',
          style: {color: '#fff'},
        }}
        innerContainerStyles={{backgroundColor: Constant.color.violet}}
        containerStyle={{
          backgroundColor: Constant.color.violet,
          borderBottomColor: Constant.color.violet,
        }}
      />

      <KeyboardAwareScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <View>
          <SizedBox height={15} />
          <View style={styles.content}>
            <SizedBox height={16} />
            <View style={styles.center}>
              <Text style={styles.title}>{data.title}</Text>
            </View>
            <SizedBox height={20} />
            {buildLabel('ข้อมูลเงินเดือนของคุณ', '')}
            {buildLabel('เลขสมาชิก :', memberId)}
            {buildLabel('ชื่อ - สกุล :', data.mname)}
            {buildLabel('ตำแหน่ง :', data.i_pos)}
            {buildLabel('เบอร์ติดต่อกลับ :', data.tel_no)}
            <SizedBox height={18} />
          </View>
          <SizedBox height={10} />
          <View style={styles.content}>
            <SizedBox height={16} />
            {buildLabel('ข้อมูลประกอบการคำนวณ', '')}
            {buildLabel('เงินเดือน :', toCurrency(data.salary))}
            {buildLabel('วิทยฐานะ :', toCurrency(data.sal_wit1))}
            {buildLabel('ค่าตอบแทน :', toCurrency(data.sal_oth))}
            {buildLabel('รายรับ (รวม) :', toCurrency(data.sal_sum))}
            {buildLabel('รายจ่าย (รวม) :', toCurrency(data.pay_sum))}
            {buildLabel('30% ของรายรับ :', toCurrency(data['sal_30%']))}
            {buildLabel('งวดส่งสัญญาเดิม :', toCurrency(data.loan_urgent_old))}
            {buildLabel('หนี้คงเหลือสัญญาเดิม :', toCurrency(data.loan_urgent))}
            {buildLabel('อายุการเป็นสมาชิก :', `${data.old_member} งวด`)}
            <SizedBox height={10} />
            {buildLabel(
              'ผลการคำนวณสิทธิ์กู้ : ',
              approve ? 'ได้รับการอนุมัติ' : 'ไม่ได้รับการอนุมัติ',
              approve ? '#00942C' : Constant.color.red,
            )}
            <SizedBox height={24} />
          </View>
          <SizedBox height={10} />
          {_renderLoanType()}
          <SizedBox height={15} />
        </View>
      </KeyboardAwareScrollView>
    </LinearGradient>
  );
};

LoanCalculate.defaultProps = {};

export default useNavigator(LoanCalculate);

const styles = StyleSheet.create({
  br: {
    backgroundColor: '#E1E1E1',
    height: 1,
    marginHorizontal: 5,
  },
  twoLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 13,
  },
  label: {
    fontSize: 14,
    color: Constant.color.dark,
  },
  title: {
    fontSize: 16,
    color: Constant.color.dark,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Constant.color.white,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Constant.color.gray,
  },
  scrollView: {
    marginHorizontal: 10,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
