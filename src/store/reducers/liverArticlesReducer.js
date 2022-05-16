import * as constant from '../constants';

const initialState = {
  liverArticlesList: [],
  loadingLiverArticlesList: false,
};

const liverArticlesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case constant.GET_LIVER_ARTICLES_LIST:
      return {
        ...state,
        liverArticlesList: payload,
      };
    case constant.LOADING_LIVER_ARTICLES_LIST:
      return {
        ...state,
        loadingLiverArticlesList: payload,
      };
    default:
      return state;
  }
};

export default liverArticlesReducer;
