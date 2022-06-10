export const postSet = async (body) => {
  const response = await fetch('http://localhost:3000/set', {
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

export const patchSet = async (id, body) => {
  const response = await fetch('http://localhost:3000/set/'.concat(id), {
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