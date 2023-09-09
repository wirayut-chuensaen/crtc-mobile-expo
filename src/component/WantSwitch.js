import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Constant from '../util/Constant';
import SizedBox from './SizedBox';

const WantSwitch = ({value, onChange}) => {
  const on = () => (
    <View style={styles.on}>
      <View style={styles.onInner} />
    </View>
  );

  const off = () => <View style={styles.off} />;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          if (!value) {
            onChange && onChange();
          }
        }}
        style={styles.container}>
        {value ? on() : off()}
        <SizedBox width={10} />
        <Text style={styles.label}>ต้องการ</Text>
      </TouchableOpacity>
      <SizedBox width={40} />
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          if (value) {
            onChange && onChange();
          }
        }}
        style={styles.container}>
        {value ? off() : on()}
        <SizedBox width={10} />
        <Text style={styles.label}>ไม่ต้องการ</Text>
      </TouchableOpacity>
    </View>
  );
};

WantSwitch.defaultProps = {
  value: true,
  onChange: value => {},
};

export default WantSwitch;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  on: {
    width: 15,
    height: 15,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: Constant.color.dark,
    backgroundColor: Constant.color.dark,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  onInner: {
    width: 6,
    height: 6,
    borderRadius: 100,
    backgroundColor: 'white',
  },
  off: {
    width: 15,
    height: 15,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: Constant.color.dark,
  },
  label: {
    fontSize: 14,
    color: Constant.color.dark,
  },
});
