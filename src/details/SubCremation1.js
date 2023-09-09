import React, {Component} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Constant from '../util/Constant';

import RowInfo from '../item/RowInfo';
import {cremationDeduct} from '../../actions/Service';
import ItemCremation from '../item/ItemCremation';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class SubCremation1 extends Component {
  state = {
    title: 'ใบเสร็จ (สมาคมฯ)',
    item: [],
    refreshing: false,
  };

  componentDidMount() {
    this.onLoadData();
  }

  componentWillUnmount() {}

  onLoadData() {
    cremationDeduct(this.props.type, (res, err) => {
      if (res.data.status == true) {
        this.setState({
          title: res.data.cremation_title,
          item: res.data.data.cremation,
        });
      } else {
      }
    });
  }

  _handleRefresh = () => {
    this.setState({
      refreshing: true,
    });
    cremationDeduct((res, err) => {
      if (res.data.status == true) {
        this.setState({
          refreshing: false,
          item: res.data.data.redemptions,
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
      <View style={styles.content}>
        <RowInfo keys="ใบเสร็จประจำเดือนของสมาคมฌาปนกิจสงเคราะห์" name="" />
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
                this.props.navigation.navigate('Cremation_Detail', {item, type: "deduct", cremention_type_id: this.props.type,})
              }>
              <ItemCremation {...item} />
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

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
