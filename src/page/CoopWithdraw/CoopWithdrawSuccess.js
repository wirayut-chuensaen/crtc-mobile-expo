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
import Ionicons from 'react-native-vector-icons/Ionicons';
import toCurrency from '../../util/toCurrency';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const CoopWithdrawSuccess = ({navigation, Actions, refresh, amount, remark, subscribe = false, info = {}, successData = {}}) => {
  const onBack = () => Actions.popToRoot();

  return (
    <LinearGradient
      locations={[0, 0.4]}
      colors={[Constant.color.violetlight, Constant.color.darkPurple]}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      style={{...StyleSheet.absoluteFillObject}}>
      <Header
        centerComponent={{
          text: '',
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
            <SizedBox height={28} />
            <StepBar step={3} />
            <SizedBox height={20} />
            <View style={styles.center}>
              <Text style={styles.label}>ดำเนินการถอนเงินฝากสำเร็จ</Text>
              <SizedBox height={20} />
              <Ionicons name="ios-checkmark-circle" size={80} color="#00942C" />
              <SizedBox height={20} />
              <Text style={styles.label}>จำนวนเงิน {toCurrency(amount)}</Text>
              <SizedBox height={10} />
              <Text style={styles.label}>{successData.transaction.transactionDateTime}</Text>
              <SizedBox height={5} />
              <Text style={styles.label}>รหัสอ้างอิง : {successData.transactionReferenceNumber}</Text>
            </View>

            <SizedBox height={50} />
            <AppButton
              text="กลับหน้าหลัก"
              onPress={onBack}
              // disabled={!validate}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </LinearGradient>
  );
};

CoopWithdrawSuccess.defaultProps = {};

export default useNavigator(CoopWithdrawSuccess);

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'white',
    borderRadius: 5,
    margin: 15,
    flex: 1,
    padding: 10,
  },
  label: {
    fontSize: 14,
    color: Constant.color.dark,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
