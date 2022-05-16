import axios from './axios';

export const getTable5CategoriesReq = async () => {
  return await axios.get('/stol5_categories');
};

export const getTable5InfoByIdReq = async (id) => {
  return await axios.get(`/stol5_categories/?category_id=${id}`);
};
