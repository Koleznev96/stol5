import * as constant from '../constants';
import { onDs } from './utils';
import { getTable5CategoriesReq, getTable5InfoByIdReq } from '../../api/table5';

export const getTable5Categories = () => {
  const loading = constant.LOADING_TABLE5_CATEGORIES;

  return async (dispatch) => {
    dispatch(onDs(loading, true));
    try {
      const {
        data: { categories },
      } = await getTable5CategoriesReq();

      dispatch(onDs(constant.GET_TABLE5_CATEGORIES, categories));
    } finally {
      dispatch(onDs(loading, false));
    }
  };
};

export const getTable5InfoById = (id) => {
  const loading = constant.LOADING_TABLE5_INFO_BY_ID;

  return async (dispatch) => {
    dispatch(onDs(loading, true));
    try {
      const { data } = await getTable5InfoByIdReq(id);

      dispatch(onDs(constant.GET_TABLE5_INFO_BY_ID, data));
    } finally {
      dispatch(onDs(loading, false));
    }
  };
};

export const updateTable5InfoById = (payload) => ({
  type: constant.GET_TABLE5_INFO_BY_ID,
  payload,
});
