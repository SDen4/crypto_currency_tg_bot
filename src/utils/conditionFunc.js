/**
 * Formatting string for conditions
 *
 * @param {*} text: any
 * @return {*} string in lower case
 */
const conditionFunc = (text) => {
  return String(text).toLocaleLowerCase();
};

module.exports = { conditionFunc };
