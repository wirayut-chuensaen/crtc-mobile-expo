import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
import Constant from '../util/Constant';

export class ItemNews extends Component {
  render() {
    return (
      <View style={styles.item_content}>
        <View style={styles.itemContainer}>
          <Text numberOfLines={1}>{this.props.title}</Text>
        </View>
        <Icon name="chevron-right" color="#636e72" size={25} />
      </View>
    );
  }
}

export default ItemNews;

const styles = StyleSheet.create({
  item: {
    flex: 1,
  },
  item_content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    backgroundColor: Constant.color.white,
    borderRadius: 5,
  },

  content: {
    margin: 10,
    padding: 10,
    backgroundColor: Constant.color.white,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: Constant.color.gray,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  image: {
    width: 40,
    height: 40,
  },
});
