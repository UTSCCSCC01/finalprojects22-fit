import { retrieveUserId } from '../../utility/dataHandler.js'
import { baseURI } from '../../utility/constants.js';

export const getUsers = async (query_text) => {
  const userId = await retrieveUserId();
  const response = await fetch(baseURI.concat('/users/search/').concat(query_text));
  if (!response.ok) return [];
  const json = await response.json();
  console.log(json)
  const filtered = json.data;
  console.log(userId);
  const result = filtered.filter(user => user._id != userId);
  return result;
}

export const getFReq = async (uid) => {
  const userId = await retrieveUserId();
  const response = await fetch(baseURI.concat('/friendReq/list/').concat(userId).concat("/").concat(uid)); 
  if (!response.ok) return null;
  const json = await response.json();
  return json;
}

export const getCurrUser = async () => {
  const userId = await retrieveUserId();
  const response = await fetch(baseURI.concat('/users/').concat(userId)); 
  if (!response.ok) return null;
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