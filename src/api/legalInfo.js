import axios from './axios';

export const getLegalInfoListReq = async () => {
  return await axios.get('/pravovaya_informacziya/');
};
