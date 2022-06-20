import { retrieveUserId } from '../utility/dataHandler.js'

export const getExerciseSets = async (date) => {
  const userId = await retrieveUserId();
  const response = await fetch('http://localhost:3000/set/'.concat(userId).concat("/").concat(date));
  const json = await response.json();
  return json;
}

export const getUserActivity = async (date) => {
  const userId = await retrieveUserId();
  const response = await fetch('http://localhost:3000/userActivity/'.concat(userId).concat("/").concat(date))
  const json = await response.json();
  return json;
}

export const deleteExerciseSet = async (id) => {
  const response = await fetch('http://localhost:3000/set/'.concat(id), {method: 'DELETE'})
  const json = await response.json();
  return json;
}

export const postUserActivity = async (body) => {
  const response = await fetch('http://localhost:3000/userActivity/', {
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

export const patchUserActivity = async (id, body) => {
  const response = await fetch('http://localhost:3000/userActivity/'.concat(id), {
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
