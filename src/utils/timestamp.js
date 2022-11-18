/**
 *Format timestamp to 'dd.mm.yyyy hh.mm'
 *
 * @param {*} timestamp
 * @return {*} string 'dd.mm.yyyy hh.mm'
 */
const timestamp = (timestamp) => {
  const rightTimeStamp =
    String(timestamp).length <= 10 ? timestamp * 1000 : timestamp;

  const date = new Date(rightTimeStamp);
  const month = date.getMonth() + 1;
  const correctMonth = String(month).length === 1 ? `0${month}` : month;
  const hour = date.getHours();
  const min = date.getMinutes();

  return `${date.getDate()}.${correctMonth}.${date.getFullYear()} ${hour}:${min}`;
};

module.exports = { timestamp };
