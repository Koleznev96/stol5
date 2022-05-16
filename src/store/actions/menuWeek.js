import * as constant from '../constants';
import { onDs, sortWeekByWeekDays } from './utils';
import { getMenuWeekListReq } from '../../api/menuWeek';

export const getMenuWeekList = () => {
  const loading = constant.LOADING_MENU_WEEK_LIST;

  return async (dispatch) => {
    dispatch(onDs(loading, true));
    try {
      const {
        data: { days_of_week },
      } = await getMenuWeekListReq();

      const menuWeek = sortWeekByWeekDays(days_of_week);

      dispatch(onDs(constant.GET_MENU_WEEK_LIST, menuWeek));
    } finally {
      dispatch(onDs(loading, false));
    }
  };
};
