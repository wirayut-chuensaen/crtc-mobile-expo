import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Icon, Header } from 'react-native-elements';
import Constant from '../util/Constant';

import LinearGradient from 'react-native-linear-gradient';
import useNavigator from '../util/useNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import SizedBox from '../component/SizedBox';
import AppButton from '../component/AppButton';
import AppTextInput from '../component/AppTextInput';
import { getBankAccount, updateDividendAccount } from '../../actions/Service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonPicker from '../component/ButtonPicker';
import AppListPicker from '../component/AppListPicker';
import AppLoading from '../component/AppLoading';
import RowInfo from '../item/RowInfo';
import showError from '../util/showError';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const FormChangeDividend = ({ navigation, Actions, refresh }) => {
  const [accountName, setAccountName] = useState('');
  const [accountIndex, setAccountIndex] = useState(-1);
  const [accountList, setAccountList] = useState([]);
  const [validate, setValidate] = useState(false);
  const [before, setBefore] = useState({});
  const [after, setAfter] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setValidate(accountIndex !== -1);
  }, [accountIndex]);

  useEffect(() => {
    initialData();
  }, []);

  const initialData = () => {
    setIsLoading(true)
    getBankAccount((res, done) => {
      setIsLoading(false)
      if (done && res.data.status) {
        setAccountList(
          res.data.bank_accounts.map(x => {
            x.fullName = `${x.BANKID} - ${x.BANKACNO.trim()}`;
            return x;
          }),
        );

        setBefore(res.data.bank_account_befor)
        setAfter(res.data.bank_account_after)
      } else {
        showError(res.data.message);
      }
    });
  };

  const onSave = () => {
    updateDividendAccount(
      {
        bankid: accountList[accountIndex].BANKID,
        bankacno: accountList[accountIndex].BANKACNO.trim(),
      },
      (res, done) => {
        if (done && res.data.status) {
          Actions.pop();
          refresh && refresh();
        } else {
          showError(res.data.message);
        }
      },
    );
  };

  const soRefresh = () => {
    initialData();
  }

  const toCreateNewBankAccount = () => Actions.push('FormCreateBankAccount', { refresh: soRefresh });

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
          text: 'เปลี่ยนแปลงเลขบัญชีรับปันผล',
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
        <Text style={styles.label}>เปลี่ยนแปลงเลขบัญชีรับปันผล</Text>
        <SizedBox height={10} />
        <View style={styles.br} />
        <SizedBox height={13} />
        <AppButton text="เพิ่มบัญชีใหม่" onPress={toCreateNewBankAccount} />
        <SizedBox height={20} />
        <Text style={styles.label}>บัญชีที่มีอยู่แล้ว</Text>
        <SizedBox height={10} />
        <AppListPicker
          title="เลือกบัญชี"
          showOnKey="fullName"
          onSelect={({ item, index }) => {
            setAccountName(item.fullName);
            setAccountIndex(index);
          }}
          data={accountList}>
          <ButtonPicker text={accountName} hintText="บัญชี" />
        </AppListPicker>
        <SizedBox height={20} />
        <AppButton text="บันทึกข้อมูล" onPress={onSave} disabled={!validate} />
        <SizedBox height={20} />
        {before != undefined && <>
          <RowInfo
            keys="เปลี่ยนแปลงบัญชีรับปันผลแล้ว"
            name=""
            labelColor="#00942C"
            containerStyle={{paddingVertical: 10, paddingHorizontal: 0}}
          />
          <RowInfo
            keys="ชื่อบัญชีเดิม : "
            name={before.BANKID}
            containerStyle={{paddingVertical: 10, paddingHorizontal: 0}}
          />
          <RowInfo
            keys="เลขบัญชี : "
            name={before.BANKACNO}
            containerStyle={{paddingVertical: 10, paddingHorizontal: 0}}
          />
          <SizedBox height={20} />
        </>}

        {
          after != undefined && <>
            <RowInfo
              keys="เปลี่ยนเป็น"
              name=""
              labelColor="#00942C"
              containerStyle={{paddingVertical: 10, paddingHorizontal: 0}}
            />
            <RowInfo
              keys="ชื่อบัญชี : "
              name={after.BANKID}
              containerStyle={{paddingVertical: 10, paddingHorizontal: 0}}
            />
            <RowInfo
              keys="เลขบัญชี : "
              name={after.BANKACNO}
              containerStyle={{paddingVertical: 10, paddingHorizontal: 0}}
            />
            <RowInfo
              keys="วันที่บันทึก : "
              name={after.last_update}
              containerStyle={{paddingVertical: 10, paddingHorizontal: 0}}
            />
            {/* <RowInfo
          keys="เมื่อวันที่ : "
          name={before.BANKACNO}
        /> */}
          </>
        }

      </View>
    </LinearGradient>
  );
};

FormChangeDividend.defaultProps = {};

export default useNavigator(FormChangeDividend);

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
