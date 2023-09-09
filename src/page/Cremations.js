import React, { Component, useEffect, useState } from 'react';
import {
  Platform,
  StyleSheet,
  Dimensions,
  Text,
  TextInput,
  View,
  Image,
  FlatList,
  Linking,
  PermissionsAndroid,
  TouchableOpacity,
} from 'react-native';
import { Icon, Header, Button } from 'react-native-elements';
import Constant from '../util/Constant';

import LinearGradient from 'react-native-linear-gradient';
import RowInfo from '../item/RowInfo';
import ItemInfo from '../item/ItemInfo';
import Itemloan from '../item/Itemloan';
import { cremation } from '../../actions/Service';
import ItemCremation from '../item/ItemCremation';
import useNavigator from '../util/useNavigator';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const Cremations = (navigation, Actions, type) => {
  const [title, setTitle] = useState("");
  const [item, setItem] = useState([]);
  const [refreshing, setRefreshing] = useState(false)

  const initialData = () => {
    console.log(type)
    cremation(type, (res, done) => {
      console.log("cremations res : ", res.data)
      if (done && res.data.status === true) {
        this.setState({
          item: res.data.data.cremation,
          refreshing: false,
        });
      } else {
        this.setState({ refreshing: false });
      }
    });
  }

  useEffect(() => {
    initialData();
  }, [])

  const _handleRefresh = () => {
    setRefreshing(true)
    initialData();
  }

  return (
    <View style={styles.container}>
      <Header
        leftComponent={
          <Icon
            name="chevron-thin-left"
            type="entypo"
            color="#fff"
            iconStyle={{ backgroundColor: Constant.color.violet }}
            onPress={navigation.goBack}
          />
        }
        centerComponent={{ text: title, style: { color: '#fff' } }}
        innerContainerStyles={{ backgroundColor: Constant.color.violet }}
        containerStyle={{
          backgroundColor: Constant.color.violet,
          borderBottomColor: Constant.color.violet,
        }}
      />

      <View style={styles.body}>
        <LinearGradient
          locations={[0, 0.4]}
          colors={[Constant.color.violetlight, Constant.color.darkPurple]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.linearGradient}>
          <View style={styles.content}>
            <RowInfo
              keys="ใบเสร็จประจำเดือนของสมาคมฌาปนกิจสงเคราะห์"
              name=""
            />
            <FlatList
              itemDimension={width - 20}
              data={item}
              style={styles.gridView}
              numColumns={1}
              keyExtractor={item => item.id}
              // ItemSeparatorComponent={() => <Divider style={{ marginTop: 5, marginLeft: width * 0.2 + 20 }} parentStyle={{ backgroundColor: globalStyles.BG_COLOR, alignItems: 'baseline' }} />}
              refreshing={refreshing}
              onRefresh={_handleRefresh}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Cremation_Detail', { item, cremention_type_id: type })
                  }>
                  <ItemCremation {...item} />
                </TouchableOpacity>
              )}
            />
          </View>
        </LinearGradient>
      </View>
    </View>
  );

}

export default useNavigator(Cremations);

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 15,
    backgroundColor: Constant.color.white,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Constant.color.gray,
  },

  contents: {
    flexDirection: 'column',
    marginTop: 15,
    backgroundColor: Constant.color.white,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Constant.color.gray,
  },

  body: {
    height: height - 80,
  },

  wapper_content: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  Button: {
    margin: 10,
    marginBottom: 15,
    marginTop: 15,
    backgroundColor: Constant.color.violetlight,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Constant.color.white,
  },
});
