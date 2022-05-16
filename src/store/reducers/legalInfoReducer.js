import * as constant from '../constants';

const initialState = {
  legalInfoList: [],
  loadingLegalInfoList: false,
};

const legalInfoReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case constant.GET_LEGAL_INFO_LIST:
      return {
        ...state,
        legalInfoList: payload,
      };
    case constant.LOADING_LEGAL_INFO_LIST:
      return {
        ...state,
        loadingLegalInfoList: payload,
      };
    default:
      return state;
  }
};

export default legalInfoReducer;
