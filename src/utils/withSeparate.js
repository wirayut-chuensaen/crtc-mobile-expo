/* eslint-disable react/react-in-jsx-scope */
import {View} from 'react-native';

const withSeparate = (list = [], separate = <View />) => {
  if (list.length < 2) {
    return list;
  }
  const listIndex = Array.from(Array(list.length).keys());
  return listIndex
    .join('|||---|||')
    .split('|||')
    .map(i => {
      if (i === '---') {
        return separate;
      }

      return list[Number(i)];
    });
};

export default withSeparate;
