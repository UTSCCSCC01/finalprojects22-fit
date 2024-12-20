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

export const storeUserMetrics = async (metric) => {
  try {

    await AsyncStorage.setItem(
      'preferredMetric',
      metric
    );
  } catch (error) {
    // Error saving data
  }
};

export const storeUserPlan = async (planId) => {
  try {

    await AsyncStorage.setItem(
      'planId',
      planId
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

export const retrieveUserMetrics = async () => {
  try {
    const value = await AsyncStorage.getItem('preferredMetric');
    if (value !== null) {
      return value;
    }
    else {
      return "1"; // return metric by defaults
    }
  } catch (error) {
    // Error retrieving data
  }
};

export const retrievePlanId = async () => {
  try {
    const value = await AsyncStorage.getItem('planId');
    if (value !== null) {
      return value;
    }
    else {
      return null; // default value
    }
  } catch (error) {
    // Error retrieving data
  }
};
