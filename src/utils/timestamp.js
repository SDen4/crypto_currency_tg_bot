/**
 *Format timestamp to 'dd.mm.yyyy hh:mm' or 'hh:mm:ss'
 * @param {*} timestamp
 * @param {boolean} [isTime=false]
 * @return {*}  string
 */
export const timestamp = (timestamp, isTime = false) => {
  const formatValue = (val) => (String(val).length === 1 ? `0${val}` : val);

  const rightTimeStamp =
    String(timestamp).length <= 10 ? timestamp * 1000 : timestamp;

  const date = new Date(rightTimeStamp);

  const hour = formatValue(date.getHours());
  const min = formatValue(date.getMinutes());

  if (isTime) {
    const deltaMs = new Date().getTime() - rightTimeStamp;
    const deltaMin = Math.floor(deltaMs / 60000);

    return `finished ${deltaMin} min ago`;
  }

  const day = formatValue(date.getDate());
  const month = formatValue(date.getMonth() + 1);

  return `${day}.${month}.${date.getFullYear()} ${hour}:${min}`;
};
