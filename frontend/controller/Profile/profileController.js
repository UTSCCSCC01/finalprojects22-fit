import { retrieveUserId } from '../../utility/dataHandler.js'
import { baseURI } from '../../utility/constants.js';

export const getUserProfile = async () => {
  const userId = await retrieveUserId();
  const response = await fetch(baseURI.concat('/users/').concat(userId));
  const json = await response.json();
  return json;
}

export const getUserProfilePicture = async (uri) => {
  const userId = await retrieveUserId();
  const response = await fetch(uri);
  const json = await response.json();
  return json;
}

export const getUserSavedFoods = async (date) => {
  const userId = await retrieveUserId();
  const response = await fetch(baseURI.concat('/savedfood/').concat(userId).concat('/').concat(date));
  const json = await response.json();
  return json;
}