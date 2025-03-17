export const generateMessageId = (updates) => {
  return (
    updates?.[0]?.callback_query?.message?.message_id ||
    updates?.[0]?.message?.message_id
  );
};
