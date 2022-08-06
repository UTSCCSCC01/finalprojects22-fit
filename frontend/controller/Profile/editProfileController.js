import { retrieveUserId } from '../../utility/dataHandler.js';
import { baseURI } from '../../utility/constants.js';

export const patchUserProfile = async (body) => {
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

export const patchUserProfileImg = async (form_data) => {
  const userId = await retrieveUserId();
  const response = await fetch(baseURI.concat('/users/').concat(userId).concat('/img'), {
    method: 'PUT',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: form_data
  });
  const res = await response;
  return res;
}

export const deleteUserProfileImg = async (img_uri) => {
  const userId = await retrieveUserId();
  const response = await fetch(img_uri, {
    method: 'DELETE',
  });
  const json = await response.json();
  return json;
}