import axios from './axios';

export const getAllDataReq = async () => {
  return await axios.get('/req_all');
};

export const getAllDataArticlesReq = async () => {
  return await axios.get(
    'https://vseopecheni.ru/api/v1/get/app-content/all-text'
  );
};
