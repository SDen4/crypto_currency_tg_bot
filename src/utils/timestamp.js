/**
 *Format timestamp to 'dd.mm.yyyy hh:mm' or 'hh:mm:ss'
 * @param {*} timestamp
 * @param {boolean} [isTime=false]
 * @return {*}  string
 */
const timestamp = (timestamp, isTime = false) => {
  const formatValue = (val) => (String(val).length === 1 ? `0${val}` : val);

  const rightTimeStamp =
    String(timestamp).length <= 10 ? timestamp * 1000 : timestamp;

  const date = new Date(rightTimeStamp);

  const day = formatValue(date.getDate());
  const month = formatValue(date.getMonth() + 1);
  const hour = formatValue(date.getHours());
  const min = formatValue(date.getMinutes());
  const sec = formatValue(date.getSeconds());

  if (isTime) return `${hour}:${min}:${sec}`;

  return `${day}.${month}.${date.getFullYear()} ${hour}:${min}`;
};

module.exports = { timestamp };
