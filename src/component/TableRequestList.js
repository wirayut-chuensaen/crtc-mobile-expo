import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SizedBox from './SizedBox';
import Constant from '../util/Constant';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const TableRequestList = ({data, header = [], footer = []}) => {
  const _renderItem = ({item, index}) => {
    const status = {
      F: 'ยกเลิก',
      T: 'ทำแล้ว',
      W: 'รอดำเนินการ',
    };

    const icon = {
      F: 'close-circle-outline',
      T: 'check-circle-outline',
    };

    const color = {
      F: '#FD3030',
      T: '#00942C',
    };

    return (
      <View style={styles.tbody}>
        <View style={styles.td}>
          <Text style={styles.tdText}>{item.dtdate}</Text>
        </View>
        <View style={styles.td}>
          <Text style={styles.tdText}>{item.mem_id}</Text>
        </View>
        <View style={styles.td}>
          <Text style={styles.tdText}>{item.before_amt}</Text>
        </View>
        <View style={styles.td}>
          <Text style={styles.tdText}>{item.make2_amt}</Text>
        </View>
        <View style={styles.td}>
          <View style={styles.status}>
            {item.track_status !== 'W' && (
              <MaterialCommunityIcons
                name={icon[item.track_status]}
                color={color[item.track_status]}
                size={20}
              />
            )}
            <Text style={styles.tdText}>{status[item.track_status]}</Text>
          </View>
        </View>
      </View>
    );
  };

  const buildListHeader = () => (
    <View key="header" style={styles.headerContainer}>
      <Text style={styles.title}>รายการคำขอที่ส่งไปแล้ว</Text>
      <SizedBox height={17} />
      <View style={styles.thead}>
        <View style={styles.th}>
          <Text style={styles.thText}>วันที่ส่ง</Text>
        </View>
        <View style={styles.th}>
          <Text style={styles.thText}>เลขสมาชิก</Text>
        </View>
        <View style={styles.th}>
          <Text style={styles.thText}>ค่าเดิม</Text>
        </View>
        <View style={styles.th}>
          <Text style={styles.thText}>เปลี่ยนเป็น</Text>
        </View>
        <View style={styles.th}>
          <Text style={styles.thText}>สถานะงาน</Text>
        </View>
      </View>
      <SizedBox height={4} />
      <View style={styles.br} />
    </View>
  );

  header = [...header, buildListHeader()];

  return (
    <FlatList
      data={data}
      item={styles.list}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={() => (
        <View>
          {header.map((C, index) => (
            <View key={`header_${index}`}>{C}</View>
          ))}
        </View>
      )}
      keyExtractor={(data, index) => `${Date.now()}_${index}`}
      renderItem={_renderItem}
      ListEmptyComponent={() => (
        <View style={styles.empty}>
          <Text>ไม่มีรายการ</Text>
        </View>
      )}
      ListFooterComponent={() => (
        <View>
          {footer.map((C, index) => (
            <View key={`footer_${index}`}>{C}</View>
          ))}
          <SizedBox height={60} />
        </View>
      )}
    />
  );
};

TableRequestList.defaultProps = {
  data: [],
};

export default TableRequestList;

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 10,
    flex: 1,
  },
  thead: {
    flexDirection: 'row',
  },
  th: {
    flex: 1,
  },
  thText: {
    fontSize: 12,
    textAlign: 'center',
  },
  br: {
    backgroundColor: '#D1CFD7',
    height: 4,
  },
  tbody: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  td: {
    paddingVertical: 9,
    flex: 1,
    borderBottomColor: '#D1CFD7',
    borderBottomWidth: 1,
  },
  tdText: {
    fontSize: 10,
    color: Constant.color.dark,
    lineHeight: 20,
    textAlign: 'center',
  },
  title: {
    fontSize: 14,
    color: Constant.color.dark,
    fontWeight: '500',
  },
  status: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  body: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 10,
  },
  empty: {
    justifyContent: 'center',
    paddingVertical: 10,
    alignItems: 'center',
  },
});
