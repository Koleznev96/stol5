import * as constant from '../constants';
import { onDs } from './utils';
import { getTreatsReq } from '../../api/treats';

export const getTreats = () => {
  const loading = constant.LOADING_TREATS_LIST;

  return async (dispatch) => {
    dispatch(onDs(loading, true));
    try {
      const {
        data: { articles },
      } = await getTreatsReq();

      dispatch(onDs(constant.GET_TREATS_LIST, articles));
    } finally {
      dispatch(onDs(loading, false));
    }
  };
};
