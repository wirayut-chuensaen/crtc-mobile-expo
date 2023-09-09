import React, {Component} from 'react';
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {Icon, Header} from 'react-native-elements';
import Constant from '../util/Constant';

import {contact} from '../../actions/Service';
import RowInfo_More from '../item/RowInfo_More';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class PrivacyPolicy extends Component {
  state = {
    title: 'ติดต่อเรา',
    address: '',
    phone_number: '',
    line_id: '',
    line_url: '',
    facebook_url: '',
  };

  componentDidMount() {
    contact((res, err) => {
      if (res.data.status == true) {
        this.setState({
          address: res.data.data.contacts_us.address,
          phone_number: res.data.data.contacts_us.phone_number,
          line_id: res.data.data.contacts_us.line_id,
          line_url: res.data.data.contacts_us.line_url,
          facebook_url: res.data.data.contacts_us.facebook_url,
        });
      } else {
      }
    });
  }

  componentWillUnmount() {}

  onHandleMenu = (item) => {};

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
          {/*<LinearGradient  locations={[0,0.4]} colors={[ Constant.color.white,Constant.color.skyle]} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={styles.linearGradient}>*/}
          <View style={styles.content}>
            <RowInfo_More keys="ที่ตั้งสำนักงาน" name="" />
            <Text style={{paddingLeft: 20, paddingRight: 20}}>
              {this.state.address}
            </Text>

            <RowInfo_More keys="ติดต่อเรา" name="" />
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1, flexDirection: 'row', padding: 10}}>
                <TouchableOpacity
                  style={styles.ButtonF}
                  onPress={() => {
                    Linking.openURL('tel:' + this.state.phone_number);
                  }}>
                  <Icon
                    name="phone-portrait-outline"
                    type="ionicon"
                    color={Constant.color.darkOrange}
                  />
                </TouchableOpacity>
              </View>
              <View style={{flex: 1, flexDirection: 'row', padding: 10}}>
                <TouchableOpacity
                  style={styles.ButtonF}
                  onPress={() => {
                    Linking.openURL(this.state.line_id);
                  }}>
                  <Icon
                    name="line"
                    type="fontisto"
                    color={Constant.color.green}
                  />
                </TouchableOpacity>
              </View>
              <View style={{flex: 1, flexDirection: 'row', padding: 10}}>
                <TouchableOpacity
                  style={styles.ButtonF}
                  onPress={() => {
                    Linking.openURL(this.state.facebook_url);
                  }}>
                  <Icon
                    name="sc-facebook"
                    type="evilicon"
                    color={Constant.color.darkBlue}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/*</LinearGradient>*/}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Constant.color.white,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Constant.color.gray,
  },

  body: {
    height: height - 85,
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
  wapperCenter: {
    alignItems: 'center',
  },
  ButtonF: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: Constant.color.white,
    borderWidth: 1,
    borderColor: Constant.color.gray,
  },
});
