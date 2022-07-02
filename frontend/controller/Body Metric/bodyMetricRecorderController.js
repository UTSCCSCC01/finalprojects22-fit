import { retrieveUserId } from '../utility/dataHandler.js'
  
export const patchAddBMetric = async (userId, body) => {
    const response = await fetch('http://localhost:3000/users/'.concat(userId)+'bmetric', {
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

export const patchUpdateBMetric = async (userId, body, bid) => {
    const response = await fetch('http://localhost:3000/users/'.concat(userId)+'bmetric'.concat(bid), {
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