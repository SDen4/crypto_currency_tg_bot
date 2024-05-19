import axios from 'axios';
import { statUrl } from '../../token.js';

export const postMsg = async (newUser) => {
  return await axios
    .post(`${statUrl}visits.json`, newUser)
    .then((response) => response);
};
