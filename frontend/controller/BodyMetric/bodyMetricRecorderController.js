import { retrieveUserId } from '../../utility/dataHandler.js'
  
export const patchAddBMetric = async (body) => {
    const userId = await retrieveUserId();
    const response = await fetch('http://localhost:3000/users/'.concat(userId)+'/bmetric', {
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

export const patchUpdateBMetric = async (body, bid) => {
    const userId = await retrieveUserId();
    const response = await fetch('http://localhost:3000/users/'.concat(userId)+'/bmetric/'.concat(bid), {
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