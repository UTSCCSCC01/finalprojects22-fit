import { baseURI } from '../../utility/constants.js';
import { retrieveUserId } from '../../utility/dataHandler.js'

export const postExercisePlan = async (body) => {
  const response = await fetch(baseURI.concat('/workoutPlans/'), {
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

export const patchUserWorkoutPlan = async (body) => {
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