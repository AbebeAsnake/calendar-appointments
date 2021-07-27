
const titleLengthValidator = '^[A-Z]{1,30}$';
export function isValidTitleLength(value: any) {
  return !RegExp(/^[a-zA-Z0-9_a-z\d\-_\s]{1,30}$/i).test(value);

}