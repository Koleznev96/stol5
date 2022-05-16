import * as constant from '../constants';

const initialState = {
  isLoadedData: true,
  isCheckLoadingAllData: false,
  loadingAllData: false,
  allDataRecipesWithDetails: [],
  allDataCanEatList: [],
  allDataArticles: [],
  allDataCanEatSearchList: [],
  //
  isMobileDevice: true,
};

const allDataReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case constant.IS_LOADED_DATA:
      return {
        ...state,
        isLoadedData: payload,
      };
    case constant.CHECK_LOADING_ALL_DATA:
      return {
        ...state,
        isCheckLoadingAllData: payload,
      };
    case constant.LOADING_ALL_DATA:
      return {
        ...state,
        loadingAllData: payload,
      };
    case constant.GET_ALL_DATA_RECIPES_WITH_DETAILS:
      return {
        ...state,
        allDataRecipesWithDetails: payload,
      };
    case constant.GET_ALL_DATA_CAN_EAT_LIST:
      return {
        ...state,
        allDataCanEatList: payload,
      };
    case constant.GET_ALL_DATA_ARTICLES_LIST:
      return {
        ...state,
        allDataArticles: payload,
      };
    case constant.GET_ALL_DATA_SEARCH_CAN_EAT_LIST:
      return {
        ...state,
        allDataCanEatSearchList: payload,
      };
    case constant.SET_MOBILE_DEVICE:
      return {
        ...state,
        isMobileDevice: payload,
      };
    default:
      return state;
  }
};

export default allDataReducer;
