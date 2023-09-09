import React, { Component } from 'react';
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
import { cremationType } from '../../actions/Service';
import ItemCremation from '../item/ItemCremation';
import AppButton from '../component/AppButton';
import SizedBox from '../component/SizedBox';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class CreamtionsList extends Component {
  state = {
    title: 'สมาคม',
    item: [],
    refreshing: false,
  };

  componentWillUnmount() { }

  initialData() {
    cremationType((res, done) => {
      if (done && res.data.status === true) {
        console.log("cremationType res : ", res.data)
        this.setState({
          item: res.data.cremation_type,
          refreshing: false,
        });
      } else {
        this.setState({ refreshing: false });
      }
    });
  }

  componentDidMount() {
    this.initialData();
    this._handleRefresh = this._handleRefresh.bind(this);
  }

  _handleRefresh() {
    this.setState({ refreshing: true });
    this.initialData();
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          leftComponent={
            <Icon
              name="chevron-thin-left"
              type="entypo"
              color="#fff"
              iconStyle={{ backgroundColor: Constant.color.violet }}
              onPress={() => this.props.navigation.goBack()}
            />
          }
          centerComponent={{ text: this.state.title, style: { color: '#fff' } }}
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
              <FlatList
                itemDimension={width - 20}
                data={this.state.item}
                style={styles.gridView}
                numColumns={1}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={() => <SizedBox height={10} />}
                ListHeaderComponent={() => <SizedBox height={20} />}
                refreshing={this.state.refreshing}
                onRefresh={this._handleRefresh}
                renderItem={({ item, index }) => (
                  <AppButton text={item.name} onPress={() =>
                    this.props.navigation.navigate('Cremations', { type: item.id })
                  } />
                )}
              />
            </View>
          </LinearGradient>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  gridView: {
    marginHorizontal: 10,
  },
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
