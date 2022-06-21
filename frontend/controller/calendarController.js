import { retrieveUserId } from '../utility/dataHandler.js'

export const getAllUserActivity = async () => {
  const userId = await retrieveUserId();
  const response = await fetch('http://localhost:3000/userActivity/'.concat(userId));
  const json = await response.json();
  return json;
}
