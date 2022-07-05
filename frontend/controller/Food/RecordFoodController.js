import { baseURI } from '../../utility/constants.js';

export const postSavedFood = async (body) => {
  const response = await fetch(baseURI.concat('/savedfood'), {
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

export const patchSavedFood = async (id, body) => {
  const response = await fetch(baseURI.concat('/savedfood/').concat(id), {
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