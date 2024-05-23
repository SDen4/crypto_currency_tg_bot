import axios from 'axios';

import { formatNumber } from '../utils/formatNumber.js';
import { bfUrl } from '../../token.js';

export const getChatCurValue = (textInner) => {
  const text = textInner[0] === '/' ? textInner : `/${textInner}`;
  const queryParams = `t${text.toLocaleUpperCase().slice(1, -10)}`;

  return axios
    .get(`${bfUrl}/ticker/${queryParams}`)
    .then((response) => response.data[0]);
};
