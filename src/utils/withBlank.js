/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import {View} from 'react-native';

const withBlank = (list = [], numberOfGrid = 4, blankView = <View />) => {
  let mod = list.length % numberOfGrid;
  let newList = [...list];
  if (mod > 0) {
    for (let i = 0; i < numberOfGrid - mod; i++) {
      newList.push(blankView);
    }
  }

  return newList;
};

export default withBlank;
