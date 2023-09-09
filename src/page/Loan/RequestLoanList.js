/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {Component, useEffect, useState} from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import {Icon, Header, Button} from 'react-native-elements';
import Constant from '../../util/Constant';

import LinearGradient from 'react-native-linear-gradient';
import useNavigator from '../../util/useNavigator';
import {getRequestLoanList} from '../../../actions/Service';
import SizedBox from '../../component/SizedBox';
import AppButton from '../../component/AppButton';
import {PaddingSymmetric} from '../../component/Padding';
import TableLoanList from '../../component/TableLoanList';
import showError from '../../util/showError';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const RequestLoanList = ({navigation, Actions}) => {
  const [loanRequestList, setLoanRequestList] = useState([]);

  const initialData = () => {
    getRequestLoanList((res, done) => {
      if (done && res.data.status) {
        setLoanRequestList(res.data.list_loan_request);
      } else {
        showError(res.data.message);
      }
    });
  };

  useEffect(() => {
    initialData();
  }, []);

  return (
    <View style={styles.body}>
      <Header
        leftComponent={
          <Icon
            name="chevron-thin-left"
            type="entypo"
            color="#fff"
            iconStyle={{backgroundColor: Constant.color.violet}}
            onPress={navigation.goBack}
          />
        }
        centerComponent={{text: 'ส่งคำขอกู้ออนไลน์', style: {color: '#fff'}}}
        innerContainerStyles={{backgroundColor: Constant.color.violet}}
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
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={styles.linearGradient}>
          <View style={styles.content}>
            <TableLoanList
              key="loan_request"
              header={[
                <View>
                  <SizedBox height={12} />
                </View>,
              ]}
              footer={[
                <SizedBox height={60} />,
                <PaddingSymmetric horizontal={10}>
                  <AppButton
                    text="ส่งคำขอกู้ออนไลน์"
                    onPress={() =>
                      Actions.push('FormRequestLoan', {refresh: initialData})
                    }
                  />
                </PaddingSymmetric>,
              ]}
              data={loanRequestList}
            />
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

export default useNavigator(RequestLoanList);

const styles = StyleSheet.create({
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
    marginTop: 20,
    margin: 10,
    backgroundColor: Constant.color.violetlight,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Constant.color.gray,
  },
});
