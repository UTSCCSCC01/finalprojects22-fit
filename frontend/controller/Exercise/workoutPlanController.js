import { baseURI } from '../../utility/constants.js';
import { retrievePlanId, retrieveUserId } from '../../utility/dataHandler.js'

export const getWorkoutPlan = async (workoutPlanId) => {
  const response = await fetch(baseURI.concat('/workoutPlans/').concat(workoutPlanId));
  const json = await response.json();
  return json;
}

export const getDefaultWorkoutPlan = async () => {
  const response = await fetch(baseURI.concat('/workoutPlans/userPlans/62dda03f75cb760db8bb4e8b'));
  const json = await response.json();
  return json;
}

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

export const patchWorkoutPlan = async (body) => {
  const planId = await retrievePlanId();
  const response = await fetch(baseURI.concat('/workoutPlans/').concat(planId), {
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

export const deleteWorkoutPlan = async (id) => {
  const response = await fetch(baseURI.concat('/workoutPlans/').concat(id), {method: 'DELETE'})
  const json = await response.json();
  return json;
}