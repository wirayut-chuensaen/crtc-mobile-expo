import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Constant from '../util/Constant';

export class RowInfo_More extends Component {
  render() {
    return (
      <View
        style={{flexDirection: 'column', paddingLeft: 10, paddingRight: 10}}>
        <View style={styles.item_content}>
          <Text style={{fontWeight: 'bold'}}>{this.props.keys}</Text>
          <Text
            style={{
              flex: 1,
              flexDirection: 'row',
              textAlign: 'right',
              color: this.props.color,
            }}>
            {this.props.name}
          </Text>
        </View>
        <View style={{height: 1, backgroundColor: Constant.color.white}} />
      </View>
    );
  }
}

export default RowInfo_More;

const styles = StyleSheet.create({
  item: {
    flex: 1,
  },
  item_content: {
    flexDirection: 'row',
    padding: 10,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    textAlign: 'right',
  },
});
