export const getFoodSavedPlans = async () => {
  const response = await fetch('http://192.168.2.69:3000/savedfood/62a8aed17a8cd32ad4e43907');
  const json = await response.json();
  return json;
}

export const deleteFoodSavedPlans = async (id) => {
  const response = await fetch('http://192.168.2.69:3000/savedfood/'.concat(id), {method: 'DELETE'})
  const json = await response.json();
  return json;
}