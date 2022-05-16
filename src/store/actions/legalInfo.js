import * as constant from '../constants';
import { onDs } from './utils';
import { getLegalInfoListReq } from '../../api/legalInfo';

export const getLegalInfoList = () => {
  const loading = constant.LOADING_LEGAL_INFO_LIST;

  return async (dispatch) => {
    dispatch(onDs(loading, true));
    try {
      const {
        data: { links },
      } = await getLegalInfoListReq();

      dispatch(onDs(constant.GET_LEGAL_INFO_LIST, links));
    } finally {
      dispatch(onDs(loading, false));
    }
  };
};
