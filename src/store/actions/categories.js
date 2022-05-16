import * as constant from '../constants';
import { onDs } from './utils';
import { getCategoriesListReq } from '../../api/categories';
import { parseCategoriesList } from './utils';

export const getCategoriesList = () => {
  const loading = constant.LOADING_CATEGORIES_LIST;

  return async (dispatch) => {
    dispatch(onDs(loading, true));
    try {
      const {
        data: { content },
      } = await getCategoriesListReq();

      const categories = parseCategoriesList(content);

      dispatch(onDs(constant.GET_CATEGORIES_LIST, categories));
    } catch (e) {
      dispatch(onDs(constant.GET_CATEGORIES_LIST, []));
    } finally {
      dispatch(onDs(loading, false));
    }
  };
};
