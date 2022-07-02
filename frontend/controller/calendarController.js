import { retrieveUserId } from '../utility/dataHandler.js'
import { baseURI } from '../utility/constants.js';

export const getAllUserActivity = async () => {
  const userId = await retrieveUserId();
  const response = await fetch(baseURI.concat('/userActivity/').concat(userId));
  const json = await response.json();
  return json;
}
