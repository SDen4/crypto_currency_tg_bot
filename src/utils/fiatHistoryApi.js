const fiatHistoryApiUrl = process.env.FIAT_HISTORY_API_URL;
const fiatHistoryApiKey = process.env.FIAT_HISTORY_API_KEY;

export const fiatHistoryApi = (from, to) =>
  `${fiatHistoryApiUrl}${from}&to_symbol=${to}&apikey=${fiatHistoryApiKey}&outputsize=full`;
