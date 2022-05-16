import axios from './axios';

export const getTreatsReq = async () => {
  return await axios.get('/how_to_treat');
};
