import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Constant from '../util/Constant';

export class ItemStatement extends Component {
  renderProducts(item) {
    const views = [];
    views.push(<Text style={{fontWeight: 'bold'}}>{item.type} : </Text>);
    if (parseFloat(item.depamt) > 0) {
      views.push(
        <Text
          style={{
            flex: 1,
            flexDirection: 'row',
            textAlign: 'right',
            color: Constant.color.green,
          }}>
          {item.depamt}
        </Text>,
      );
    } else {
      views.push(
        <Text
          style={{
            flex: 1,
            flexDirection: 'row',
            textAlign: 'right',
            color: Constant.color.red,
          }}>
          {item.widamt}
        </Text>,
      );
    }

    return views;
  }
  render() {
    return (
      <View style={styles.content}>
        <View style={{flexDirection: 'column', marginBottom: 8}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontWeight: 'bold'}}>วันที่ : </Text>
            <Text style={{flex: 1, flexDirection: 'row', textAlign: 'right'}}>
              {this.props.trdate}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'column', marginBottom: 8}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontWeight: 'bold'}}>รหัสรายการ : </Text>
            <Text style={{flex: 1, flexDirection: 'row', textAlign: 'right'}}>
              {this.props.trtype}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'column', marginBottom: 8}}>
          <View style={{flexDirection: 'row'}}>
            {this.renderProducts(this.props)}
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
              {this.props.outsbal}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default ItemStatement;

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
