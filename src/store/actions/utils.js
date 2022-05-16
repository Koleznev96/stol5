import AsyncStorage from '@react-native-async-storage/async-storage';

export const onDs = (type, payload) => ({ type, payload });

export const getDataFromStorage = async (field) => {
  const data = await AsyncStorage.getItem(field);

  return JSON.parse(data);
};

export const parseCategoriesList = (categories) => {
  return categories.map((el) => {
    switch (+el.id) {
      case 0:
        return { ...el, path: 'Table5Page' };
      case 1:
        return {
          ...el,
          path: 'RecipsTable5Page',
        };
      case 2:
        return {
          ...el,
          path: 'MenuWeekPage',
        };
      case 3:
        return {
          ...el,
          path: 'ArticlePage',
          _id: 210,
        };
      case 4:
        return {
          ...el,
          path: 'AboutLiverPage',
        };
      case 5:
        return {
          ...el,
          path: 'HowTreatPage',
        };
      case 6:
        return {
          ...el,
          path: 'LiverDiseasePage',
        };
      case 7:
        return {
          ...el,
          path: 'AlarmPage',
        };
      case 8:
        return {
          ...el,
          path: 'LegalInfoPage',
        };
      default:
        return el;
    }
  });
};

export const sortWeekByWeekDays = (days) => {
  return days
    .map((el) => {
      switch (el.title.toLowerCase()) {
        case 'понедельник':
          return {
            ...el,
            sortId: 0,
          };
        case 'вторник':
          return {
            ...el,
            sortId: 1,
          };
        case 'среда':
          return {
            ...el,
            sortId: 2,
          };
        case 'четверг':
          return {
            ...el,
            sortId: 3,
          };
        case 'пятница':
          return {
            ...el,
            sortId: 4,
          };
        case 'суббота':
          return {
            ...el,
            sortId: 5,
          };
        case 'воскресенье':
          return {
            ...el,
            sortId: 6,
          };
        default:
          return el;
      }
    })
    .sort((a, b) => b.sortId < a.sortId);
};
