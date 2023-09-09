import React from 'react';
import {StyleSheet, TouchableOpacity, Platform} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import Constant from '../util/Constant';

const getFileResult = result => {
  const uri = result.fileCopyUri;
  const fileName = `${Date.now()}.${uri.split('.').slice(-1)[0]}`;
  return {
    name: fileName,
    type: result.type,
    uri: Platform.OS === 'android' ? uri : uri.replace('file://', ''),
    fileSize: result.size,
  };
};

const AppPdfPicker = ({children, onResult, disabled}) => {
  const onStorage = async () => {
    try {
      const pickerResult = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        transitionStyle: 'crossDissolve',
        mode: 'open',
        type: [DocumentPicker.types.pdf],
        copyTo: 'cachesDirectory',
      });
      onResult(getFileResult(pickerResult));
    } catch (e) {
      console.log('error', e);
    }
  };

  return (
    <>
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={0.9}
        onPress={onStorage}>
        {children}
      </TouchableOpacity>
    </>
  );
};

AppPdfPicker.defaultProps = {
  onResult: () => {},
  disabled: false,
};

export default AppPdfPicker;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 50,
    paddingTop: 30,
  },
  buttonPicker: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
  },
  iconPicker: {
    width: 21,
    height: 21,
    tintColor: Constant.color.gray,
  },
  textPicker: {
    marginLeft: 15,
    fontSize: 18,
    color: Constant.color.gray,
  },
  line: {
    backgroundColor: Constant.color.lightGray,
    marginVertical: 15,
    height: 1,
  },
  cancelContainer: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelText: {color: Constant.color.gray, fontSize: 20},
});
