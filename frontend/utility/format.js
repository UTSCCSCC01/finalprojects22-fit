export const cleanString = (val) => {
  return JSON.stringify(val).replace(/['"]+/g, '');
}