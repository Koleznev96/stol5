import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import MainPage from '../pages/MainPage';
import Table5Page from '../pages/Table5Page';
import AboutLiverPage from '../pages/AboutLiverPage';
import AlarmPage from '../pages/AlarmPage';
import HowTreatPage from '../pages/HowTreatPage';
import LiverDiseasePage from '../pages/LiverDiseasePage';
import MenuWeekPage from '../pages/MenuWeekPage';
import RecipsTable5Page from '../pages/RecipsTable5Page';
import FavoritesPage from '../pages/FavoritesPage';
import LegalInfoPage from '../pages/LegalInfoPage';
import AlarmInstructionPage from '../pages/AlarmInstructionPage';
// details
import Table5InfoPage from '../pages/DetailsPages/Table5InfoPage';
import ResipsTable5CatalogPage from '../pages/ResipsTable5CatalogPage';
import ResipsTable5ItemPage from '../pages/DetailsPages/ResipsTable5ItemPage';
import ArticlePage from '../pages/ArticlePage';

import {
  getAllData,
  onCheckAllDataAndNetwork,
  getDeviceType,
} from '../store/actions/allData';
import SpinnerFw from '../components/SpinnerFw';

const screens = [
  {
    name: 'MainPage',
    component: MainPage,
  },
  { name: 'Table5Page', component: Table5Page },
  { name: 'AboutLiverPage', component: AboutLiverPage },
  { name: 'AlarmPage', component: AlarmPage },
  { name: 'HowTreatPage', component: HowTreatPage },
  { name: 'LiverDiseasePage', component: LiverDiseasePage },
  { name: 'MenuWeekPage', component: MenuWeekPage },
  { name: 'RecipsTable5Page', component: RecipsTable5Page },
  { name: 'Table5InfoPage', component: Table5InfoPage },
  { name: 'ResipsTable5CatalogPage', component: ResipsTable5CatalogPage },
  { name: 'ResipsTable5ItemPage', component: ResipsTable5ItemPage },
  { name: 'ArticlePage', component: ArticlePage },
  { name: 'FavoritesPage', component: FavoritesPage },
  { name: 'LegalInfoPage', component: LegalInfoPage },
  { name: 'AlarmInstructionPage', component: AlarmInstructionPage },
  // { name: 'ыфвавыфа', component: AboutLiverPage },
];
const Stacks = ({
  onCheckAllDataAndNetwork,
  isCheckLoadingAllData,
  isLoadedData,
  getDeviceType,
}) => {
  useEffect(() => {
    getDeviceType();
  }, []);

  useEffect(() => {
    onCheckAllDataAndNetwork();
  }, [isLoadedData]);

  if (isCheckLoadingAllData) {
    return <SpinnerFw />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: '#fff',
        },
      }}
    >
      {screens.map(({ component, name }) => (
        <Stack.Screen key={name} name={name} component={component} />
      ))}
    </Stack.Navigator>
  );
};

const mapStateToProps = ({
  allData: { isCheckLoadingAllData, isLoadedData },
}) => ({
  isCheckLoadingAllData,
  isLoadedData,
});

const mapDispatchToProps = (dispatch) => ({
  getAllData: () => dispatch(getAllData()),
  onCheckAllDataAndNetwork: () => dispatch(onCheckAllDataAndNetwork()),
  getDeviceType: () => dispatch(getDeviceType()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Stacks);
