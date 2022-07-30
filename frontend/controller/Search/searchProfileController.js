import { retrieveUserId } from '../../utility/dataHandler.js'
import { baseURI } from '../../utility/constants.js';

export const getUserDetails = async (userid) => {
    const response = await fetch(baseURI.concat('/users/').concat(userid));
    if (!response.ok) return null;
    const json = await response.json();
    return json;
}

export const getUserProfilePicture = async (uri) => {
    const userId = await retrieveUserId();
    const response = await fetch(uri);
    const json = await response.json();
    return json;
  }