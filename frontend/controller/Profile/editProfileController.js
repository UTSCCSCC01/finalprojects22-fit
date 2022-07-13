import { retrieveUserId } from '../../utility/dataHandler.js'
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
