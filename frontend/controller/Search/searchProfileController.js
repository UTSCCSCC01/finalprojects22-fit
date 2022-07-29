import { retrieveUserId } from '../../utility/dataHandler.js'
import { baseURI } from '../../utility/constants.js';

export const getUserDetails = async (userid) => {
    const response = await fetch(baseURI.concat('/users/').concat(userid));
    if (!response.ok) return null;
    const json = await response.json();
    return json;
}