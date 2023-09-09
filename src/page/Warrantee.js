import React, {Component} from 'react';
import {StyleSheet, Dimensions, Text, View} from 'react-native';
import {Icon, Header} from 'react-native-elements';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import Constant from '../util/Constant';

import LinearGradient from 'react-native-linear-gradient';
import SubList from '../detail/SubList';
import SubListWho from '../detail/SubListWho';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class Warrantee extends Component {
  state = {
    title: 'การค้ำประกัน',
    index: 0,
    routes: [
      {key: 'first', title: 'ใครค้ำประกันให้เรา'},
      {key: 'second', title: 'เราค้ำประกันให้ใครบ้าง'},
    ],
  };

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <View style={styles.wapper_content}>
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
            <TabView
              onIndexChange={(index) => this.setState({index})}
              navigationState={this.state}
              renderScene={SceneMap({
                first: () => <SubList navigation={this.props.navigation} />,
                second: () => <SubListWho navigation={this.props.navigation} />,
              })}
              renderTabBar={(props) => (
                <TabBar
                  {...props}
                  indicatorStyle={{
                    backgroundColor: Constant.color.violetlight,
                    height: '100%',
                  }}
                  style={{backgroundColor: Constant.color.cream}}
                  renderIcon={this.renderIcon}
                  renderLabel={({route, focused, color}) => (
                    <Text numberOfLines={1} style={{color, margin: 8}}>
                      {route.title}
                    </Text>
                  )}
                />
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
    padding: 10,
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
