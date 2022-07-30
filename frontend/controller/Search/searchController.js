import { retrieveUserId } from '../../utility/dataHandler.js'
import { baseURI } from '../../utility/constants.js';

export const getUsers = async (query_text) => {
  const userId = await retrieveUserId();
  const response = await fetch(baseURI.concat('/users/search/').concat(query_text));
  const json = await response.json();
  return json;
}

export const getAllUserFReqs = async () => {
    const userId = await retrieveUserId();
    const response = await fetch(baseURI.concat('/friendReq/list/').concat(userId));
    if (!response.ok) return null;
    const json = await response.json();
    return json;
}

export const deleteFreqs = async (reqid) => {
  const response = await fetch(baseURI.concat('/friendReq/').concat(reqid),{
    method: 'DELETE',
  });
  const json = await response.json();
  return json;
}

export const addUserFriend = async (fid) => {
  const userId = await retrieveUserId();
  const response = await fetch(baseURI.concat('/users/').concat(userId).concat('/friend/').concat(fid), {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    body: null
  });
  if (!response.ok) return null;
  const json = await response.json();
  return json;
}