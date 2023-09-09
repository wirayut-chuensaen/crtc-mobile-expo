/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {Component, useEffect, useState} from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import {Icon, Header, Button} from 'react-native-elements';
import Constant from '../util/Constant';

import LinearGradient from 'react-native-linear-gradient';
import RowInfo from '../item/RowInfo';
import {getSavemasRegist, savemas_Detail} from '../../actions/Service';
import SizedBox from '../component/SizedBox';
import AppButton from '../component/AppButton';
import useNavigator from '../util/useNavigator';
import TableSavemasList from '../component/TableSavemasList';
import showError from '../util/showError';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const Savemas_Detail = ({item, navigation, Actions}) => {
  const [info, setInfo] = useState({});
  const [savemasRegist, setSavemasRegist] = useState([]);

  const initialData = () => {
    var id = item.accno;

    savemas_Detail(id, (res, done) => {
      if (done && res.data.status) {
        setInfo(res.data.data.savemas_detail[0]);
      } else {
        showError(res.data.message);
      }
    });

    getSavemasRegist((res, done) => {
      if (done && res.data.status) {
        setSavemasRegist(res.data.data);
      } else {
        showError(res.data.message);
      }
    });
  };

  useEffect(() => {
    initialData();
  }, []);

  const toStatement = () => Actions.push('Statement', info);

  const toFormChange = () =>
    Actions.push('FormChangeDeposit', {
      accno: info.accno,
      refresh: initialData,
    });

  return (
    <View style={styles.body}>
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
        centerComponent={{text: 'เงินฝาก', style: {color: '#fff'}}}
        innerContainerStyles={{backgroundColor: Constant.color.violet}}
        containerStyle={{
          backgroundColor: Constant.color.violet,
          borderBottomColor: Constant.color.violet,
        }}
        // rightComponent={<Icon name='person' color='#fff' iconStyle={{backgroundColor:Constant.color.violet}}  />}
      />

      <View style={styles.body}>
        <LinearGradient
          locations={[0, 0.4]}
          colors={[Constant.color.violetlight, Constant.color.darkPurple]}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={styles.linearGradient}>
          <View style={styles.content}>
            <TableSavemasList
              key="savemas"
              header={[
                <View>
                  <RowInfo keys="รายละเอียด" name="" />
                  <RowInfo keys="ประเภท : " name={info.savemas_type} />
                  <RowInfo keys="เลขบัญชี : " name={info.accno} />
                  <RowInfo keys="ชื่อบัญชี : " name={info.acname} />
                  <RowInfo keys="วันที่เปิด : " name={info.apply_date} />
                  <RowInfo
                    keys="จำนวนเงิน : "
                    name={info.balance}
                    color={Constant.color.violet}
                  />
                  <RowInfo keys="ปรับปรุงล่าสุด : " name={info.last_update} />
                  <AppButton
                    text="ดูรายการเดินบัญชี"
                    style={styles.margin}
                    onPress={toStatement}
                  />
                  <SizedBox height={5} />
                  <AppButton
                    text="ส่งคำร้องเปลี่ยนแปลงเงินฝาก"
                    style={styles.margin}
                    onPress={toFormChange}
                  />
                  <SizedBox height={10} />
                </View>,
              ]}
              data={savemasRegist}
            />
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

export default useNavigator(Savemas_Detail);

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: Constant.color.white,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Constant.color.gray,
  },
  margin: {
    marginLeft: 10,
    marginRight: 10,
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

  Button: {
    marginTop: 20,
    margin: 10,
    backgroundColor: Constant.color.violetlight,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Constant.color.gray,
  },
});
