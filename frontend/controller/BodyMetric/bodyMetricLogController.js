import { retrieveUserId } from '../../utility/dataHandler.js'
import { baseURI } from '../../utility/constants.js';

export const getBodyMetric = async () => {
  const userId = await retrieveUserId();
  const response = await fetch(baseURI.concat('/users/').concat(userId)+'/bmetric');
  const json = await response.json();
  return json;
}
