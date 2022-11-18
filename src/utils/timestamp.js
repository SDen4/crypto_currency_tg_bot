/**
 *Format timestamp to 'dd.mm.yyyy hh.mm'
 *
 * @param {*} timestamp
 * @return {*} string 'dd.mm.yyyy hh.mm'
 */
const timestamp = (timestamp) => {
  const date = new Date(timestamp);
  const month = date.getMonth() + 1;
  const correctMonth = String(month).length === 1 ? `0${month}` : month;
  const hour = date.getHours();
  const min = date.getMinutes();

  return `${date.getDate()}.${correctMonth}.${date.getFullYear()} ${hour}:${min}`;
};

module.exports = { timestamp };
