export const getFoodSavedPlans = async () => {
  const response = await fetch('http://localhost:3000/savedfood/62a4d21342622fa510066af9');
  const json = await response.json();
  return json;
}

export const deleteFoodSavedPlans = async (id) => {
  const response = await fetch('http://localhost:3000/savedfood/'.concat(id), {method: 'DELETE'})
  const json = await response.json();
  return json;
}