import * as constant from '../constants';
import { onDs } from './utils';
import {
  getCategoriesRecipsListReq,
  getRecipByIdReq,
  getRecipsListReq,
  searchRecipesReq,
  searchAllowedProductsReq,
} from '../../api/recips';

export const getCategoriesRecipsList = () => {
  const loading = constant.LOADING_CATEGORIES_RECIPS_LIST;

  return async (dispatch) => {
    dispatch(onDs(loading, true));
    try {
      const {
        data: { categories },
      } = await getCategoriesRecipsListReq();

      dispatch(onDs(constant.GET_CATEGORIES_RECIPS_LIST, categories));
    } finally {
      dispatch(onDs(loading, false));
    }
  };
};

export const getRecipsList = (id) => {
  const loading = constant.LOADING_RECIPS_LIST;

  return async (dispatch) => {
    dispatch(onDs(loading, true));
    try {
      const {
        data: { recipes },
      } = await getRecipsListReq(id);

      dispatch(onDs(constant.GET_RECIPS_LIST, recipes));
    } finally {
      dispatch(onDs(loading, false));
    }
  };
};

export const loadMoreRecips = (id, page) => {
  return async (dispatch, getState) => {
    try {
      const {
        data: { recipes },
      } = await getRecipsListReq(id, page);

      const prevRecipes = getState().recips.recipsList;
      if (recipes?.length) {
        dispatch(onDs(constant.GET_RECIPS_LIST, [...prevRecipes, ...recipes]));
      }
    } finally {
    }
  };
};

export const getRecipById = (id) => {
  const loading = constant.LOADING_RECIP_BY_ID;

  return async (dispatch) => {
    dispatch(onDs(loading, true));
    try {
      const { data } = await getRecipByIdReq(id);

      dispatch(onDs(constant.GET_RECIP_BY_ID, data));
    } finally {
      dispatch(onDs(loading, false));
    }
  };
};

export const updateRecipById = (payload) => ({
  type: constant.GET_RECIP_BY_ID,
  payload,
});

export const updateRecipesList = (payload) => ({
  type: constant.GET_RECIPS_LIST,
  payload,
});

// search
export const showSearchLayout = (bool) => ({
  type: constant.SHOW_SEARCH_LAYOUT,
  payload: bool,
});

export const updateSearchList = (list, term) => {
  return {
    type: constant.GET_SEARCH_RECIPES_LIST,
    payload: { list, term },
  };
};

export const loadMoreSearchRecipesList = (term, page) => {
  const loading = constant.LOADING_SEARCH_RECIPES_LIST;

  return async (dispatch, getState) => {
    dispatch(onDs(loading, true));
    try {
      const { data } = await searchRecipesReq(term, page);

      if (data.nothing_found) return dispatch(updateSearchList([], term));

      const prevSearch = getState().recips.searchRecipList;

      if (!term) {
        return updateSearchList([], '');
      }

      if (!data?.search_result?.length) {
        return updateSearchList([], term);
      }

      dispatch(
        updateSearchList(
          [
            ...prevSearch,
            ...(data.search_result?.length ? data.search_result : []),
          ],
          term
        )
      );
    } finally {
      dispatch(onDs(loading, false));
    }
  };
};

export const searchRecipes = (term) => {
  const loading = constant.LOADING_SEARCH_RECIPES_LIST;

  return async (dispatch) => {
    dispatch(onDs(loading, true));
    try {
      const { data } = await searchRecipesReq(term);

      if (data.nothing_found) return dispatch(updateSearchList([], term));

      if (!data?.search_result?.length) {
        return updateSearchList([], term);
      }

      dispatch(updateSearchList(data.search_result, term));
    } finally {
      dispatch(onDs(loading, false));
    }
  };
};

export const searchAllowedProducts = (term) => {
  const loading = constant.LOADING_SEARCH_RECIPES_LIST;

  return async (dispatch, getState) => {
    dispatch(onDs(loading, true));
    try {
      const isLoadedData = getState().allData.isLoadedData;

      if (isLoadedData) {
        const searchList =
          getState().allData?.allDataCanEatSearchList?.list.filter((el) =>
            el.title.toLowerCase().includes(term.toLowerCase())
          ) || [];

        dispatch(updateSearchList(searchList, term));
        return;
      }

      const { data } = await searchAllowedProductsReq(term);

      if (data.nothing_found) return dispatch(updateSearchList([], term));

      if (!data?.search_result?.length) {
        return dispatch(updateSearchList([], term));
      }

      dispatch(updateSearchList(data.search_result, term));
    } finally {
      dispatch(onDs(loading, false));
    }
  };
};
