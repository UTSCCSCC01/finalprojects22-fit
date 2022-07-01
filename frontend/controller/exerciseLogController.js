import { retrieveUserId } from '../utility/dataHandler.js'

export const getExerciseSets = async () => {
  const userId = await retrieveUserId();
  const response = await fetch('http://localhost:3000/set/'.concat(userId));
  const json = await response.json();
  return json;
}

export const deleteExerciseSet = async (id) => {
  const response = await fetch('http://localhost:3000/set/'.concat(id), {method: 'DELETE'})
  const json = await response.json();
  return json;
}