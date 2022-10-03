import AsyncStorage from '@react-native-async-storage/async-storage'
import { getBasket } from '../apis';

export const setItem = async (key, value) => {
  return AsyncStorage.setItem(key, value)
}

export const getItem = async key => {
  return await AsyncStorage.getItem(key)
};

export const cartCount = async () =>{
  const basket = await getBasket();
  const productQuantity = basket[0]?.line_details.length.toString();
  return productQuantity
  }