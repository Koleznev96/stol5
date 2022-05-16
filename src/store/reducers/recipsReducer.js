import * as constant from '../constants';

const initialState = {
  recipsList: [],
  loadingRecipsList: false,
  recipsCategoryList: [],
  loadingRecipsCategoryList: false,
  recipById: {},
  loadingRecipById: false,
  //
  searchRecipList: [],
  loadingSearchList: false,
  isShowSearchLayout: false,
  searchTerm: '',
};

const recipsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case constant.GET_CATEGORIES_RECIPS_LIST:
      return {
        ...state,
        recipsCategoryList: payload,
      };
    case constant.LOADING_CATEGORIES_RECIPS_LIST:
      return {
        ...state,
        loadingRecipsCategoryList: payload,
      };
    case constant.GET_RECIPS_LIST:
      return {
        ...state,
        recipsList: payload,
      };
    case constant.LOADING_RECIPS_LIST:
      return {
        ...state,
        loadingRecipsList: payload,
      };
    case constant.GET_RECIP_BY_ID:
      return {
        ...state,
        recipById: payload,
      };
    case constant.LOADING_RECIP_BY_ID:
      return {
        ...state,
        loadingRecipById: payload,
      };
    // search
    case constant.GET_SEARCH_RECIPES_LIST:
      return {
        ...state,
        searchRecipList: payload.list,
        searchTerm: payload.term,
      };
    case constant.LOADING_SEARCH_RECIPES_LIST:
      return {
        ...state,
        loadingSearchList: payload,
      };
    case constant.SHOW_SEARCH_LAYOUT:
      return {
        ...state,
        isShowSearchLayout: payload,
      };

    default:
      return state;
  }
};

export default recipsReducer;
