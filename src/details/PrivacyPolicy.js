import React, {Component} from 'react';
import {StyleSheet, Dimensions, Text, View, ScrollView} from 'react-native';
import {Icon, Header} from 'react-native-elements';
import Constant from '../util/Constant';

import {privacyPolicy} from '../../actions/Service';
import RowInfo_More from '../item/RowInfo_More';
import showError from '../util/showError';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class PrivacyPolicy extends Component {
  state = {
    title: 'นโยบายความเป็นส่วนตัว',
    info: '',
  };

  componentDidMount() {
    privacyPolicy((res, done) => {
      if (done && res.data.status) {
        this.setState({
          info: res.data.data.privacy_policy,
        });
      } else {
        showError(res.data.message);
      }
    });
  }

  componentWillUnmount() {}

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

        <ScrollView style={styles.body}>
          <View>
            <RowInfo_More keys="นโยบายความเป็นส่วนตัว" name="" />
            <Text style={{paddingLeft: 20, paddingRight: 20}}>
              {this.state.info}
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: Constant.color.white,
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
    marginTop: 20,
    margin: 10,
    backgroundColor: Constant.color.violetlight,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Constant.color.gray,
  },
});
