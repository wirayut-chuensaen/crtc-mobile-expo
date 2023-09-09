import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  FlatList,
  Text,
} from 'react-native';
import Constant from '../util/Constant';
import PropTypes from 'prop-types';

const AppListPicker = ({children, onSelect, data, showOnKey, title}) => {
  const [visible, setVisible] = useState(false);

  const show = () => setVisible(true);
  const dismiss = () => setVisible(false);

  const onPressItem = selectedData => {
    onSelect(selectedData);
    dismiss();
  };

  const _renderItem = ({item, index}) => (
    <TouchableOpacity
      key={`picker_${index}`}
      testID={`${showOnKey}_${index}`}
      activeOpacity={0.9}
      style={styles.pickerItem}
      onPress={() => onPressItem({item, index})}>
      <Text style={styles.item}>{item[showOnKey]}</Text>
    </TouchableOpacity>
  );

  return (
    <TouchableOpacity
      testID="picker"
      disabled={data.length === 0}
      activeOpacity={0.9}
      onPress={show}>
      {children}

      <Modal
        hardwareAccelerated={true}
        renderToHardwareTextureAndroid={true}
        transparent={true}
        presentationStyle="overFullScreen"
        onRequestClose={dismiss}
        animationType="fade"
        visible={visible}>
        <TouchableWithoutFeedback testID="dismissPicker" onPress={dismiss}>
          <View style={styles.container}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.innerContainer}>
                {title && (
                  <Text style={styles.title} bold>
                    {title}
                  </Text>
                )}
                <FlatList
                  data={data}
                  keyExtractor={(item, index) => `picker_${index}`}
                  renderItem={_renderItem}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </TouchableOpacity>
  );
};

AppListPicker.defaultProps = {
  onSelect: () => {},
  data: [],
  showOnKey: 'name',
  title: '',
};

AppListPicker.propTypes = {
  showOnKey: PropTypes.string.isRequired,
  children: PropTypes.elementType.isRequired,
}

export default AppListPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  innerContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 5,
    marginHorizontal: 20,
    maxHeight: 500,
  },
  title: {color: Constant.color.dark, fontSize: 18, marginBottom: 20},
  item: {color: Constant.color.dark, fontSize: 16},
  pickerItem: {paddingVertical: 10},
});
