
/* Convert value to string and trim unwanted characters*/
export const cleanString = (val) => {
  return JSON.stringify(val).replace(/['"]+/g, '');
}

/* Convert value to string and trim unwanted characters*/
export const cleanNum = (val) => {
  return JSON.stringify(val).replace(/[^0-9.]/g, '');
}

/* Take a number representing time in seconds and return
a time in the format HH:MM:SS */
export const numberToTime = (number) => {
  var date = new Date(null);
  date.setSeconds(number); // specify value for SECONDS here
  var result = new Date(number * 1000).toISOString().substring(11, 19);
  return result;
}

