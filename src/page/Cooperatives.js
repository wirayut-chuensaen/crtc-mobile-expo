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
import {netbill} from '../../actions/Service';
import ItemCooperative from '../item/ItemCooperative';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class Cooperatives extends Component {
  state = {
    title: 'ใบเสร็จ (สหกรณ์ฯ)',
    item: [],
    refreshing: false,
  };

  componentWillUnmount() {}

  initialData() {
    netbill((res, done) => {
      if (done && res.data.status === true) {
        this.setState({
          item: res.data.data.netBill,
          refreshing: false,
        });
      } else {
        this.setState({refreshing: false});
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
        />

        <View style={styles.body}>
          <View style={styles.content}>
            <RowInfo keys="ใบเสร็จประจำเดือนของสหกรณ์ฯ" name="" />
            <FlatList
              itemDimension={width - 20}
              data={this.state.item}
              style={styles.gridView}
              numColumns={1}
              keyExtractor={(item) => item.id}
              // ItemSeparatorComponent={() => <Divider style={{ marginTop: 5, marginLeft: width * 0.2 + 20 }} parentStyle={{ backgroundColor: globalStyles.BG_COLOR, alignItems: 'baseline' }} />}
              refreshing={this.state.refreshing}
              onRefresh={this._handleRefresh}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('Cooperative_Detail', {
                      item,
                    })
                  }>
                  <ItemCooperative {...item} />
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
    paddingTop: 15,
    backgroundColor: Constant.color.white,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Constant.color.gray,
  },

  contents: {
    flexDirection: 'column',
    paddingTop: 15,
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
