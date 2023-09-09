import React, {Component} from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import {Icon, Header} from 'react-native-elements';
import Constant from '../util/Constant';

import LinearGradient from 'react-native-linear-gradient';
import RowInfo from '../item/RowInfo';
import {warranteeWho_Detail} from '../../actions/Service';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class WarranteeWho_Detail extends Component {
  state = {
    title: 'การค้ำประกัน',
    info: {},
  };

  componentDidMount() {
    var id = this.props.route.params.item.RECNO;

    warranteeWho_Detail(id, (res, err) => {
      if (res.data.status == true) {
        this.setState({
          info: res.data.data.guarantee_who_datail[0],
        });
      } else {
      }
    });
  }

  componentWillUnmount() {}

  onHandleMenu = (item) => {};

  render() {
    return (
      <View style={styles.container}>
        <Header
          leftComponent={
            <Icon
              name="chevron-thin-left"
              type="entypo"
              color="#fff"
              iconStyle={{backgroundColor: Constant.color.violet}}
              onPress={() => this.props.navigation.goBack()}
            />
          }
          centerComponent={{text: this.state.title, style: {color: '#fff'}}}
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
              <RowInfo keys="รายละเอียด" name="" />
              {/*<RowInfo keys="ประเภทสัญญา : " name={this.state.info.loan_type} />*/}
              <RowInfo keys="เลขที่สัญญา : " name={this.state.info.LOAN_NO} />
              <RowInfo
                keys="วันที่ทำสัญญา : "
                name={this.state.info.APPLY_DATE}
              />
              <RowInfo keys="เลขที่สมาชิก : " name={this.state.info.MEM_ID} />
              <RowInfo
                keys="ชื่อ - สกุล ผู้กู้ : "
                name={this.state.info.MNAME}
              />
              <RowInfo keys="วงเงินค้ำฯ : " name={this.state.info.AMOUNT} />
              <RowInfo
                keys="หนี้คงเหลือ : "
                name={this.state.info.BALANCE}
                color={Constant.color.violet}
              />
            </View>
          </LinearGradient>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 15,
    backgroundColor: Constant.color.white,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Constant.color.gray,
  },

  body: {
    height: height - 80,
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
