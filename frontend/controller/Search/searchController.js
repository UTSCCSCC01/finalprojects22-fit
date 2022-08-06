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

export const getFReq = async (uid1, uid2) => {
  const response = await fetch(baseURI.concat('/friendReq/list/').concat(uid1).concat("/").concat(uid2)); 
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
  const response2 = await fetch(baseURI.concat('/users/').concat(fid).concat('/friend/').concat(userId), {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    body: null
  });
  if (!response2.ok) return null;
  const json2 = await response2.json();
  return json;
}