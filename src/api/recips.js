import axios from './axios';

export const getCategoriesRecipsListReq = async () => {
  return await axios.get('/recipe_categories');
};

export const getRecipsListReq = async (id, page = 1) => {
  return await axios.get(`/recipe_categories/?category_id=${id}&page=${page}`);
};

export const getRecipByIdReq = async (id) => {
  return await axios.get(`/recipes/?recipe_id=${id}`);
};

export const searchRecipesReq = async (term, page = 1) => {
  return await axios.get(`/recipes/search/?query=${term}&page=${page}`);
};

export const searchAllowedProductsReq = async (term) => {
  return await axios.get(`/stol5_categories/search/?query=${term}`);
};
