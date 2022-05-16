import * as constant from '../constants';
import { onDs } from './utils';
import { getLiverArticleListReq } from '../../api/liverArticles';

export const getLiverArticleList = () => {
  const loading = constant.LOADING_LIVER_ARTICLES_LIST;

  return async (dispatch) => {
    dispatch(onDs(loading, true));
    try {
      const {
        data: { articles },
      } = await getLiverArticleListReq();

      dispatch(onDs(constant.GET_LIVER_ARTICLES_LIST, articles));
    } finally {
      dispatch(onDs(loading, false));
    }
  };
};
