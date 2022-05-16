import * as constant from '../constants';

const initialState = {
  menuWeekList: [],
  loadingMenuWeek: false,
};

const menuWeekReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case constant.GET_MENU_WEEK_LIST:
      return {
        ...state,
        menuWeekList: payload,
      };
    case constant.LOADING_MENU_WEEK_LIST:
      return {
        ...state,
        loadingMenuWeek: payload,
      };
    default:
      return state;
  }
};

export default menuWeekReducer;
