import React, { useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
  Text,
} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Constant from '../util/Constant';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SizedBox from './SizedBox';

const PickerItem = ({ icon, text, onPress, disabled }) => (
  <TouchableOpacity
    style={styles.buttonPicker}
    activeOpacity={0.9}
    onPress={onPress}>
    {icon}
    <Text style={styles.textPicker} bold>
      {text}
    </Text>
  </TouchableOpacity>
);

const getResult = result => {
  if (result.didCancel) {
    return null;
  }

  const asset = result.assets[0];
  const uri = asset.uri;
  const fileName = `${Date.now()}.${uri.split('.').slice(-1)[0]}`;
  return {
    name: fileName,
    type: asset.type,
    uri: Platform.OS === 'android' ? uri : uri.replace('file://', ''),
    fileSize: asset.fileSize,
  };
};

const getImageGallery = () =>
  launchImageLibrary({
    mediaType: 'photo',
    allowsEditing: true,
    quality: 0.7,
    maxWidth: 600,
    maxHeight: 600,
    aspect: [150, 150],
  });

const getImageCamera = () =>
  launchCamera({
    mediaTypes: 'photo',
    allowsEditing: true,
    quality: 0.7,
    maxWidth: 600,
    maxHeight: 600,
    aspect: [150, 150],
    saveToPhotos: true,
  });

const sleep = m => new Promise(r => setTimeout(r, m));

const AppImagePicker = ({ children, onResult, disabled }) => {
  const actionSheetRef = useRef();

  const showModal = () => actionSheetRef.current?.setModalVisible(true);
  const onCancel = () => actionSheetRef.current?.setModalVisible(false);

  const getPermssion = async permission => {
    let status = true;
    if (Platform.OS === 'android') {
      status = await PermissionsAndroid.request(permission);
      return status === PermissionsAndroid.RESULTS.GRANTED;
    }
    return status;
  };

  const onCamera = async () => {
    onCancel();
    await sleep(500);
    try {
      await getPermssion(PermissionsAndroid.PERMISSIONS.CAMERA);
      const result = await getImageCamera();
      console.log(result);
      result && onResult(getResult(result));
    } catch (error) {
      console.log('error', error);
    }
  };
  const onAlbum = async () => {
    onCancel();
    await sleep(500);
    try {
      await getPermssion(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
      const result = await getImageGallery();
      console.log('result', result);
      result && onResult(getResult(result));
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <>
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={0.9}
        onPress={showModal}>
        {children}
        <ActionSheet ref={actionSheetRef} bounceOnOpen={true}>
          <View style={styles.container}>
            <PickerItem
              icon={<MaterialCommunityIcons name="camera" size={24} />}
              text="ถ่ายรูป"
              onPress={onCamera}
            />
            <PickerItem
              icon={<MaterialCommunityIcons name="image" size={24} />}
              text="เลือกรูปภาพจากเครื่อง"
              onPress={onAlbum}
            />
            <View style={styles.line} />
            <TouchableOpacity
              style={styles.cancelContainer}
              activeOpacity={0.9}
              onPress={onCancel}>
              <Text style={styles.cancelText}>ยกเลิก</Text>
            </TouchableOpacity>
            <SizedBox height={20} />
          </View>
        </ActionSheet>
      </TouchableOpacity>
    </>
  );
};

AppImagePicker.defaultProps = {
  onResult: () => { },
  disabled: false,
};

export default AppImagePicker;

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
    color: Constant.color.black,
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
  cancelText: { color: Constant.color.black, fontSize: 20 },
});
