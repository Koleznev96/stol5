import * as constant from '../constants';

const initialState = {
  table5CategoriesList: [],
  loadingTable5CategoriesList: false,
  table5Info: {},
  loadingTable5Info: false,
};

const table5Reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case constant.GET_TABLE5_CATEGORIES:
      return {
        ...state,
        table5CategoriesList: payload,
      };
    case constant.LOADING_TABLE5_CATEGORIES:
      return {
        ...state,
        loadingTable5CategoriesList: payload,
      };

    case constant.GET_TABLE5_INFO_BY_ID:
      return {
        ...state,
        table5Info: payload,
      };
    case constant.LOADING_TABLE5_INFO_BY_ID:
      return {
        ...state,
        loadingTable5Info: payload,
      };
    default:
      return state;
  }
};

export default table5Reducer;
