import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import {Icon, Header} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import Constant from '../util/Constant';

const AddAccount = ({navigation, route}) => {
  const [accountNumber, setAccountNumber] = useState('');

  const _renderFooter = () => {
    const onCheck = () => {
      route?.params?.onAddSuccess();
      navigation.goBack();
    };

    return (
      <View style={{marginVertical: 20}}>
        <TouchableOpacity onPress={onCheck}>
          <LinearGradient
            locations={[0, 0.4]}
            colors={[Constant.color.violetlight, Constant.color.darkPurple]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={{
              height: 50,
              marginHorizontal: 20,
              borderRadius: 8,
              justifyContent: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: 'white', fontSize: 14}}>ตรวจสอบบัญชี</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#e1e1e1'}}>
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
        centerComponent={{text: 'เพิ่มบัญชี', style: {color: '#fff'}}}
        innerContainerStyles={{backgroundColor: Constant.color.violet}}
        containerStyle={{
          backgroundColor: Constant.color.violet,
          borderBottomColor: Constant.color.violet,
        }}
      />

      <View style={{marginTop: 20}}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="เลขที่บัญชี"
            value={accountNumber}
            onChangeText={setAccountNumber}
            keyboardType="number-pad"
            style={styles.input}
          />
          <Text style={{fontSize: 11}}>* ระบุเลขที่บัญชี 10 - 19 หลัก</Text>
        </View>

        {_renderFooter()}
      </View>
    </View>
  );
};

export default AddAccount;

const styles = StyleSheet.create({
  inputContainer: {
    padding: 14,
    borderRadius: 4,
    backgroundColor: 'white',
    marginHorizontal: 20,
  },
  input: {
    backgroundColor: '#eee',
    paddingHorizontal: 10,
    borderRadius: 4,
    marginBottom: 10,
  },
});
