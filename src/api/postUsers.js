import axios from 'axios';
import { statUrl } from '../../token.js';

export const postUsers = async (newUser) => {
  return await axios
    .post(`${statUrl}users.json`, newUser)
    .then((response) => response)
    .catch((error) => console.log(error));
};
