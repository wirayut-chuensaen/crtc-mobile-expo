import React, {Component} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Image,
  FlatList,
  Linking,
} from 'react-native';
import {Icon, Header} from 'react-native-elements';
import Constant from '../util/Constant';

import LinearGradient from 'react-native-linear-gradient';
import RowInfo from '../item/RowInfo';
import {statement} from '../../actions/Service';
import ItemStatement from '../item/ItemStatement';
import {Dialog} from 'react-native-simple-dialogs';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class Statement extends Component {
  state = {
    dialogVisible: false,
    title: 'รายการเดินบัญชี',
    item: [],
    refreshing: false,
    image: '',
  };

  componentDidMount() {
    var id = this.props.route.params.accno;

    statement(id, (res, err) => {
      if (res.data.status == true) {
        this.setState({
          item: res.data.data.savemas_statements,
        });
        this.setState({
          image: res.data.data.loan_statment[0].image,
        });
      } else {
      }
    });
    // this.onLoadData()
  }

  componentWillUnmount() {}

  _handleRefresh = () => {
    this.setState({
      refreshing: true,
    });
    var id = this.props.route.params.accno;
    statement(id, (res, err) => {
      if (res.data.status == true) {
        this.setState({
          refreshing: false,
          item: res.data.data.savemas_statements,
        });
      } else {
        this.setState({
          refreshing: false,
        });
      }
    });
  };

  onOpenUrl = () => {
    if (this.state.item.length > 0) {
      Linking.openURL(this.state.item[0].image).catch((err) =>
        alert('link : ' + this.state.item[0].image),
      );
    }
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
          rightComponent={
            <Icon
              name="infocirlceo"
              type="antdesign"
              color="#fff"
              iconStyle={{backgroundColor: Constant.color.violet}}
              onPress={() => this.onOpenUrl()}
            />
          }
          // rightComponent={<Icon name='person' color='#fff' iconStyle={{backgroundColor:Constant.color.violet}}  />}
        />

        <View style={styles.body}>
          <LinearGradient
            locations={[0, 0.4]}
            colors={[Constant.color.violetlight, Constant.color.darkPurple]}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            style={styles.linearGradient}>
            <View style={styles.content}>
              <RowInfo keys="รายการเดินบัญชี" name="" />

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
                  // <TouchableOpacity onPress={() =>  this.props.navigation.navigate('',{item})}>
                  <ItemStatement {...item} />
                  // </TouchableOpacity>
                )}
              />
            </View>
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
                uri: 'https://dev.crtc-service.com/images/saving-code19.jpg',
              }}
              style={{
                width: width,
                height: (width - 40) / 1.5,

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
