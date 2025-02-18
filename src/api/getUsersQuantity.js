import axios from 'axios';
import { statUrl } from '../../token.js';

export const getUsersQuantity = async () => {
  return await axios
    .get(`${statUrl}users.json`)
    .then((response) => Object.keys(response?.data)?.length)
    .catch((error) => console.log(error));
};
