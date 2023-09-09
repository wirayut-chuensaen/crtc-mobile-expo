import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Icon, Header} from 'react-native-elements';
import {beneficiary} from '../../actions/Service';
import Constant from '../util/Constant';
import ItemBeneficiary from '../item/ItemBeneficiary';
import showError from '../util/showError';

const width = Dimensions.get('window').width;

export default class Beneficiary extends Component {
  state = {
    title: 'ผู้รับผลประโยชน์',
    item: [],
    refreshing: false,
  };

  toBeneficiary() {
    this.props.navigation.navigate('Beneficiary');
  }

  componentDidMount() {
    this.initialData();
    this._handleRefresh = this._handleRefresh.bind(this);
  }

  initialData() {
    const type = this.props.route.params.type;
    console.log('type', type)
    beneficiary(type, (res, done) => {
      if (done && res.data.status) {
        this.setState({
          item: res.data.data.beneficiaries,
          refreshing: false,
        });
      } else {
        this.setState({refreshing: false});
        showError(res.data.message);
      }
    });
  }

  _handleRefresh() {
    this.setState({refreshing: true});
    this.initialData();
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
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
            <Text style={{fontWeight: 'bold', fontSize: 16}}>
              ผู้รับผลประโยชน์
            </Text>
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
                <View>
                  <ItemBeneficiary {...item} />
                </View>
              )}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 15,
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
