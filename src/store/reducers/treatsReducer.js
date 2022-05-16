import * as constant from '../constants';

const initialState = {
  treatsList: [],
  loadingTreatsList: false,
};

const treatsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case constant.GET_TREATS_LIST:
      return {
        ...state,
        treatsList: payload,
      };
    case constant.LOADING_TREATS_LIST:
      return {
        ...state,
        loadingTreatsList: payload,
      };
    default:
      return state;
  }
};

export default treatsReducer;
