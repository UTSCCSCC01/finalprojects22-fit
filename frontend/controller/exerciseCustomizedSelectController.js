import { baseURI } from '../utility/constants.js';
import { retrieveUserId } from '../utility/dataHandler.js';

// get both default and customized exercise

export const getCustomizedExercisesByGroup = async (group) => {
  const userId = await retrieveUserId();
  const response = await fetch(baseURI.concat('/customizedExercises/').concat(userId).concat("/Groups/").concat(group));
  const json = await response.json();
  return json;
}

export const getCustomizedExercisesBySearch = async (query) => {
  const userId = await retrieveUserId();
  const response = await fetch(baseURI.concat('/customizedExercises/').concat(userId).concat("/Search/").concat(query));
  const json = await response.json();
  return json;
}