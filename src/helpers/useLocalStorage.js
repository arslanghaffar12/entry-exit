import { useState, useEffect } from "react";
import { encryptStorage } from "./encryptStorage";

const  getStorageValue = (key, defaultValue) => {

  // getting stored value
  if (typeof window !== "undefined") {
    const saved = encryptStorage.getItem(key);
    const initial = saved != null ? saved : defaultValue;
    return initial;
  }
};

export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    encryptStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};