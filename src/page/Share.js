import React, {Component} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Icon, Header} from 'react-native-elements';
import Constant from '../util/Constant';

import LinearGradient from 'react-native-linear-gradient';
import RowInfo from '../item/RowInfo';
import {stock} from '../../actions/Service';
import ItemStock from '../item/ItemStock';
import showError from '../util/showError';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class App extends Component {
  state = {
    title: 'ข้อมูลหุ้น',
    refreshing: false,
    item: [],
    stock: {},
  };

  componentWillUnmount() {}

  initialData() {
    stock((res, done) => {
      console.log({stock: res.data});
      if (done && res.data.status) {
        this.setState({
          stock: res.data.data.stock,
          item: res.data.data.stock_list,
          refreshing: false,
        });
      } else {
        this.setState({refreshing: false});
        showError(res.data.message);
      }
    });
  }

  componentDidMount() {
    this.initialData();
    this._handleRefresh = this._handleRefresh.bind(this);
  }

  _handleRefresh() {
    this.setState({refreshing: true});
    this.initialData();
  }

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
            <RowInfo keys="ทะเบียนและการเดินบัญชีหุ้น" name="" />
            <RowInfo keys="ทุนเรือนหุ้น : " name={this.state.stock.BALANCE} />
            <RowInfo keys="ส่งหักรายเดือน : " name={this.state.stock.PAYMENT} />
            <RowInfo keys="จำนวนงวด : " name={this.state.stock.INSTALMENT} />

            <View style={styles.wapperCenter}>
              {/*<Button title='แก้ไขส่งหักรายเดือน'*/}
              {/*        buttonStyle={styles.Button}*/}
              {/*        onPress={() => this.onHandleEdit()}/>*/}
            </View>
          </View>
          <View style={styles.content}>
            <RowInfo keys="รายการ" name="" br={false} />
            <FlatList
              itemDimension={width - 20}
              data={this.state.item}
              style={styles.gridView}
              numColumns={1}
              keyExtractor={item => item.id}
              // ItemSeparatorComponent={() => <Divider style={{ marginTop: 5, marginLeft: width * 0.2 + 20 }} parentStyle={{ backgroundColor: globalStyles.BG_COLOR, alignItems: 'baseline' }} />}
              refreshing={this.state.refreshing}
              onRefresh={this._handleRefresh}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() => {
                    const currency = Number(
                      this.state.stock.PAYMENT.replace(/[^0-9.-]+/g, ''),
                    );

                    this.props.navigation.navigate('Stock_Detail', {
                      item,
                      currency,
                    });
                  }}>
                  <ItemStock {...item} />
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
