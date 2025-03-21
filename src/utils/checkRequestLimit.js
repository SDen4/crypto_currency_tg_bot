const requestLimits = {};
const REQUEST_LIMIT = 1;
const TIME_FRAME = 1000; // ms

export const checkRequestLimit = (chatId) => {
  const currentTime = Date.now();

  if (!requestLimits[chatId]) {
    requestLimits[chatId] = { count: 0, firstRequestTime: currentTime };
  }

  const userRequests = requestLimits[chatId];

  if (currentTime - userRequests.firstRequestTime > TIME_FRAME) {
    userRequests.count = 0;
    userRequests.firstRequestTime = currentTime;
  }

  userRequests.count++;

  if (userRequests.count > REQUEST_LIMIT) return false;

  return true;
};
