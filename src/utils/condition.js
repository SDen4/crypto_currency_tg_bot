/**
 * Formatting string for conditions
 *
 * @param {*} text: any
 * @return {*} string in lower case
 */
const condition = (text) => {
  return String(text).toLocaleLowerCase();
};

module.exports = { condition };
