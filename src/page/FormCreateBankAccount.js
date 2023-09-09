import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import {Icon, Header} from 'react-native-elements';
import Constant from '../util/Constant';

import LinearGradient from 'react-native-linear-gradient';
import useNavigator from '../util/useNavigator';
import {SafeAreaView} from 'react-native-safe-area-context';
import SizedBox from '../component/SizedBox';
import AppButton from '../component/AppButton';
import AppTextInput from '../component/AppTextInput';
import {addBankAccount, getBankList} from '../../actions/Service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonPicker from '../component/ButtonPicker';
import AppListPicker from '../component/AppListPicker';
import AppImagePicker from '../component/AppImagePicker';
import {AppButtonView} from '../component/AppButton';
import showError from '../util/showError';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const FormCreateBankAccount = ({navigation, Actions, refresh}) => {
  const [bankList, setBankList] = useState([]);
  const [bankName, setBankName] = useState('');
  const [bankIndex, setBankIndex] = useState(-1);
  const [bankNo, setBankNo] = useState('');
  const [validate, setValidate] = useState(false);
  const [bankImage, setBankImage] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setValidate(bankIndex !== -1 && bankNo.length >= 6 && bankImage != undefined);
  }, [bankIndex, bankNo, bankImage]);

  useEffect(() => {
    initialData();
  }, []);

  const initialData = () => {
    getBankList((res, done) => {
      if (done && res.data.status) {
        setBankList(
          Object.keys(res.data.banks).map(key => {
            const name = res.data.banks[key];
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

  const onSave = () => {
    setIsLoading(true)
    addBankAccount(
      {
        file: bankImage,
        bank_id: bankList[bankIndex].shortName,
        bank_account: bankNo,
      },
      (res, done) => {
        setIsLoading(false)
        console.log(res);
        if (done && res.data.status) {
          Actions.pop();
          refresh && refresh();
        } else {
          showError(res.data.message);
        }
      },
    );
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
          text: 'เพิ่มบัญชีใหม่',
          style: {color: '#fff'},
        }}
        innerContainerStyles={{backgroundColor: Constant.color.violet}}
        containerStyle={{
          backgroundColor: Constant.color.violet,
          borderBottomColor: Constant.color.violet,
        }}
      />

      <View style={styles.body}>
        <Text style={styles.label}>เพิ่มบัญชีใหม่</Text>
        <SizedBox height={10} />
        <View style={styles.br} />
        <SizedBox height={13} />
        <AppListPicker
          title="เลือกธนาคาร"
          showOnKey="fullName"
          onSelect={({item, index}) => {
            setBankName(item.fullName);
            setBankIndex(index);
          }}
          data={bankList}>
          <ButtonPicker text={bankName} hintText="ธนาคาร" />
        </AppListPicker>
        <SizedBox height={20} />
        <Text style={styles.label}>เลขบัญชี</Text>
        <SizedBox height={10} />
        <AppTextInput
          placeholder="เลขบัญชี"
          value={bankNo}
          onChangeText={setBankNo}
          maxLength={15}
        />
        <SizedBox height={20} />
        {bankImage != null && <Image source={{uri: bankImage.uri}} style={{width: 140, height: 100, resizeMode: 'contain', backgroundColor: 'black', borderRadius: 8, marginBottom: 10}} />}
        <AppImagePicker onResult={setBankImage}>
          <AppButtonView text="อัพโหลดรูปภาพสมุดบัญชี" style={{width: '60%', paddingVertical: 6}} />
        </AppImagePicker>
        <SizedBox height={20} />
        <AppButton text="บันทึกข้อมูล" onPress={onSave} disabled={!validate} />
      </View>
    </LinearGradient>
  );
};

FormCreateBankAccount.defaultProps = {};

export default useNavigator(FormCreateBankAccount);

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
