import { baseURI } from '../../utility/constants.js';

export const postSet = async (body) => {
  const response = await fetch(baseURI.concat('/set'), {
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

export const patchSet = async (id, body) => {
  const response = await fetch(baseURI.concat('/set/').concat(id), {
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