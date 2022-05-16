import axios from './axios';

export const getLiverArticleListReq = async () => {
  return await axios.get('/about_the_liver');
};
