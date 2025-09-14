import { formatDateNumber } from './formatDateNumber.js';

/**
 * Format timestamp
 * @param {*} timestamp
 * @param {boolean} [isDelta=false]
 * @return {*}  string
 */
export const timestamp = (timestamp, isDelta = false, isOnlyTime = false) => {
  const rightTimeStamp =
    String(timestamp).length <= 10 ? timestamp * 1000 : timestamp;

  const date = new Date(rightTimeStamp);

  const hour = formatDateNumber(date.getHours());
  const min = formatDateNumber(date.getMinutes());

  if (isDelta) {
    const deltaMs = new Date().getTime() - rightTimeStamp;
    const deltaMin = Math.floor(deltaMs / 60000);

    return `finished ${deltaMin} min ago`;
  }

  // убрать в отдельную утилиту
  if (isOnlyTime) {
    const sec = formatDateNumber(date.getSeconds());
    return `${hour}:${min}:${sec}`;
  }

  const day = formatDateNumber(date.getDate());
  const month = formatDateNumber(date.getMonth() + 1);

  return `${day}.${month}.${date.getFullYear()} ${hour}:${min}`;
};
