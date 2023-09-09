import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Constant from '../util/Constant';

export class ItemCooperative extends Component {
  render() {
    return (
      <View style={styles.content}>
        <View style={{flexDirection: 'column', marginBottom: 8}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontWeight: 'bold'}}>เลขที่ใบเสร็จ : </Text>
            <Text style={{flex: 1, flexDirection: 'row', textAlign: 'right'}}>
              {this.props.BILL_NO}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'column', marginBottom: 8}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontWeight: 'bold'}}>วันที่ออกใบเสร็จ : </Text>
            <Text style={{flex: 1, flexDirection: 'row', textAlign: 'right'}}>
              {this.props.BILL_DATE}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'column', marginBottom: 8}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontWeight: 'bold'}}>ชื่อ - สกุล : </Text>
            <Text
              style={{
                flex: 1,
                flexDirection: 'row',
                textAlign: 'right',
                color: Constant.color.green,
              }}>
              {this.props.DISBURSE_NAME}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'column'}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontWeight: 'bold'}}>ยอดหักรวม : </Text>
            <Text
              style={{
                flex: 1,
                flexDirection: 'row',
                textAlign: 'right',
                color: Constant.color.violet,
              }}>
              {this.props.AMOUNT}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default ItemCooperative;

const styles = StyleSheet.create({
  item: {
    flex: 1,
  },
  content: {
    margin: 10,
    padding: 10,
    backgroundColor: Constant.color.white,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: Constant.color.gray,
  },
  // item_content: {
  //     flex: 1,
  //     flexDirection: 'column',
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     padding:10
  // },
});
