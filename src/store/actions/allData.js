import * as constant from '../constants';
import { getAllDataReq, getAllDataArticlesReq } from '../../api/allData';
import { onDs, parseCategoriesList } from './utils';

import { imgPath } from '../../resourses/variables';

import { Promise } from 'bluebird';
import shorthash from 'shorthash';
import * as Network from 'expo-network';
import * as FS from 'expo-file-system';

import { onAlert } from '../../resourses/onAlert';
import { getDeviceTypeAsync } from 'expo-device';

const path = `${FS.documentDirectory}ALL_DATA`;

const cacheImage = async (uriIcon) => {
  if (!uriIcon) return '';

  try {
    const uri = encodeURI(imgPath + uriIcon),
      name = shorthash.unique(uri),
      path = `${FS.documentDirectory}${name}`,
      image = await FS.getInfoAsync(path);

    if (image.exists) return image.uri;

    const newImage = await FS.downloadAsync(uri, path);
    return newImage.uri;
  } catch (e) {
    console.log('eeerrrr', e);
  }
};

const cacheArticlesImages = async (str) => {
  try {
    const extract = ([beg, end]) => {
      const matcher = new RegExp(`${beg}(.*?)${end}`, 'gm');
      const normalise = (str) => str.slice(beg.length, end.length * -1);

      return function (str) {
        return str.match(matcher).map(normalise);
      };
    };

    const stringExtractor = extract(['src="', '"']);
    const stuffIneed = stringExtractor(str);
    let string = str;

    if (!stuffIneed.length) return string;

    const cachedImages = await Promise.all(
      stuffIneed.map(async (el) => await cacheImage(el))
    );

    stuffIneed.forEach((el, i) => {
      string = string.replace(el, cachedImages[i]);
    });

    return string;
  } catch (e) {
    console.log('error', e);
    throw new Error();
  }
};

export const getAllData = () => {
  const mainCatType = constant.GET_CATEGORIES_LIST,
    table5CatType = constant.GET_TABLE5_CATEGORIES,
    menuWeekListType = constant.GET_MENU_WEEK_LIST,
    diseasesListType = constant.GET_DISEASES_LIST,
    treatsListType = constant.GET_TREATS_LIST,
    liverListType = constant.GET_LIVER_ARTICLES_LIST,
    resipsCategoriesType = constant.GET_CATEGORIES_RECIPS_LIST,
    resipesListType = constant.GET_RECIPS_LIST,
    resipesWithDetailsListType = constant.GET_ALL_DATA_RECIPES_WITH_DETAILS,
    table5CanEatType = constant.GET_ALL_DATA_CAN_EAT_LIST,
    allArticlesListType = constant.GET_ALL_DATA_ARTICLES_LIST,
    allSearchAllowerRecipsType = constant.GET_ALL_DATA_SEARCH_CAN_EAT_LIST,
    legalInfoListType = constant.GET_LEGAL_INFO_LIST,
    loading = constant.LOADING_ALL_DATA;

  return async (dispatch) => {
    dispatch(onDs(loading, true));
    try {
      const { data } = await getAllDataReq();
      const {
        data: { all_text_resources },
      } = await getAllDataArticlesReq();

      // const allArticles = await Promise.all(
      //   all_text_resources.map(async (el) => {
      //     const content = await cacheArticlesImages(el.content);

      //     return {
      //       ...el,
      //       content,
      //     };
      //   })
      // );

      // console.log('DATA', allArticles);
      // console.log(allArticles.length);

      // mainPageCategories
      let mainCategories = await Promise.map(
        data.main_page.content,
        async (el) => ({
          ...el,
          icon: await cacheImage(el.icon),
        })
      );

      mainCategories = parseCategoriesList(mainCategories);
      // table5CategoriesList
      const table5CategoriesList = await Promise.map(
        data.mn_all_categories.categories,
        async (el) => ({
          ...el,
          icon: await cacheImage(el.icon),
        })
      );

      // table5InfoPageItems
      let table5ItemsObj = [];
      for (const key in data.mn_each_category) {
        table5ItemsObj.push({ id: key, ...data.mn_each_category[key] });
      }

      const allowedProducts = [],
        forbiddenProducts = [];
      let idx = 0;

      table5ItemsObj = await Promise.map(table5ItemsObj, async (el) => {
        el.allowed.forEach((al) => {
          allowedProducts.push({ allowed: true, title: al, id: idx++ });
        });
        el.forbidden.forEach((fr) => {
          forbiddenProducts.push({ allowed: false, title: fr, id: idx++ });
        });
        return {
          ...el,
          icon_allowed: await cacheImage(el.icon_allowed),
          icon_forbidden: await cacheImage(el.icon_forbidden),
        };
      });

      const allowedSearchList = [...allowedProducts, ...forbiddenProducts];

      // recipsCategories

      const recipesCategoriesList = await Promise.map(
        data.recipe_categories.categories.slice(14),
        async (el) => ({
          ...el,
          icon: await cacheImage(el.icon),
        })
      );

      // categories with recipes
      let categoriesWithRecips = [];
      for (const key in data.categories_whith_recipes) {
        categoriesWithRecips.push({
          id: key,
          ...data.categories_whith_recipes[key],
        });
      }

      categoriesWithRecips = await Promise.map(
        categoriesWithRecips,
        async (el) => ({
          ...el,
          recipes: await Promise.map(el.recipes, async (recip) => ({
            ...recip,
            image: await cacheImage(recip.image),
          })),
        })
      );

      // eachRecipes
      const eachRecipes = await Promise.all(
        data.each_recipe.map(async (el) => ({
          ...el,
          image: await cacheImage(el.image),
        }))
      );

      // // menuWeek
      const weekMenuList = await Promise.all(
        data.week_menu.days_of_week.map(async (el) => ({
          ...el,
          meals: await Promise.all(
            el?.meals?.map(async (meal) => ({
              ...meal,
              image: await cacheImage(meal.image),
            }))
          ),
        }))
      );

      // diseasesPageList
      const diseasesList = data.bolezny.categories;
      // HOW TREATS
      const treatsList = await Promise.all(
        data.how_heal.articles.map(async (el) => ({
          ...el,
          icon: await cacheImage(el.icon),
        }))
      );
      // aboutLiverCategories
      const aboutLiverList = await Promise.all(
        data.about_liver.articles.map(async (el) => ({
          ...el,
          icon: await cacheImage(el.icon),
        }))
      );
      // legalInfoList
      const legalInfoList = await Promise.all(
        data.prav_info.links.map(async (el) => ({
          ...el,
          icon: await cacheImage(el.icon),
        }))
      );

      const allData = [
        { data: mainCategories, type: mainCatType },
        { data: table5CategoriesList, type: table5CatType },
        { data: weekMenuList, type: menuWeekListType },
        { data: diseasesList, type: diseasesListType },
        { data: treatsList, type: treatsListType },
        { data: aboutLiverList, type: liverListType },
        { data: recipesCategoriesList, type: resipsCategoriesType },
        { data: categoriesWithRecips, type: resipesListType },
        { data: eachRecipes, type: resipesWithDetailsListType },
        { data: table5ItemsObj, type: table5CanEatType },
        { data: all_text_resources, type: allArticlesListType },
        {
          data: { list: allowedSearchList, term: '' },
          type: allSearchAllowerRecipsType,
        },
        { data: legalInfoList, type: legalInfoListType },
      ];

      await FS.writeAsStringAsync(path, JSON.stringify(allData));
      onAlert('Данные успешно загружены!');
    } catch (e) {
      onAlert('Ошибка при загрузке данных! Попробуйте снова позже!');
      console.log('e', e);
    } finally {
      dispatch(onDs(loading, false));
    }
  };
};

export const onCheckAllDataAndNetwork = () => {
  const loading = constant.CHECK_LOADING_ALL_DATA;

  return async (dispatch) => {
    dispatch(onDs(loading, true));
    try {
      const { isInternetReachable } = await Network.getNetworkStateAsync(),
        { exists, uri } = await FS.getInfoAsync(path),
        existConnection = !isInternetReachable && exists;

      //
      if (existConnection) {
        const data = await FS.readAsStringAsync(uri),
          allData = JSON.parse(data);

        allData.forEach((el) => {
          dispatch(onDs(el.type, el.data));
        });

        dispatch(onDs(constant.IS_LOADED_DATA, true));
      } else {
        dispatch(onDs(constant.IS_LOADED_DATA, false));
      }
    } catch (e) {
      console.log('load all adata error', e);
      const { exists, uri } = await FS.getInfoAsync(path);

      if (exists) {
        const data = await FS.readAsStringAsync(uri);
        const allData = JSON.parse(data);

        allData.forEach((el) => {
          dispatch(onDs(el.type, el.data));
        });
        dispatch(onDs(constant.IS_LOADED_DATA, true));
      } else {
        dispatch(onDs(constant.IS_LOADED_DATA, false));
      }
    } finally {
      dispatch(onDs(loading, false));
    }
  };
};

export const getDeviceType = () => {
  return async (dispatch) => {
    const type = await getDeviceTypeAsync();

    dispatch(onDs(constant.SET_MOBILE_DEVICE, type === 2 ? false : true));
  };
};
