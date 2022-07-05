import { retrieveUserId } from '../../utility/dataHandler.js'
import { baseURI } from '../../utility/constants.js';

export const getExerciseSets = async (date) => {
  const userId = await retrieveUserId();
  const response = await fetch(baseURI.concat('/set/').concat(userId).concat("/").concat(date));
  const json = await response.json();
  return json;
}

export const deleteExerciseSet = async (id) => {
  const response = await fetch(baseURI.concat('/set/').concat(id), {method: 'DELETE'})
  const json = await response.json();
  return json;
}
