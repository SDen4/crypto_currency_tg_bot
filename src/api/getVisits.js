import axios from 'axios';
import { statUrl } from '../../token.js';

export const getVisits = async () => {
  return await axios.get(`${statUrl}visits.json`).then((response) => response);
};
