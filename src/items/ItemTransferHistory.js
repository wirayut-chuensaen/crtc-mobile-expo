import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import NumberHelper from '../util/NumberHelper';

const HistoryLabel = ({label, value, valueColor}) => (
  <View
    style={{
      height: 30,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
    <Text>{label}</Text>
    <Text
      style={{color: valueColor ? valueColor : 'black', fontWeight: 'bold'}}>
      {value}
    </Text>
  </View>
);

const ItemTransferHistory = ({
  RECNO,
  ACCID,
  TRDATE,
  TRTYPE,
  BFWBAL,
  DEPAMT,
  WIDAMT,
  OUTSBAL,

  onActive,
  onDeactive,
  isActive = false,
}) => {
  BFWBAL = BFWBAL.replace(',', '');
  OUTSBAL = OUTSBAL.replace(',', '');
  DEPAMT = DEPAMT.replace(',', '');
  WIDAMT = WIDAMT.replace(',', '');
  const accountAmount =
    Number(DEPAMT) > 0
      ? NumberHelper.numberFormat(DEPAMT, 2)
      : `-${NumberHelper.numberFormat(WIDAMT, 2)}`;
  const amountColor = Number(DEPAMT) > 0 ? 'green' : 'red';

  if (isActive) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onDeactive}
        style={styles.cardContainer}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 15, marginBottom: 10}}>
              โอนเงิน Account Transfer
            </Text>
            <HistoryLabel label="รหัสอ้างอิง" value={RECNO} />
            <HistoryLabel
              label="ยอดเงินก่อนทำรายการ"
              value={NumberHelper.numberFormat(BFWBAL, 2)}
            />
            <HistoryLabel
              label="ยอดเงินหลังทำรายการ"
              value={NumberHelper.numberFormat(OUTSBAL, 2)}
            />
            <HistoryLabel
              label="จำนวนเงิน"
              value={accountAmount}
              valueColor={amountColor}
            />
            <HistoryLabel label="ทำรายการวันที่" value={TRDATE} />
          </View>
          <View>
            <Icon name="chevron-thin-up" type="entypo" color="gray" size={12} />
          </View>
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onActive}
        style={styles.cardContainer}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 15}}>โอนเงิน Account Transfer</Text>
            <Text style={{fontSize: 11, marginTop: 8}}>{TRDATE}</Text>
            <View style={{alignItems: 'flex-end', marginTop: 8}}>
              <Text
                style={{fontSize: 22, fontWeight: 'bold', color: amountColor}}>
                {accountAmount} <Text style={{fontSize: 12}}>THB</Text>
              </Text>
            </View>
          </View>
          <View>
            <Icon
              name="chevron-thin-down"
              type="entypo"
              color="gray"
              size={12}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
};

export default ItemTransferHistory;

const styles = StyleSheet.create({
  cardContainer: {
    padding: 14,
    borderRadius: 4,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
  },
});
