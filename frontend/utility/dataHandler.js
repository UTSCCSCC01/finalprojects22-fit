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

export const storeGoalId = async (goalId) => {
  try {

    await AsyncStorage.setItem(
      'goalId',
      goalId
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

export const retrieveGoalId = async () => {
  try {
    const value = await AsyncStorage.getItem('goalId');
    if (value !== null) {
      return value;
    }
    
    else if (value === null) {
      // user has no goal
      return '';
    }
  } catch (error) {
    return '';
    
  }
};
