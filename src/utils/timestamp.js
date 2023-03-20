/**
 *Format timestamp to 'dd.mm.yyyy hh:mm' or 'hh:mm:ss'
 * @param {*} timestamp
 * @param {boolean} [isTime=false]
 * @return {*}  string
 */
const timestamp = (timestamp, isTime = false) => {
  const formatValue = (val) => (String(val).length === 1 ? `0${val}` : val);

  const offSet = 300000;

  console.log(offSet);

  const rightTimeStamp =
    (String(timestamp).length <= 10 ? timestamp * 1000 : timestamp) - offSet;

  const date = new Date(rightTimeStamp);

  const hour = formatValue(date.getHours());
  const min = formatValue(date.getMinutes());

  if (isTime) {
    const sec = formatValue(date.getUTCSeconds());

    const deltaMs = new Date().getTime() - offSet - rightTimeStamp;
    const deltaStr = `${Math.floor(deltaMs / 60000)} min ago`;

    return `${hour}:${min}:${sec} (${deltaStr})`;
  }

  const day = formatValue(date.getDate());
  const month = formatValue(date.getMonth() + 1);

  return `${day}.${month}.${date.getFullYear()} ${hour}:${min}`;
};

module.exports = { timestamp };
