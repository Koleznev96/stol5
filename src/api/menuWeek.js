import axios from './axios';

export const getMenuWeekListReq = async () => {
  return await axios.get('/weekly_menu');
};
