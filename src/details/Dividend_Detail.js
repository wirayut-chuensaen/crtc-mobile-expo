import React, {Component} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Image,
  Linking,
  ScrollView,
} from 'react-native';
import {Icon, Header, Button} from 'react-native-elements';
import Constant from '../util/Constant';
import {Dialog} from 'react-native-simple-dialogs';

import LinearGradient from 'react-native-linear-gradient';
import RowInfo from '../item/RowInfo';
import {dividend_Detail} from '../../actions/Service';
import RowInfos from '../item/RowInfos';
import SizedBox from '../component/SizedBox';
import AppButton from '../component/AppButton';
import showError from '../util/showError';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class Dividend_Detail extends Component {
  state = {
    dialogVisible: false,
    screenHeight: height,
    title: 'เงินปันผล-เฉลี่ยคืน',
    info: {},
    item: {},
    obj1: {},
    obj2: {},
    obj3: {},
    web1: '',
    web2: '',
  };

  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({screenHeight: contentHeight});
  };
  componentDidMount() {
    var id = this.props.route.params.item.AACYEAR;

    dividend_Detail(id, (res, done) => {
      console.log(res.data);
      if (done && res.data.status) {
        this.setState({
          info: res.data.data.dividend_detail,
          item: res.data.data.dividend[0],
          obj1: res.data.data.dividend_detail.detail[0],
          obj2: res.data.data.dividend_detail.detail[1],
          obj3: res.data.data.dividend_detail.detail[2],
          web1: res.data.data.URL_receipt,
          web2: res.data.data.URL_calculate,
        });
      } else {
        showError(res.data.message);
      }
    });
  }

  componentWillUnmount() {}

  onHandleMenu = item => {};

  onOpenUrl = () => {
    console.log(this.state.item);
    try {
      Linking.openURL(this.state.obj1.image).catch(err =>
        alert('link : ' + this.state.item[0].image),
      );
    } catch (e) {}
    if (this.state.item.length > 0) {
      Linking.openURL(this.state.item[0].image).catch(err =>
        alert('link : ' + this.state.item[0].image),
      );
    }
  };

  handleClick = url => {
    Linking.openURL(encodeURI(url));
  };
  onLoadList = obj => {
    try {
      var view = [];
      for (var i = 0; i < obj.length; i++) {
        view.push(<RowInfos obj={obj[i]} />);
      }
      return view;
    } catch (e) {}
  };

  render() {
    const scrollEnabled = this.state.screenHeight > height;
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
          rightComponent={
            <Icon
              name="infocirlceo"
              type="antdesign"
              color="#fff"
              iconStyle={{backgroundColor: Constant.color.violet}}
              onPress={() => this.onOpenUrl()}
            />
          }
        />

        <View style={styles.body}>
          <LinearGradient
            locations={[0, 0.4]}
            colors={[Constant.color.violetlight, Constant.color.darkPurple]}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            style={styles.linearGradient}>
            <ScrollView
              style={{flex: 1}}
              contentContainerStyle={styles.scrollview}
              scrollEnabled={scrollEnabled}
              onContentSizeChange={this.onContentSizeChange}>
              <View style={styles.contents}>
                <RowInfo keys="รายละเอียด" name="" />
                <RowInfo keys="ประจำปี : " name={this.state.item.AACYEAR} />
                <RowInfo keys="วันที่จ่าย : " name={this.state.item.P_DATE} />
                <RowInfo keys="ปันผล(%) : " name={this.state.item.DDVRATE} />
                <RowInfo
                  keys="เฉลี่ยคืน(%) : "
                  name={this.state.item.IRFRATE}
                />
                <RowInfo
                  keys="จำนวนคืน : "
                  name={this.state.item.total_PUNPON_INTREFUND}
                />
              </View>

              <View>
                <View style={styles.content}>
                  <RowInfo keys="รายการ" name="" />
                  <RowInfo keys="เงินปันผล : " name={this.state.info.PUNPON} />
                  <RowInfo
                    keys="เงินเฉลี่ยคืน : "
                    name={this.state.info.INTREFUND}
                  />

                  {this.onLoadList(this.state.info.dividend_detail)}
                  {/*<RowInfos keys="หัก สอค: " name={this.state.info.ADDAMT} />*/}
                  <RowInfo
                    keys="รวมเป็น : "
                    name={this.state.info.total_PUNPON_INTREFUND}
                  />
                  <RowInfo
                    keys="รวมยอดหัก : "
                    name={this.state.info.ISUPREMIUM}
                  />
                  <RowInfo
                    keys={
                      'คงเหลือ เข้าบัญชี ' + this.state.info.bank_name + ' : '
                    }
                    name={this.state.info.OTHEXP}
                    color={Constant.color.violet}
                  />
                  <SizedBox height={10} />
                  <AppButton
                    text="ใบเสร็จรายการหัก"
                    style={styles.margin}
                    onPress={() => this.handleClick(this.state.web1)}
                  />
                  <SizedBox height={5} />
                  <AppButton
                    text="วิธีคิดคำนวนผลและเฉลี่ยคืน"
                    style={styles.margin}
                    onPress={() => this.handleClick(this.state.web2)}
                  />
                  <SizedBox height={10} />
                  <AppButton
                    text="เปลี่ยนแปลงเลขบัญชีรับปันผล"
                    style={styles.margin}
                    onPress={() =>
                      this.props.navigation.navigate('FormChangeDividend')
                    }
                  />
                  <SizedBox height={30} />
                </View>
              </View>
            </ScrollView>
          </LinearGradient>
        </View>
        <Dialog
          visible={this.state.dialogVisible}
          animationType="fade"
          dialogStyle={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Constant.color.transparent,
          }}
          contentStyle={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Constant.color.transparent,
          }}
          onTouchOutside={() => this.setState({dialogVisible: false})}>
          <View>
            <Image
              source={{
                uri: 'https://dev.crtc-service.com/images/code-dvd-all.jpg',
              }}
              style={{
                width: width - 90,
                height: (width - 90) / 1.5,
                // backgroundColor: "black",
                // marginTop: 10,
                resizeMode: 'contain',
              }}
            />
          </View>
        </Dialog>
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
    marginBottom: 15,
    backgroundColor: Constant.color.white,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Constant.color.gray,
  },
  margin: {
    marginLeft: 10,
    marginRight: 10,
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
    flex: 1,
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
