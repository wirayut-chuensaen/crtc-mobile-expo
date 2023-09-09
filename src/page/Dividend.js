import React, {Component} from 'react';
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Icon, Header} from 'react-native-elements';
import Constant from '../util/Constant';

import LinearGradient from 'react-native-linear-gradient';
import RowInfo from '../item/RowInfo';
import {dividend} from '../../actions/Service';
import ItemDividend from '../item/ItemDividend';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class Dividend extends Component {
  state = {
    title: 'เงินปันผล-เฉลี่ยคืน',
    refreshing: false,
    text: '',
    item: [],
  };

  componentDidMount() {
    this.onLoadData();
  }

  componentWillUnmount() {}

  onLoadData() {
    dividend((res, err) => {
      if (res.data.status == true) {
        this.setState({
          text: res.data.data.text,
          item: res.data.data.dividend,
        });
      } else {
      }
    });
  }

  _handleRefresh = () => {
    this.setState({
      refreshing: true,
    });
    dividend((res, err) => {
      if (res.data.status == true) {
        this.setState({
          refreshing: false,
          text: res.data.data.text,
          item: res.data.data.dividend,
        });
      } else {
        this.setState({
          refreshing: false,
        });
      }
    });
  };

  render() {
    return (
      <View style={styles.body}>
        <Header
          leftComponent={
            <Icon
              name="chevron-thin-left"
              type="entypo"
              color="#fff"
              iconStyle={{backgroundColor: Constant.color.violet}}
              onPress={() => this.props.navigation.goBack()}
            />
          }
          
          centerComponent={{text: this.state.title, style: {color: '#fff'}}}
          innerContainerStyles={{backgroundColor: Constant.color.violet}}
          containerStyle={{
            backgroundColor: Constant.color.violet,
            borderBottomColor: Constant.color.violet,
          }}
          // rightComponent={<Icon name='person' color='#fff' iconStyle={{backgroundColor:Constant.color.violet}}  />}
        />

        <View style={styles.body}>
          <View style={styles.contents}>
            <RowInfo keys="ข้อมูลการรับเงินปันผล-เฉลี่ยคืน" name="" />

            <View style={{padding: 10, paddingLeft: 20, paddingRight: 20}}>
              <Text>{this.state.text}</Text>
            </View>
          </View>
          <View style={styles.content}>
            <RowInfo keys="รายการ" name="" br={false} />
            <FlatList
              itemDimension={width - 20}
              data={this.state.item}
              style={styles.gridView}
              numColumns={1}
              keyExtractor={(item, index) => `${item.id}_${index}`}
              // ItemSeparatorComponent={() => <Divider style={{ marginTop: 5, marginLeft: width * 0.2 + 20 }} parentStyle={{ backgroundColor: globalStyles.BG_COLOR, alignItems: 'baseline' }} />}
              refreshing={this.state.refreshing}
              onRefresh={this._handleRefresh}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('Dividend_Detail', {item})
                  }>
                  <ItemDividend {...item} />
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 15,
    borderRadius: 5,
  },

  contents: {
    flexDirection: 'column',
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: Constant.color.white,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Constant.color.gray,
  },

  body: {
    flex: 1,
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
