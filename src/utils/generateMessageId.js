export const generateMessageId = (msg) =>
  msg?.message_id || msg?.message?.message_id;
