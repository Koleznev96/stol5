import axios from './axios';

export const getDiseaseListReq = async () => {
  return await axios.get('/diseases');
};
