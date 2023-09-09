import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Constant from '../util/Constant';

export class ItemBeneficiary extends Component {
  render() {
    return (
      <View style={styles.content}>
        <View style={{flexDirection: 'column', marginBottom: 8}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontWeight: 'bold'}}>ชื่อ-สกุล : </Text>
            <Text style={{flex: 1, flexDirection: 'row', textAlign: 'right'}}>
              {this.props.dvdname}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'column', marginBottom: 8}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontWeight: 'bold'}}>วันที่บันทึก : </Text>
            <Text style={{flex: 1, flexDirection: 'row', textAlign: 'right'}}>
              {this.props.effective_date}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'column', marginBottom: 8}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontWeight: 'bold'}}>หมายเหตุ : </Text>
            <Text style={{flex: 1, flexDirection: 'row', textAlign: 'right'}}>
              {this.props.note}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default ItemBeneficiary;

const styles = StyleSheet.create({
  item: {
    flex: 1,
  },
  content: {
    marginVertical: 10,
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
