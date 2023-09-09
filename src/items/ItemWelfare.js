import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Constant from '../util/Constant';

export class ItemWelfare extends Component {
  render() {
    console.log(this.props);
    return (
      <View style={styles.content}>
        <View style={{flexDirection: 'column', marginBottom: 8}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontWeight: 'bold'}}>สวัสดิการ : </Text>
            <Text
              numberOfLines={1}
              style={{flex: 1, flexDirection: 'row', textAlign: 'right'}}>
              [{this.props.WLF_NAME}] {this.props.MEMO1}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'column', marginBottom: 8}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontWeight: 'bold'}}>จำนวนเงิน : </Text>
            <Text
              style={{
                flex: 1,
                flexDirection: 'row',
                textAlign: 'right',
                color: Constant.color.violet,
              }}>
              {this.props.WLF_AMT}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'column', marginBottom: 8}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontWeight: 'bold'}}>หมายเหตุ : </Text>
            <Text
              style={{
                flex: 1,
                flexDirection: 'row',
                textAlign: 'right',
                color: Constant.color.green,
              }}>
              {this.props.MEMO2}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default ItemWelfare;

const styles = StyleSheet.create({
  item: {
    flex: 1,
  },
  content: {
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
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
