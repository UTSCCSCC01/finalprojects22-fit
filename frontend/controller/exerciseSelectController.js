export const getExercisesByGroup = async (group) => {
  const response = await fetch('http://localhost:3000/exercises/Groups/'.concat(group));
  const json = await response.json();
  return json;
}

export const getExercisesBySearch = async (query) => {
  const response = await fetch('http://localhost:3000/exercises/Search/'.concat(query));
  const json = await response.json();
  return json;
}