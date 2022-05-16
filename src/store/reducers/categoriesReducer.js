import * as constant from '../constants';

const initialState = {
  categoriesList: [],
  loadingCategoriesList: false,
};

const categoriesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case constant.GET_CATEGORIES_LIST:
      return {
        ...state,
        categoriesList: payload,
      };
    case constant.LOADING_CATEGORIES_LIST:
      return {
        ...state,
        loadingCategoriesList: payload,
      };
    default:
      return state;
  }
};

export default categoriesReducer;
