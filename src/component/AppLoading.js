import { StyleSheet, ActivityIndicator, View } from 'react-native';
import React from 'react';
import Constant from "../utils/Constant"

const ButtonPicker = ({ }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color={Constant.color.black} />
    </View>
  );
};
export default ButtonPicker;

const styles = StyleSheet.create({
  container: {
    zIndex: 9999999,
    backgroundColor: 'rgba(255,255,255,0.3)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
