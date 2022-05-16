import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { StatusBar } from 'expo-status-bar';
import { Box } from 'native-base';

import store from './src/store/store';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';

import Routes from './src/routes/Drawer';

import {
  registerForPushNotification,
  getAlarmsFromStorageAndCreate,
} from './src/resourses/alarmNotifications';

const App = () => {
  useEffect(() => {
    registerForPushNotification();
  }, []);

  // useEffect(() => {
  //   getAlarmsFromStorageAndCreate();
  // }, [getAlarmsFromStorageAndCreate]);

  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <StatusBar
            animated={true}
            backgroundColor='#fff'
            barStyle={'dark-content'}
            showHideTransition={'fade'}
          />
          <Box height='100%' safeAreaY>
            <Routes />
          </Box>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
