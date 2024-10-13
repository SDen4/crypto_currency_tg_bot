import axios from 'axios';

import { bfUrl } from '../../token.js';

export const getChatCurValue = (textInner) => {
  const text = textInner[0] === '/' ? textInner : `/${textInner}`;
  const queryParams = `t${text.toLocaleUpperCase().slice(1, -10)}`;

  return axios
    .get(`${bfUrl}/ticker/${queryParams}`)
    .then((response) => response.data[0])
    .catch((error) => console.log(error));
};
