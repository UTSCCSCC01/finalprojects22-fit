import { retrieveUserId } from '../utility/dataHandler.js'

export const getBodyMetric = async () => {
  const userId = await retrieveUserId();
  const response = await fetch('http://localhost:3000/users/bmetric'.concat(userId));
  const json = await response.json();
  return json;
}