import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Constant from '../util/Constant';

const RowInfo = ({keys, color, name, br, labelColor, containerStyle}) => {
  return (
    <View style={[styles.wrapper]}>
      <View style={[styles.item_content, containerStyle]}>
        <Text style={[styles.textBold, {color: labelColor}]}>{keys}</Text>
        <Text style={[styles.label, {color}]}>{name}</Text>
      </View>
      {br && <View style={[styles.br]} />}
    </View>
  );
};

RowInfo.defaultProps = {
  br: true,
};

export default RowInfo;

const styles = StyleSheet.create({
  item: {
    flex: 1,
  },
  wrapper: {flexDirection: 'column', paddingLeft: 10, paddingRight: 10},
  item_content: {
    flexDirection: 'row',
    padding: 10,
  },
  textBold: {fontWeight: 'bold'},
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    textAlign: 'right',
  },
  br: {
    height: 1,
    backgroundColor: Constant.color.lightGray,
    opacity: 0.3,
  },
  label: {
    flex: 1,
    flexDirection: 'row',
    textAlign: 'right',
  },
});
