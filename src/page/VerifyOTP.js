/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Icon} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {verifyTransaction, transfer, smsDelay} from '../../actions/Service';
import Constant from '../util/Constant';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useNavigator from '../util/useNavigator';
import VirtualKeyboard, {
  VirtualKeyboardEvent,
} from '../component/VirtualKeyboard';

const {height, width} = Dimensions.get('screen');

const VerifyOTP = ({
  navigation,
  toAccount,
  fromAccount,
  remark,
  amount,
  fee,
}) => {
  let [pinPhone, setPinPhone] = useState('');
  let [otp, setOtp] = useState('');
  let [elapse, setElapse] = useState(0);
  let [canResend, setCanResend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataPersistant, setDataPersistant] = useState();
  const [delay, setDelay] = useState(30);
  let _loopRef = useRef(null);

  useEffect(() => {
    AsyncStorage.getItem('pinPhone').then((p) => setPinPhone(p));
    requestOTP();
    getDelay();

    return () => {
      if (_loopRef.current !== null) {
        clearInterval(_loopRef.current);
        _loopRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (elapse !== 0) {
      if (canResend) {
        setCanResend(false);
      }
    } else {
      if (!canResend) {
        setCanResend(true);
      }
    }
  }, [elapse]);

  const getDelay = async () => {
    try {
      const response = await smsDelay();
      const {status, data} = response.data;
      if (status) {
        setDelay(+data.resend_delay);
        setElapse(+data.resend_delay);
      } else {
        setElapse(30);
      }

      if (_loopRef.current == null) {
        _loopRef.current = setInterval(() => {
          setElapse((prev) => {
            return prev > 0 ? prev - 1 : 0;
          });
        }, 1000);
      }
    } catch (e) {
      console.log('getDelay failed', e.response);
    }
  };

  const requestOTP = () => {
    // setIsLoading(true);
    verifyTransaction(
      {
        to_account: toAccount.ACCNO.replace('-', ''),
        from_account: fromAccount.ACCNO.replace('-', ''),
        remark,
        amount,
        fee,
      },
      (res, done) => {
        // setIsLoading(false);
        if (done) {
          setDataPersistant(res.data.data);
        }
      },
    );
  };

  useEffect(() => {
    console.log(otp.length, dataPersistant);
    if (otp.length === 6 && dataPersistant) {
      checkOtp(dataPersistant);
    }
  }, [otp, dataPersistant]);

  const checkOtp = (data) => {
    // navigation.replace('TransferSuccess', {
    //   toAccount,
    //   fromAccount,
    //   fee,
    //   ...data,
    // });
    setIsLoading(true);
    transfer(toAccount.ACCNO, {otp}, (res, done) => {
      console.log({res, done})
      setIsLoading(false);
      if (done && res.data.status) {
        navigation.replace('TransferSuccess', {
          toAccount,
          fromAccount,
          fee,
          ...dataPersistant,
        });
      } else {
        setOtp('');
        console.log(res)
        Alert.alert('', res.data.message);
      }
    });
  };

  const onResend = () => {
    if (canResend) {
      requestOTP();
      setElapse(delay);
    }
  };

  const onPressKey = (key, value) => {
    if (key === VirtualKeyboardEvent.DELETE) {
      if (otp.length > 0) {
        setOtp(otp.slice(0, -1));
      }
    } else {
      if (otp.length < 6) {
        setOtp(`${otp}${value}`);
      }
    }
  };

  return (
    <TouchableOpacity activeOpacity={1} style={{flex: 1}}>
      <LinearGradient
        locations={[0, 0.4]}
        colors={[Constant.color.violetlight, Constant.color.darkPurple]}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={{...StyleSheet.absoluteFillObject}}
      />
      <View style={{zIndex: 9999, flex: 1}}>
        <TouchableOpacity
          onPress={navigation.goBack}
          style={{
            marginTop: 50,
            marginLeft: 10,
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
          }}>
          <Icon name="chevron-thin-left" type="entypo" color="#fff" size={30} />
        </TouchableOpacity>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: 'white', marginTop: 120}}>
            กรุณากรอกหมายเลข OTP ที่ได้รับทาง SMS
          </Text>
          <Text style={{color: 'white', marginTop: 20}}>
            หมายเลข {pinPhone}
          </Text>
          <View>
            <View
              pointerEvents="none"
              style={{marginTop: 30, alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: width * 0.09,
                  color: 'white',
                  letterSpacing: width * 0.035,
                  alignSelf: 'flex-start',
                }}>
                {otp}
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <View style={styles.underline} />
                <View style={styles.underline} />
                <View style={styles.underline} />
                <View style={styles.underline} />
                <View style={styles.underline} />
                <View style={styles.underline} />
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={onResend}>
            {canResend ? (
              <Text style={styles.resendText}>ส่งอีกครั้ง</Text>
            ) : (
              <Text style={styles.resendText}>
                ส่งอีกครั้ง ({elapse} วินาที)
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <VirtualKeyboard onPress={onPressKey} />

      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={{color: '#fff'}}
      />
    </TouchableOpacity>
  );
};

export default useNavigator(VerifyOTP);

const styles = StyleSheet.create({
  resendText: {
    color: 'white',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
  underline: {
    height: 2,
    width: width * 0.07,
    backgroundColor: 'white',
    marginHorizontal: 3,
  },
});
