import { retrieveUserId } from '../utility/dataHandler.js'
  
export const patchBMetric = async (id, body) => {
    const response = await fetch('http://localhost:3000/users/'.concat(id), {
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