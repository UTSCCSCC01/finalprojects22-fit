export const getExerciseSets = async () => {
  const response = await fetch('http://localhost:3000/set/629fb406dce35a2490193a84');
  const json = await response.json();
  return json;
}

export const deleteExerciseSet = async (id) => {
  const response = await fetch('http://localhost:3000/set/'.concat(id), {method: 'DELETE'})
  const json = await response.json();
  return json;
}