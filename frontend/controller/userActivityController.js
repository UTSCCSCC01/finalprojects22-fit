import { baseURI } from '../utility/constants.js';
import { retrieveUserId } from '../utility/dataHandler.js';

export const getUserActivity = async (date) => {
  const userId = await retrieveUserId();
  const response = await fetch(baseURI.concat('/userActivity/').concat(userId).concat("/").concat(date))
  const json = await response.json();
  return json;
}

export const postUserActivity = async (body) => {
  const response = await fetch(baseURI.concat('/userActivity/'), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    body: body
  });
  const json = await response.json();
  return json;
}

export const patchUserActivity = async (id, body) => {
  const response = await fetch(baseURI.concat('/userActivity/').concat(id), {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    body: body
  });
  const json = await response.json();
  return json;
}
