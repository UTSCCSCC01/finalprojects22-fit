import { baseURI } from '../utility/constants.js';
import { retrieveUserId } from '../utility/dataHandler.js';

export const getUser = async () => {
    const userId = await retrieveUserId();
    const response = await fetch(baseURI.concat('/users/').concat(userId))
    const json = await response.json();
    return json;
}

// to calculate progress
export const getGoal = async () => {
    const userId = await retrieveUserId();
    const response = await fetch(baseURI.concat('/longTermGoals/').concat(userId))
    const json = await response.json();
    return json;
}

export const deleteGoal = async (goalId) => {
    const response = await fetch(baseURI.concat('/longTermGoals/').concat(goalId), {method: 'DELETE'})
    const json = await response.json();
    return json;
}

export const postGoal = async (body) => {
    const response = await fetch(baseURI.concat('/longTermGoals/'), {
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

// patch user with goalId: replace original one
export const patchUser = async (body) => {
    const userId = await retrieveUserId();
    const response = await fetch(baseURI.concat('/users/').concat(userId), {
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
