import React, {Component} from 'react';
import {StyleSheet, Text, View, Switch} from 'react-native';
import Constant from '../util/Constant';

export class ItemControll extends Component {
  state = {
    title: 'ติดต่อเรา',
    isEnabled: true,
    info: {},
  };

  toggleSwitch = () => {
    if (this.state.isEnabled == true) {
      this.setState({
        isEnabled: false,
      });
    } else {
      this.setState({
        isEnabled: true,
      });
    }
  };

  render() {
    return (
      <View style={styles.item_content}>
        <View style={styles.itemContainer}>
          <Text numberOfLines={1} style={{paddingLeft: 15}}>
            {this.props.name}
          </Text>
        </View>
        <Switch
          trackColor={{false: '#767577', true: Constant.color.violet}}
          thumbColor={
            this.state.isEnabled ? Constant.color.whitesmoke : '#f4f3f4'
          }
          ios_backgroundColor={Constant.color.gray}
          onValueChange={this.toggleSwitch}
          value={this.state.isEnabled}
        />
      </View>
    );
  }
}

export default ItemControll;

const styles = StyleSheet.create({
  item: {
    flex: 1,
  },
  item_content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    backgroundColor: Constant.color.white,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Constant.color.gray,
  },

  content: {
    margin: 10,
    padding: 10,
    backgroundColor: Constant.color.white,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: Constant.color.gray,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  image: {
    width: 40,
    height: 40,
  },
});
