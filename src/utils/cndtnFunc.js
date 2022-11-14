/**
 * Formatting string for conditions
 *
 * @param {*} text: any
 * @return {*} string in lower case
 */
const cndtnFunc = (text) => {
  return String(text).toLocaleLowerCase();
};

module.exports = { cndtnFunc };
