import { retrieveUserId } from '../../utility/dataHandler.js'
import { baseURI } from '../../utility/constants.js';

export const getUsers = async (query_text) => {
  const userId = await retrieveUserId();
  const response = await fetch(baseURI.concat('/users/search/').concat(query_text));
  const json = await response.json();
  return json;
}
