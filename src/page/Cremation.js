import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon, Header } from 'react-native-elements';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Constant from '../util/Constant';
import SubCremation from '../detail/SubCremation';
import SubCremation1 from '../detail/SubCremation1';
import { cremationTop } from '../../actions/Service';
import { TouchableOpacity } from 'react-native';
import showError from '../util/showError';

export default class Warrantee extends Component {
  state = {
    title: 'สมาคมฌาปนกิจสงเคราะห์',
    index: 0,
    routes: [
      { key: 'first', title: 'ใบเสร็จสมาคมฯ' },
      { key: 'second', title: 'ใบเสร็จสมาคมฯ ฝากหัก' },
    ],
    cremation_top_detail: {
      cmtidno: '',
      nxsngkaobal: '0.00',
    },
    type: '',
  };

  componentDidMount() {
    const type = this.props.route.params.type;
    cremationTop(type, (res, done) => {
      console.log("cremationTop res : ", res.data)
      if (done && res.data.status) {
        this.setState({
          title: res.data.data.cremation_title,
          cremation_top_detail: res.data.data.cremation_top_detail,
          type: type,
        });
      } else {
        showError(res.data.message);
      }
    });
  }

  toBeneficiary() {
    this.props.navigation.navigate('Beneficiary', { type: this.state.type });
  }

  componentWillUnmount() { }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
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
        />

        <View style={styles.body}>
          <View style={{ padding: 20, ...Constant.color.shadow }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>
              รายละเอียด
            </Text>
            <View style={styles.label}>
              <Text style={{ fontSize: 16 }}>เลขที่สมาคมฯ :</Text>
              <Text style={{ fontSize: 16 }}>
                {this.state.cremation_top_detail.cmtidno}
              </Text>
            </View>

            <View style={styles.label}>
              <Text style={{ fontSize: 16 }}>เงินฝากสงเคราะห์ล่วงหน้า :</Text>
              <Text style={{ fontSize: 16 }}>
                {this.state.cremation_top_detail.nxsngkaobal}
              </Text>
            </View>

            <View style={styles.label}>
              <Text style={{ fontSize: 16 }}>ผู้รับผลประโยชน์ :</Text>
              <TouchableOpacity onPress={() => this.toBeneficiary()}>
                <Text
                  style={{
                    textDecorationLine: 'underline',
                    color: Constant.color.darkPurple,
                    fontSize: 16,
                  }}>
                  ดูผู้รับผลประโยชน์
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.content}>
            <TabView
              onIndexChange={index => this.setState({ index })}
              navigationState={this.state}
              renderScene={SceneMap({
                first: () => (
                  <SubCremation navigation={this.props.navigation} type={this.state.type} />
                ),
                second: () => (
                  <SubCremation1 navigation={this.props.navigation} type={this.state.type} />
                ),
              })}
              renderTabBar={props => (
                <TabBar
                  {...props}
                  indicatorStyle={{
                    backgroundColor: Constant.color.violetlight,
                    height: '100%',
                  }}
                  style={{ backgroundColor: Constant.color.cream }}
                  renderIcon={this.renderIcon}
                  renderLabel={({ route, focused, color }) => (
                    <Text numberOfLines={1} style={{ color, margin: 8 }}>
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
    padding: 20,
    backgroundColor: Constant.color.white,
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
  label: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
});
