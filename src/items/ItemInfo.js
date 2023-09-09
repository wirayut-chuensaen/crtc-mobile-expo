import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Constant from '../util/Constant';

export class ItemInfo extends Component {
  render() {
    return (
      <View style={styles.content}>
        <View style={{flexDirection: 'column', marginBottom: 8}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontWeight: 'bold'}}>ประเภท : </Text>
            <Text style={{flex: 1, flexDirection: 'row', textAlign: 'right'}}>
              {this.props.savemas_type}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'column', marginBottom: 8}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontWeight: 'bold'}}>เลขบัญชี : </Text>
            <Text style={{flex: 1, flexDirection: 'row', textAlign: 'right'}}>
              {this.props.accno}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'column', marginBottom: 8}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontWeight: 'bold'}}>ชื่อบัญชี : </Text>
            <Text
              style={{
                flex: 1,
                flexDirection: 'row',
                textAlign: 'right',
                color: Constant.color.green,
              }}>
              {this.props.acname}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'column'}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontWeight: 'bold'}}>เงินคงเหลือ : </Text>
            <Text
              style={{
                flex: 1,
                flexDirection: 'row',
                textAlign: 'right',
                color: Constant.color.violet,
              }}>
              {this.props.balance}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default ItemInfo;

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
