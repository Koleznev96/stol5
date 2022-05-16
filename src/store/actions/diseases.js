import * as constant from '../constants';
import { onDs } from './utils';
import { getDiseaseListReq } from '../../api/diseases';

export const getDiseaseList = () => {
  const loading = constant.LOADING_DISEASES_LIST;

  return async (dispatch) => {
    dispatch(onDs(loading, true));
    try {
      const {
        data: { categories },
      } = await getDiseaseListReq();

      dispatch(onDs(constant.GET_DISEASES_LIST, categories));
    } finally {
      dispatch(onDs(loading, false));
    }
  };
};
