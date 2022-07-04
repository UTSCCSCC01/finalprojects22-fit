import { retrieveUserId } from '../utility/dataHandler.js'

export const getFoodSavedPlans = async () => {
  const userId = await retrieveUserId();
  const response = await fetch('http://localhost:3000/savedfood/'.concat(userId));
  const json = await response.json();
  return json;
}

export const deleteFoodSavedPlans = async (id) => {
  const response = await fetch('http://localhost:3000/savedfood/'.concat(id), {method: 'DELETE'})
  const json = await response.json();
  return json;
}