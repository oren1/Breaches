import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dictionary } from './Types';

export const storeObject = async (key: string, value: Dictionary) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
        console.log('AsyncStorage', e)
    }
  }
export const removeData = async (key: string) => {
    try {
      await AsyncStorage.removeItem(key)
    } catch(e) {
        console.log('AsyncStorage', e)
    }
  
    console.log('Done.')
}

 export const getObject = async (key: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch(e) {
        console.log('AsyncStorage', e)
    }
}