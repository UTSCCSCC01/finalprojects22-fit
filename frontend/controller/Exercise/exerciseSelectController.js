import { baseURI } from '../../utility/constants.js';

export const getExercisesByGroup = async (group) => {
  const response = await fetch(baseURI.concat('/exercises/Groups/').concat(group));
  const json = await response.json();
  return json;
}

export const getExercisesBySearch = async (query) => {
  const response = await fetch(baseURI.concat('/exercises/Search/').concat(query));
  const json = await response.json();
  return json;
}