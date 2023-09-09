import AsyncStorage from '@react-native-async-storage/async-storage';

export const DataPersistantType = {
  OBJECT: 1,
  ARRAY: 2,
};

export default class DataPersistant {
  static setItem(key = '', jsonData) {
    if (!jsonData) {
      console.log('DataPersistant :: jsonData is not json');
      return false;
    }
    const data = JSON.stringify(jsonData);
    AsyncStorage.setItem(key, data);
    return true;
  }

  static async getItem(key, type = DataPersistantType.OBJECT) {
    let data = await AsyncStorage.getItem(key);
    if (data == null) {
      data = type === DataPersistantType.OBJECT ? '{}' : '[]';
    }
    try {
      data = JSON.parse(data);
    } catch (err) {
      console.log(err);
    }
    return data;
  }
}
