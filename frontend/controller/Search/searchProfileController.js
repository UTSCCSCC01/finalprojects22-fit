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

export const getUserSavedFoods = async (date) => {
    const userId = await retrieveUserId();
    const response = await fetch(baseURI.concat('/savedfood/').concat(userId).concat('/').concat(date));
    const json = await response.json();
    return json;
}

export const sendFriendRequest = async (fid, username) => {
    const userId = await retrieveUserId();
    const body = JSON.stringify({
        from_user: userId,
        from_username: username,
        to_user: fid,
    });
    const response = await fetch(baseURI.concat('/friendReq'), {
      method: 'POST',
      headers: {
        Accept: 'application/json',
          'Content-Type': 'application/json'
      },
      body: body
    });
    if (!response.ok) return null;
    const json = await response.json();
    return json;
}