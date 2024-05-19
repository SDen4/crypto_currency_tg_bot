import axios from 'axios';
import { statUrl } from '../../token.js';

export const getUsers = async () => {
  return await axios.get(`${statUrl}users.json`).then((response) => response);
};
