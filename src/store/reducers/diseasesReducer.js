import * as constant from '../constants';

const initialState = {
  diseasesList: [],
  loadingDiseasesList: false,
};

const diseasesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case constant.GET_DISEASES_LIST:
      return {
        ...state,
        diseasesList: payload,
      };
    case constant.LOADING_DISEASES_LIST:
      return {
        ...state,
        loadingDiseasesList: payload,
      };
    default:
      return state;
  }
};

export default diseasesReducer;
