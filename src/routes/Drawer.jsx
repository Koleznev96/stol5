import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

import DrawerLayout from '../components/Drawer';
import Stacks from './Stacks';

import { onCheckAllDataAndNetwork } from '../store/actions/allData';

const Drawers = ({ isLoadedData }) => {
  useEffect(() => {
    onCheckAllDataAndNetwork();
  }, [isLoadedData]);

  return (
    <Drawer.Navigator
      initialRouteName='MainPage'
      screenOptions={{ swipeEnabled: false }}
      drawerContent={({ navigation }) => (
        <DrawerLayout navigation={navigation} />
      )}
    >
      <>
        <Drawer.Screen
          // options={{}}
          options={{
            headerShown: false,
          }}
          name='Stacks'
          component={Stacks}
        />
      </>
    </Drawer.Navigator>
  );
};

const mapStateToProps = ({ allData: { isLoadedData } }) => ({ isLoadedData });

const mapDispatchToProps = (dispatchEvent) => ({
  onCheckAllDataAndNetwork: () => dispatchEvent(onCheckAllDataAndNetwork()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Drawers);
