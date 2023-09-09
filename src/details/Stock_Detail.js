/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, {useEffect, useState} from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import {Icon, Header} from 'react-native-elements';
import Constant from '../util/Constant';

import LinearGradient from 'react-native-linear-gradient';
import RowInfo from '../item/RowInfo';
import {stock_Detail, getStockRegist} from '../../actions/Service';
import AppButton from '../component/AppButton';
import SizedBox from '../component/SizedBox';
import useNavigator from '../util/useNavigator';
import TableRequestList from '../component/TableRequestList';
import showError from '../util/showError';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const Stock_Detail = ({navigation, Actions, item, currency}) => {
  const [info, setInfo] = useState({});
  const [stockRegist, setStockRegist] = useState([]);

  useEffect(() => {
    initialData();
  }, []);

  const initialData = async () => {
    var id = item.RECNO;

    stock_Detail(id, (res, done) => {
      if (done && res.data.status) {
        setInfo(res.data.data.stock_detail);
      } else {
        showError(res.data.message);
      }
    });

    getStockRegist((res, done) => {
      if (done && res.data.status) {
        setStockRegist(res.data.data);
      } else {
        showError(res.data.message);
      }
    });
  };

  const toStockForm = () =>
    Actions.push('FormChangeStock', {refresh: initialData, currency});

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
        centerComponent={{text: 'ข้อมูลหุ้น', style: {color: '#fff'}}}
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
            <TableRequestList
              header={[
                <View>
                  <RowInfo keys="รายละเอียด" name="" />
                  <RowInfo keys="วันที่ : " name={info.DTDATE} />
                  <RowInfo keys="รหัสรายการ : " name={info.TRTYPE} />
                  <RowInfo
                    keys="งวดที่ : "
                    name={info.TMENO}
                    color={Constant.color.green}
                  />
                  <RowInfo keys="ยกมา : " name={info.BFWBAL} />
                  <RowInfo keys="เพิ่ม : " name={info.ADDAMT} />
                  <RowInfo keys="ลด : " name={info.SUBAMT} />
                  <RowInfo
                    keys="คงเหลือ : "
                    name={info.BAL}
                    color={Constant.color.violet}
                  />

                  <SizedBox height={20} />
                  <View style={styles.padding}>
                    <AppButton
                      text="ส่งคำร้องเปลี่ยนแปลงเงินส่งค่าหุ้น"
                      onPress={toStockForm}
                    />
                  </View>
                  <SizedBox height={10} />
                </View>,
              ]}
              data={stockRegist}
            />
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

export default useNavigator(Stock_Detail);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  padding: {
    paddingHorizontal: 10,
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
  title: {
    color: Constant.color.dark,
    fontSize: 14,
  },
});
