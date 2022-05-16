import { combineReducers } from 'redux';

import categoriesReducer from './categoriesReducer';
import table5Reducer from './table5Reducer';
import recipsReducer from './recipsReducer';
import menuWeekReducer from './menuWeekReducer';
import liverArticlesReducer from './liverArticlesReducer';
import treatsReducer from './treatsReducer';
import articleReducer from './articleReducer';
import diseasesReducer from './diseasesReducer';
import allDataReducer from './allDataReducer';
import legalInfoReducer from './legalInfoReducer';

export default combineReducers({
  categories: categoriesReducer,
  table5: table5Reducer,
  recips: recipsReducer,
  menuWeek: menuWeekReducer,
  liverArticles: liverArticlesReducer,
  treats: treatsReducer,
  article: articleReducer,
  diseases: diseasesReducer,
  allData: allDataReducer,
  legalInfo: legalInfoReducer,
});
