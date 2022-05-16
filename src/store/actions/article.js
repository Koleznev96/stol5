import * as constant from '../constants';
import { onDs } from './utils';
import { getCurArticleReq } from '../../api/article';

export const getCurArticle = (id) => {
  const loading = constant.LOADING_CUR_ARTICLE;

  return async (dispatch) => {
    dispatch(onDs(loading, true));
    try {
      const { data } = await getCurArticleReq(id);

      dispatch(onDs(constant.GET_CUR_ARTICLE, data));
    } finally {
      dispatch(onDs(loading, false));
    }
  };
};

export const updateCurArticle = (payload) => ({
  type: constant.GET_CUR_ARTICLE,
  payload,
});
