/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, FlatList, Alert} from 'react-native';
import {Icon, Header} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {accountDetail} from '../../actions/Service';
import Constant from '../util/Constant';
import ItemTransferHistory from '../item/ItemTransferHistory';
import useNavigator from '../util/useNavigator';
import Spinner from 'react-native-loading-spinner-overlay';
import NumberHelper from '../util/NumberHelper';

const AccountDetail = ({navigation, account_number, Actions}) => {
  const [account, setAccount] = useState({});
  const [statementList, setStatementList] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    initialData();
  }, []);

  const initialData = () => {
    setIsLoading(true);
    accountDetail(account_number.replace('-', ''), (res, done) => {
      setIsLoading(false);
      try {
        if (done && res.data.status) {
          const {savemas, statements} = res.data.data;
          setAccount(savemas);
          setStatementList(statements);
        } else {
          if (res.response.status === 401) {
            Alert.alert(
              '',
              res.response.data.message,
              [
                {
                  text: 'OK',
                  onPress: () => {
                    Actions.replace('Launcher');
                  },
                },
              ],
              {cancelable: false},
            );
          }
        }
      } catch (e) {
        console.log(e);
      }
    });
  };

  const onTransfer = () => {
    navigation.navigate('TransferAction', {
      account,
    });
  };

  const _renderHeader = () => (
    <View>
      <Text style={{fontSize: 14, fontWeight: 'bold'}}>รายการล่าสุด</Text>
      <View
        style={{
          height: 1,
          backgroundColor: '#eee',
          width: '100%',
          marginVertical: 20,
        }}
      />
    </View>
  );

  const onShow = () => setShowAll(!showAll);

  const _renderFooter = () => {
    return (
      <View style={{marginVertical: 20}}>
        <TouchableOpacity onPress={onShow}>
          <View
            style={{
              height: 50,
              borderRadius: 8,
              justifyContent: 'center',
              backgroundColor: '#eee',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: Constant.color.violet,
                  fontSize: 14,
                  marginRight: 8,
                  marginBottom: 4,
                }}>
                {!showAll ? 'ดูทั้งหมด' : 'ดูน้อยลง'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const _renderItem = ({item, index}) => {
    const onActive = () => {
      setActiveIndex(index);
    };

    const onDeactive = () => {
      setActiveIndex(-1);
    };

    return (
      <ItemTransferHistory
        onActive={onActive}
        onDeactive={onDeactive}
        isActive={activeIndex === index}
        {...item}
      />
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#e1e1e1'}}>
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
        centerComponent={{text: 'รายละเอียดบัญชี', style: {color: '#fff'}}}
        innerContainerStyles={{backgroundColor: Constant.color.violet}}
        containerStyle={{
          backgroundColor: Constant.color.violet,
          borderBottomColor: Constant.color.violet,
        }}
      />

      <View
        style={{justifyContent: 'center', alignItems: 'center', padding: 20}}>
        <Text style={{fontSize: 18, color: '#444'}}>{account.ACNAME}</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
            marginTop: 4,
          }}>
          <Text>{account.ACCNO}</Text>
          <View
            style={{
              width: 20,
              height: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon
              name="eye-off-outline"
              type="material-community"
              color="gray"
              size={13}
              iconStyle={{marginLeft: 4}}
              onPress={navigation.goBack}
            />
          </View>
        </View>
        <Text style={{fontSize: 14, color: '#444', marginTop: 12}}>
          ยอดเงินทั้งหมด
        </Text>
        <Text
          style={{
            fontSize: 22,
            color: '#444',
            fontWeight: 'bold',
            marginTop: 4,
          }}>
          {NumberHelper.numberFormat(account?.BALANCE ?? 0, 2)} THB
        </Text>

        <View
          style={{
            height: 2,
            backgroundColor: '#ccc',
            width: '100%',
            marginTop: 10,
          }}
        />
      </View>
      <View style={{marginBottom: 20}}>
        <TouchableOpacity onPress={onTransfer}>
          <LinearGradient
            locations={[0, 0.4]}
            colors={[Constant.color.violetlight, Constant.color.darkPurple]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={{
              height: 50,
              marginHorizontal: 20,
              borderRadius: 8,
              justifyContent: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: 'white', fontSize: 14}}>โอนเงิน</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, backgroundColor: 'white', padding: 20}}>
        <FlatList
          data={
            showAll
              ? statementList
              : statementList.filter((d, i) => [0, 1, 2].indexOf(i) !== -1)
          }
          showsVerticalScrollIndicator={false}
          keyExtractor={(data, index) => `transfer_history_${index}`}
          renderItem={_renderItem}
          ItemSeparatorComponent={() => <View style={{height: 20}} />}
          ListHeaderComponent={_renderHeader}
          ListFooterComponent={_renderFooter}
        />
      </View>

      {isLoading && (
        <Spinner
          visible={true}
          textContent={'Loading...'}
          textStyle={{color: '#fff'}}
        />
      )}
    </View>
  );
};

export default useNavigator(AccountDetail);
