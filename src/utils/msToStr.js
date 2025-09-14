import { formatDateNumber } from './formatDateNumber.js';

const msInHour = 3600000;
const msInMin = 60000;
const msInSec = 1000;

export const msToStr = (ms) => {
  const hour = formatDateNumber(Math.floor(ms / msInHour));
  const min = formatDateNumber(Math.floor((ms - hour * msInHour) / msInMin));
  const sec = formatDateNumber(
    Math.floor((ms - hour * msInHour - min * msInMin) / msInSec),
  );

  return `${hour}:${min}:${sec}`;
};
