import React, {Component} from 'react';
import {
  StyleSheet,
  Dimensions,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Icon, Header, Button} from 'react-native-elements';
import Constant from '../util/Constant';

import Dialog from 'react-native-dialog';

const Height = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

import {changePassword} from '../../actions/Service';
import LinearGradient from 'react-native-linear-gradient';

export default class ChangePassword extends Component {
  state = {
    select: true,
    spinner: false,
    fcmToken: '',
    title: 'เปลี่ยนรหัสผ่าน CRTC',
    dialog: {
      title: '',
      message: '',
      status: false,
    },
    userInfo: {},

    visibleOldPassword: false,
    visibleNewPassword: false,
    visibleConfirmPassword: false,
  };

  componentDidMount() {}

  UNSAFE_componentWillMount() {}

  handleCancel = () => {
    this.setState({
      dialog: {
        status: false,
      },
    });
  };

  pressLogin = () => {
    var body = {};
    body.old_password = this.state.old_password;
    body.password = this.state.password;
    body.password_confirmation = this.state.password_confirmation;

    changePassword(body, (res, done) => {
      try {
        this.setState({
          dialog: {
            title: null,
            message: res.data.message,
            status: true,
          },
          spinner: false,
        });
      } catch (e) {
        this.setState({
          dialog: {
            title: null,
            message: res.response.data.message,
            status: true,
          },
          spinner: false,
        });
      }
    });
  };

  toggleVisible(key) {
    return () => {
      if (key === 'old_password') {
        this.setState({visibleOldPassword: !this.state.visibleOldPassword});
      }
      if (key === 'new_password') {
        this.setState({visibleNewPassword: !this.state.visibleNewPassword});
      }
      if (key === 'confirm_password') {
        this.setState({
          visibleConfirmPassword: !this.state.visibleConfirmPassword,
        });
      }
    };
  }

  render() {
    const isLogin = this.state.userInfo.name;
    const buttonText = isLogin ? 'Logout With Facebook' : 'Login From Facebook';
    const onPressButton = isLogin
      ? this.logoutWithFacebook
      : this.loginWithFacebook;
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

        <LinearGradient
          locations={[0, 0.4]}
          colors={[Constant.color.violetlight, Constant.color.darkPurple]}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={styles.linearGradient}>
          <Dialog.Container visible={this.state.dialog.status}>
            {/*<Dialog.Title>{this.state.dialog.title}</Dialog.Title>*/}
            <Dialog.Description>{this.state.dialog.message}</Dialog.Description>
            <Dialog.Button label="OK" onPress={this.handleCancel} />
          </Dialog.Container>

          <View style={styles.wapperCenter}>
            <Image
              source={require('../../assest/logo.png')}
              resizeMode="contain"
              style={{height: 200, marginBottom: 20}}
            />
            {/*<Text style={styles.textSubtitlr}>Please use the login information{'\n'}provided by Hexa Ceram</Text>*/}
            {/*<Text style={styles.textSubtitlr}>{this.state.fcmToken}</Text>*/}
          </View>

          <View style={styles.SectionStyle}>
            <Icon name="lock" color={Constant.color.white} />
            <TextInput
              secureTextEntry={!this.state.visibleOldPassword}
              style={styles.Input}
              placeholder="รหัสผ่านเก่า"
              underlineColorAndroid="transparent"
              onChangeText={(old_password) => this.setState({old_password})}
            />
            <TouchableOpacity onPress={this.toggleVisible('old_password')}>
              <Icon
                type="material-community"
                name={this.state.visibleOldPassword ? 'eye-off' : 'eye'}
                color={Constant.color.white}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.SectionStyle}>
            <Icon name="lock" color={Constant.color.white} />
            <TextInput
              secureTextEntry={!this.state.visibleNewPassword}
              style={styles.Input}
              placeholder="รหัสผ่านใหม่"
              underlineColorAndroid="transparent"
              onChangeText={(password) => this.setState({password})}
            />
            <TouchableOpacity onPress={this.toggleVisible('new_password')}>
              <Icon
                type="material-community"
                name={this.state.visibleOldPassword ? 'eye-off' : 'eye'}
                color={Constant.color.white}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.SectionStyle}>
            <Icon name="lock" color={Constant.color.white} />
            <TextInput
              secureTextEntry={!this.state.visibleConfirmPassword}
              style={styles.Input}
              placeholder="รหัสผ่านใหม่ ยืนยัน"
              underlineColorAndroid="transparent"
              onChangeText={(password_confirmation) =>
                this.setState({password_confirmation})
              }
            />
            <TouchableOpacity onPress={this.toggleVisible('confirm_password')}>
              <Icon
                type="material-community"
                name={this.state.visibleConfirmPassword ? 'eye-off' : 'eye'}
                color={Constant.color.white}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.wapperCenter}>
            <Button
              title="ยืนยันเปลี่ยนรหัสผ่าน"
              titleStyle={styles.texts}
              buttonStyle={styles.Button}
              onPress={() => this.pressLogin()}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            {/*<Text style={styles.requestAccount} onPress={()=>{this.props.navigation.navigate('RequestLogin')}}>Account? Request Login</Text>*/}
            {/*<Text style={styles.forgotPassword} >ลืมรหัสผ่าน?</Text>*/}
          </View>

          <Text style={styles.footer}>
            กรุณายืนยันการเปลี่ยนรหัสผ่าน {'\n'}
            โดยระบุรหัสผ่านใหม่และรหัสผ่านของระบบ E-coop
          </Text>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    height: 0,
    // backgroundColor:Constant.statusbar.uploadBackgroundColor,
  },
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },

  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: Constant.color.green,
  },
  wapperCenter: {
    alignItems: 'center',
  },
  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
  },

  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: Constant.color.white,
    height: 40,
    // borderRadius: 5 ,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
  },

  Input: {
    paddingLeft: 10,
    flex: 1,
    color: Constant.color.white,
  },

  requestAccount: {
    flex: 1,
    flexDirection: 'column',
    textAlign: 'left',
    color: Constant.color.gray,
    margin: 10,
  },

  forgotPassword: {
    flex: 1,
    flexDirection: 'column',
    textAlign: 'right',
    color: Constant.color.gray,
    margin: 10,
  },

  footer: {
    textAlign: 'center',
    color: Constant.color.dark,
    margin: 10,
  },
  Register: {
    alignItems: 'center',
    color: Constant.color.gray,
    marginBottom: 10,
    borderBottomWidth: 1,
  },

  Button: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: deviceWidth - 50,
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 5,
    height: 40,
    backgroundColor: Constant.color.blueDark,
    // color:Constant.color.white
  },
  textSubtitlr: {
    textAlign: 'center',
  },
  ButtonF: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: deviceWidth - 55,
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    borderRadius: 4,
    height: 40,
    backgroundColor: Constant.color.darkBlue,
  },
  SectionStyleF: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: Constant.color.white,
  },
  ButtonG: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: deviceWidth - 50,
    alignItems: 'center',
    height: 48,
    marginBottom: 10,
    // color:Constant.color.white
  },
});
