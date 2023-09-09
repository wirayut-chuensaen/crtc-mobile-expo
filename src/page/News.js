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

import {news} from '../../actions/Service';
import ItemNews from '../item/ItemNews';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class News extends Component {
  state = {
    title: 'ข่าวสาร / กิจกรรม',
    version: 'Chiangrai Teacher Saving Cooperative Ltd.',
    item: [],
    refreshing: false,
  };

  componentDidMount() {
    this.onLoadData();
  }

  componentWillUnmount() {}

  onLoadData() {
    news((res, err) => {
      if (res.data.status == true) {
        this.setState({
          item: res.data.data.news,
        });
      } else {
      }
    });
  }

  _handleRefresh = () => {
    this.setState({
      refreshing: true,
    });
    news((res, err) => {
      if (res.data.status == true) {
        this.setState({
          refreshing: false,
          item: res.data.data.news,
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
      <View style={styles.container}>
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
          <View style={styles.content}>
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
                    this.props.navigation.navigate('NewsDetail', {item})
                  }>
                  <ItemNews {...item} />
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
    paddingLeft: 15,
    paddingRight: 15,
  },

  // gridView:{
  //     backgroundColor:Constant.color.white,
  //     marginTop:15,
  //     borderRadius: 5
  // },

  wapper_content: {
    height: 250,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  Button: {
    marginBottom: 15,
    marginTop: 15,
    backgroundColor: Constant.color.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Constant.color.white,
  },
  position: {
    flex: 1,
    flexDirection: 'column',
    position: 'absolute',
    bottom: 15,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
