/**
 * validates form fields
 * @param {Object} fields - the fields object from the target form in key-value pairs
 * @returns
 */
export function validateFormFields(fields = {}) {
  /** @
   * TODO : check if fields is an object
   * TODO : inlude regex (password lenght, etc)
   * TODO : instead of checkPassword, compareFields then provide the key of the fields
   * TODO : document the function well
   */

  if (!fields) {
    throw new Error("No field object provided");
  }

  for (let field in fields) {
    if (fields[field] === undefined || fields[field] === null) {
      return {
        fieldsAreValid: false,
        message: `${field} is undefined or null`,
      };
    }
    if (!fields[field].trim().length) {
      return {
        fieldsAreValid: false,
        message: `please enter your ${field}`,
      };
    }
  }

  if ("password" in fields && "repeat password" in fields) {
    if (fields["password"] !== fields["repeat password"]) {
      return {
        fieldsAreValid: false,
        message: "passwords do not match",
      };
    }

    if (fields["password"].trim().length < 8) {
      return {
        fieldsAreValid: false,
        message: "password must be at least 8 characters long",
      };
    }
  }

  return { fieldsAreValid: true, message: "success" };
}

// function debounce(func, wait, immediate) {
//   var timeout;

//   return function executedFunction() {
//     var context = this;
//     var args = arguments;

//     var later = function () {
//       timeout = null;
//       if (!immediate) func.apply(context, args);
//     };

//     var callNow = immediate && !timeout;

//     clearTimeout(timeout);

//     timeout = setTimeout(later, wait);

//     if (callNow) func.apply(context, args);
//   };
// }
