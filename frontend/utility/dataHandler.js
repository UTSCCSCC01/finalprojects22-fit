import AsyncStorage from '@react-native-async-storage/async-storage';

/* Save user log in data to use across app */

export const storeUserId = async (userId) => {
  try {

    await AsyncStorage.setItem(
      'userId',
      userId
    );
  } catch (error) {
    // Error saving data
  }
};

// Fetching data:

export const retrieveUserId = async () => {
  try {
    const value = await AsyncStorage.getItem('userId');
    if (value !== null) {
      return value;
    }
  } catch (error) {
    // Error retrieving data
  }
};
