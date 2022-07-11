import { baseURI } from '../utility/constants.js';

export const postCustomizedExercises = async (body) => {
    const response = await fetch(baseURI.concat('/customizedExercises/'), {
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



