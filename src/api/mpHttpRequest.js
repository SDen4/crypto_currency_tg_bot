import axios from 'axios';

import { mpCurBlockUrl, mpHashUrl, mpLastBlock } from '../../token.js';

export const mpCurBlockRequest = () =>
  axios.get(mpCurBlockUrl).then((r) => r.data);

export const mpHashRequest = () => axios.get(mpHashUrl).then((r) => r.data);

export const mpLastBlockRequest = (hash) =>
  axios.get(`${mpLastBlock}${hash}`).then((r) => r.data);
