import React, {Component} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Constant from '../util/Constant';

import {warranteeWho} from '../../actions/Service';
import ItemWarranteeWho from '../item/ItemWarranteeWho';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class SubListWho extends Component {
  state = {
    title: 'ติดต่อเรา',
    item: [],
    refreshing: false,
  };

  componentWillUnmount() {}

  initialData() {
    warranteeWho((res, done) => {
      if (done && res.data.status == true) {
        this.setState({
          item: res.data.data.guarantee_who,
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
                this.props.navigation.navigate('WarranteeWho_Detail', {item})
              }>
              <ItemWarranteeWho {...item} />
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
