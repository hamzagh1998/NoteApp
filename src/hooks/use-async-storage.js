//https://stackoverflow.com/questions/63432520/useasyncstorage-custom-hook-with-usestate-hook-in-react-native
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"

export function useAsyncStorage(key, initialValue=null) {
  const [storedValue, setStoredValue] = useState();

  const getStoredItem = async (key, initialValue) => {
    try {
      const item = await AsyncStorage.getItem(key);
      const value = item ? JSON.parse(item) : initialValue;
      setStoredValue(value);
    } catch (error) {
      console.log(error);
    };
  };

  const setValue = async value => {
    try {
      const valueToStore = value instanceof Function 
                            ? value(storedValue) 
                            : value;
      setStoredValue(valueToStore);
      await AsyncStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    };
  };

  useEffect(() => {
    getStoredItem(key, initialValue);
  }, [key, initialValue]);

  return [storedValue, setValue];
};