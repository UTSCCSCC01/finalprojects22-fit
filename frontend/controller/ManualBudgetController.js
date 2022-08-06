import { retrieveUserId } from '../utility/dataHandler.js';
import { baseURI } from '../utility/constants.js';

export const getCalorieBudget= async () => {
  const userId = await retrieveUserId();
  const response = await fetch(baseURI.concat('/users/').concat(userId).concat('/').concat(budget));
  const json = await response.json();
  return json;
}


export const patchCalorieBudget = async (body) => {
  const userId = await retrieveUserId();
  const response = await fetch(baseURI.concat('/users/').concat(userId), {
    method: 'PUT',
    headers: {
    Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    body: body
  });
  const json = await response.json();
  return json;
}