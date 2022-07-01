export const getFoodsByGroup = async (group) => {
  const response = await fetch('http://192.168.2.69:3000/foods/Groups/'.concat(group));
  const json = await response.json();
  return json;
}

export const getFoodsBySearch = async (query) => {
  const response = await fetch('http://192.168.2.69:3000/foods/Search/'.concat(query));
  const json = await response.json();
  return json;
}