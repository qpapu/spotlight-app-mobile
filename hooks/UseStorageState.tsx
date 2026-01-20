import * as SecureStore from "expo-secure-store";
import { useCallback, useEffect, useState } from "react";
import { Platform } from "react-native";

const storage = {
  get: async (key: string): Promise<string | null> => {
    try {
      if (Platform.OS === "web") {
        return localStorage.getItem(key);
      } else {
        return await SecureStore.getItemAsync(key);
      }
    } catch (e) {
      console.error("Error accessing storage:", e);
      return null;
    }
  },
  set: async (key: string, value: string | null) => {
    try {
      if (Platform.OS === "web") {
        value === null
          ? localStorage.removeItem(key)
          : localStorage.setItem(key, value);
      } else {
        value === null
          ? await SecureStore.deleteItemAsync(key)
          : await SecureStore.setItemAsync(key, value);
      }
    } catch (e) {
      console.error("Error accessing storage:", e);

    }
  },
};

//Define the type for the return value of useStorageState
//Complex type that returns 2 elements. The first element is a tuple containing a boolean and a string or null.
//The second element is a function that takes a string or null and returns void.
type StorageState = [[boolean, string | null], (value: string | null) => void];

export function useStorageState(key: string): StorageState {
  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = useState<string | null>(null);

  // Load the value from storage on mount
  useEffect(() => {
    let isMounted = true;
    storage.get(key).then((storedValue) => {
      if (isMounted) {
        setValue(storedValue);
        setIsLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [key]);

  const updateValue = useCallback(
    (newValue: string | null) => {
      setValue(newValue);
      storage.set(key, newValue);
    },
    [key],
  );

  return [[isLoading, value], updateValue];
}
