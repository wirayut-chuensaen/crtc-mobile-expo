import React, { Component } from 'react';
import { StyleSheet, Dimensions, View, Linking } from 'react-native';
import { Icon, Header, Button } from 'react-native-elements';
import Constant from '../util/Constant';

import LinearGradient from 'react-native-linear-gradient';
import RowInfo from '../item/RowInfo';
import { cremation_Detail, cremationDeductDetail } from '../../actions/Service';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class Cremation_Detail extends Component {
  state = {
    title: 'ใบเสร็จ (สมาคมฯ)',
    info: {},
  };

  componentDidMount() {
    console.log("item : ", this.props.route.params.item)
    var id = this.props.route.params.item.billno;
    var type = this.props.route.params.type;
    var cremention_type_id = this.props.route.params.cremention_type_id;
    if (type == 'deduct') {
      cremationDeductDetail(id, cremention_type_id, (res, done) => {
        console.log("cremation detail : ", res)
        if (done && res.data.status == true) {
          this.setState({
            title: res.data.data.cremation_title,
            info: res?.data?.data?.cremation[0],
          });
        } else {
        }
      });
    } else {
      cremation_Detail(id, cremention_type_id, (res, done) => {
        console.log("cremation detail res : ", res)
        if (done && res.data.status == true) {
          this.setState({
            title: res.data.data.cremation_title,
            info: res?.data?.data?.cremation_detail[0],
          });
        } else {
        }
      });
    }
  }

  componentWillUnmount() { }

  onHandleMenu = (item) => { };

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
              iconStyle={{ backgroundColor: Constant.color.violet }}
              onPress={() => this.props.navigation.goBack()}
            />
          }
          centerComponent={{ text: this.state.title, style: { color: '#fff' } }}
          innerContainerStyles={{ backgroundColor: Constant.color.violet }}
          containerStyle={{
            backgroundColor: Constant.color.violet,
            borderBottomColor: Constant.color.violet,
          }}
        // rightComponent={<Icon name='person' color='#fff' iconStyle={{backgroundColor:Constant.color.violet}}  />}
        />

        <View style={styles.body}>
          <LinearGradient
            locations={[0, 0.4]}
            colors={[Constant.color.violetlight, Constant.color.darkPurple]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.linearGradient}>
            <View style={styles.content}>
              <RowInfo keys="รายละเอียด" name="" />
              <RowInfo keys="เลขที่ใบเสร็จ : " name={this.state.info?.billno} />
              <RowInfo
                keys="วันที่ออกใบเสร็จ : "
                name={this.state.info?.cshindate}
              />
              <RowInfo
                keys="เลขที่สมาคมฯ : "
                name={this.state.info?.dductdivid}
              />
              <RowInfo keys="รายการ : " name={this.state.info?.corpse} />
              <RowInfo
                keys="จำนวนเงิน : "
                name={this.state.info?.totpay}
                color={Constant.color.violet}
              />
              <View style={styles.wapperCenter}>
                <Button
                  title="ดูใบเสร็จและสั่งพิมพ์"
                  titleStyle={{ color: Constant.color.white }}
                  buttonStyle={styles.Button}
                  onPress={() => this.handleClick(this.state.info?.URL)}
                />
              </View>
            </View>
          </LinearGradient>
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

  body: {
    height: height - 80,
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
