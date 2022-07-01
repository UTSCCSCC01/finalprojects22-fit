export const postSavedFood = async (body) => {
  const response = await fetch('http://192.168.2.69:3000/savedfood', {
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

export const patchSavedFood = async (id, body) => {
  const response = await fetch('http://192.168.2.69:3000/savedfood/'.concat(id), {
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