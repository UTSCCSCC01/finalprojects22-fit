import { baseURI } from '../../utility/constants.js';

export const getFoodsByGroup = async (group) => {
  const response = await fetch(baseURI.concat('/foods/Groups/').concat(group));
  const json = await response.json();
  return json;
}

export const getFoodsBySearch = async (query) => {
  const response = await fetch(baseURI.concat('/foods/Search/').concat(query));
  const json = await response.json();
  return json;
}