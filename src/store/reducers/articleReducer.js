import * as constant from '../constants';

const initialState = {
  curArticle: {},
  loadingCurArticle: false,
};

const articleReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case constant.GET_CUR_ARTICLE:
      return {
        ...state,
        curArticle: payload,
      };
    case constant.LOADING_CUR_ARTICLE:
      return {
        ...state,
        loadingCurArticle: payload,
      };
    default:
      return state;
  }
};

export default articleReducer;
