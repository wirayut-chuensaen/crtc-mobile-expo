import React, {Component} from 'react';
import {StyleSheet, Dimensions, View, FlatList} from 'react-native';
import {Icon, Header} from 'react-native-elements';
import Constant from '../util/Constant';

import ItemControll from '../item/ItemControll';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class Notifications extends Component {
  state = {
    title: 'การแจ้งเตือน',
    item: [{name: 'เปิดการแจ้งเตือน', status: false}],
    refreshing: false,
  };

  componentDidMount() {}

  componentWillUnmount() {}

  _handleRefresh = () => {};

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
          <FlatList
            itemDimension={width - 20}
            data={this.state.item}
            style={styles.gridView}
            numColumns={1}
            keyExtractor={(item) => item.id}
            // ItemSeparatorComponent={() => <Divider style={{ marginTop: 5, marginLeft: width * 0.2 + 20 }} parentStyle={{ backgroundColor: globalStyles.BG_COLOR, alignItems: 'baseline' }} />}
            renderItem={({item, index}) => (
              // <TouchableOpacity onPress={() =>  this.props.navigation.navigate('',{item})}>
              <ItemControll {...item} />
              // </TouchableOpacity>
            )}
          />
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
    height: height - 85,
    backgroundColor: Constant.color.white,
  },
  gridView: {
    marginTop: 15,
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
