export function getEmptyFields(dataObject) {
   return Object.keys(dataObject).filter(key => !dataObject[key]);
}

export function toFirstLetterUpper(str) {
   return str[0].toUpperCase() + str.slice(1).toLowerCase();
}
