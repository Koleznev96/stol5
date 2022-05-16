import axios from './axios';

export const getCurArticleReq = async (id) => {
  return await axios.get(`/articles/?article_id=${id}`);
};
