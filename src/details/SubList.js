import React, {Component} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Constant from '../util/Constant';
import ItemWarrantee from '../items/ItemWarrantee';

import {warranteeMe} from '../../actions/Service';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class SubList extends Component {
  state = {
    title: 'ติดต่อเรา',
    item: [],
    refreshing: false,
  };

  componentDidMount() {
    this.onLoadData();
  }

  componentWillUnmount() {}

  onLoadData() {
    warranteeMe((res, err) => {
      if (res.data.status == true) {
        this.setState({
          item: res.data.data.guarantee_me,
        });
      } else {
      }
    });
  }

  _handleRefresh = () => {
    this.setState({
      refreshing: true,
    });
    warranteeMe((res, err) => {
      if (res.data.status == true) {
        this.setState({
          item: res.data.data.guarantee_me,
          refreshing: false,
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
        <FlatList
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
                this.props.navigation.navigate('WarranteeMe_Detail', {item})
              }>
              <ItemWarrantee {...item} />
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
    marginTop: 10,
    flexDirection: 'column',
    backgroundColor: Constant.color.white,
    borderRadius: 5,
  },
});
