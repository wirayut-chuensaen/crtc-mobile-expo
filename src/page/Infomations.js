import React, {useState, useEffect} from 'react';
import {StyleSheet, Dimensions, View, FlatList, ScrollView} from 'react-native';
import {Icon, Header} from 'react-native-elements';
import Constant from '../util/Constant';
import RowInfo from '../item/RowInfo';
import {personalData} from '../../actions/Service';
import ItemWelfare from '../item/ItemWelfare';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const Infomations = ({navigation}) => {
  const [title, setTitle] = useState('ข้อมูลทั่วไปและสวัสดิการ');
  const [info, setInfo] = useState({});
  const [welfare, setWelfare] = useState([]);

  useEffect(() => {
    onLoadData();
  }, []);

  const onLoadData = () => {
    personalData((res, done) => {
      const {status, data} = res.data;
      if (done && status === true) {
        setInfo(data.history_data);
        setWelfare(data.welfare);
      }
    });
  };

  const _renderWelfareItem = ({item, index}) => {
    return <ItemWelfare {...item} />;
  };

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
        
        centerComponent={{text: title, style: {color: '#fff'}}}
        innerContainerStyles={{backgroundColor: Constant.color.violet}}
        containerStyle={{
          backgroundColor: Constant.color.violet,
          borderBottomColor: Constant.color.violet,
        }}
        // rightComponent={<Icon name='person' color='#fff' iconStyle={{backgroundColor:Constant.color.violet}}  />}
      />

      <ScrollView style={styles.body}>
        <View style={styles.content}>
          <RowInfo keys="ข้อมูลส่วนตัวสมาชิก" name="" />
          <RowInfo keys="ชื่อ - นามสกุล : " name={info.MNAME} />
          <RowInfo keys="เลขทะเบียน : " name={info.MEM_ID} />
          <RowInfo keys="วันเกิด : " name={info.BIRTHDAY} />
          <RowInfo keys="อายุ : " name={info.age} />
          <RowInfo keys="เงินเดือน : " name={info.SALARY} />
          <RowInfo keys="วันที่เป็นสมาชิก : " name={info.APPLY_DATE} />
          <RowInfo keys="หน่วยงาน : " name={info.NAME} />
          <RowInfo keys="ทุนเรือนหุ้น : " name={info.BALANCE} />
          <RowInfo keys="ค่าหุ้นรายเดือน : " name={info.PAYMENT} />
          <RowInfo keys="จำนวนงวด : " name={info.INSTALMENT} />

          <View style={styles.welfare}>
            <RowInfo keys="สวัสดิการของสมาชิก" name="" br={false} />
            <FlatList
              data={welfare}
              keyExtractor={(data, index) => `welfare_${index}`}
              renderItem={_renderWelfareItem}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Infomations;

const styles = StyleSheet.create({
  container: {flex: 1},
  content: {
    flexDirection: 'column',
    marginTop: 15,
    borderRadius: 5,
    paddingBottom: 10,
  },

  body: {
    flex: 1,
    backgroundColor: 'white',
  },

  wapper_content: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
    paddingHorizontal: 15,
  },
  welfare: {
    marginTop: 20,
  },
});
