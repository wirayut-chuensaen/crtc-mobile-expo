import React, {Component} from 'react';
import {StyleSheet, Dimensions, View, Linking} from 'react-native';
import {Icon, Header} from 'react-native-elements';
import Constant from '../util/Constant';

import {WebView} from 'react-native-webview';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class NewsDetail extends Component {
  state = {
    dialogVisible: false,
    screenHeight: height,
    title: 'ข่าวสาร / กิจกรรม',
    web: '',
  };

  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({screenHeight: contentHeight});
  };
  componentDidMount() {
    var id = this.props.route.params.item;
    this.setState({
      web: id.content_url,
    });
  }

  componentWillUnmount() {}

  onHandleMenu = (item) => {};

  handleClick = (url) => {
    Linking.openURL(encodeURI(url));
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
          // rightComponent={<Icon name='infocirlceo' type='antdesign' color='#fff' iconStyle={{backgroundColor:Constant.color.violet}} onPress={() => this.setState({dialogVisible:true})} />}
        />

        <View style={styles.body}>
          <WebView source={{uri: this.state.web}} incognito={true} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollview: {
    flexGrow: 1,
    paddingLeft: 15,
    paddingRight: 15,
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
    paddingBottom: 15,
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
  },

  Button: {
    margin: 10,
    marginBottom: 0,
    backgroundColor: Constant.color.violetlight,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Constant.color.gray,
  },
});
