/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import {Icon, Header, Button} from 'react-native-elements';
import Constant from '../util/Constant';

import LinearGradient from 'react-native-linear-gradient';
import RowInfo from '../item/RowInfo';
import {getLoanRegist, loanDetail} from '../../actions/Service';
import AppButton from '../component/AppButton';
import SizedBox from '../component/SizedBox';
import TableRequestList from '../component/TableRequestList';
import useNavigator from '../util/useNavigator';
import showError from '../util/showError';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const Loan_Detail = ({item, navigation, Actions, currency}) => {
  const [info, setInfo] = useState({});
  const [loanRegist, setLoanRegist] = useState([]);

  useEffect(() => {
    initialData();
  }, []);

  const initialData = () => {
    var id = item.RECNO;

    loanDetail(id, (res, done) => {
      if (done && res.data.status) {
        setInfo(res.data.data.loan[0]);
      } else {
        showError(res.data.message);
      }
    });

    getLoanRegist((res, done) => {
      if (done && res.data.status) {
        setLoanRegist(res.data.data);
      } else {
        showError(res.data.message);
      }
    });
  };

  const toStatement = () => Actions.push('Loan_Statement', info);

  const toFormChange = () =>
    Actions.push('FormChangeLoan', {
      contactNumber: info.LOAN_NO,
      refresh: initialData,
      currency: Number(info.PAYMENT.replace(/[^0-9.-]+/g, '')),
    });

  return (
    <View style={styles.container}>
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
        centerComponent={{text: 'เงินกู้', style: {color: '#fff'}}}
        innerContainerStyles={{backgroundColor: Constant.color.violet}}
        containerStyle={{
          backgroundColor: Constant.color.violet,
          borderBottomColor: Constant.color.violet,
        }}
      />

      <View style={styles.body}>
        <LinearGradient
          locations={[0, 0.4]}
          colors={[Constant.color.violetlight, Constant.color.darkPurple]}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={styles.linearGradient}>
          <View style={styles.content}>
            <TableRequestList
              key="loan"
              header={[
                <View>
                  <RowInfo keys="รายละเอียด" name="" />
                  <RowInfo keys="ประเภทสัญญา : " name={info.loan_type} />
                  <RowInfo keys="เลขที่สัญญา : " name={info.LOAN_NO} />
                  <RowInfo keys="วันที่ทำสัญญา : " name={info.APPLY_DATE} />
                  <RowInfo keys="วงเงินที่อนุมัติ : " name={info.AMOUNT} />
                  <RowInfo
                    keys="ส่งชำระต่องวด : "
                    name={info.PAYMENT}
                    color={Constant.color.violet}
                  />
                  <RowInfo
                    keys="หนี้คงเหลือ : "
                    name={info.BALANCE}
                    color={Constant.color.violet}
                  />
                  <SizedBox height={20} />
                  <AppButton
                    text="ดูรายการเดินบัญชี"
                    style={styles.margin}
                    onPress={toStatement}
                  />
                  <SizedBox height={5} />
                  <AppButton
                    text="ส่งคำร้องเปลี่ยนแปลงเงินส่งชำระหนี้"
                    style={styles.margin}
                    onPress={toFormChange}
                  />
                  <SizedBox height={10} />
                </View>,
              ]}
              data={loanRegist}
            />
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

export default useNavigator(Loan_Detail);

const styles = StyleSheet.create({
  container: {flex: 1},
  content: {
    flex: 1,
    flexDirection: 'column',
    marginVertical: 15,
    backgroundColor: Constant.color.white,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Constant.color.gray,
  },

  body: {
    flex: 1,
  },

  wapper_content: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },

  margin: {
    marginLeft: 10,
    marginRight: 10,
  },
});
