import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
// import {Text} from 'react-native';

import { Box, ScrollView, Flex, Center } from 'native-base';

import MainHeader from '../../components/MainHeader/MainHeader';
import SpinnerFw from '../../components/SpinnerFw';
import RecipItem from '../../components/RecipItem';
import LinearButton from '../../components/LinearButton';
import { getMenuWeekList } from '../../store/actions/menuWeek';

const MenuWeekPage = ({
  menuWeekList,
  loadingMenuWeek,
  getMenuWeekList,
  isLoadedData,
}) => {
  const navigation = useNavigation();
  const [selectedDays, setSelectedDays] = useState([]);

  useEffect(() => {
    if (!isLoadedData) {
      getMenuWeekList();
    }
  }, [getMenuWeekList, isLoadedData]);

  if (loadingMenuWeek) {
    return <SpinnerFw />;
  }

  const onSelectDay = (name) => {
    const idx = selectedDays.findIndex((el) => el === name);

    idx === -1
      ? setSelectedDays((prev) => [...prev, name])
      : setSelectedDays((prev) => [
          ...prev.slice(0, idx),
          ...prev.slice(idx + 1),
        ]);
  };

  const isShowDay = (name) => {
    return !!selectedDays.filter((el) => el === name).length;
  };

  const onPushToLink = (id) => {
    navigation.navigate('ResipsTable5ItemPage', { id });
  };

  return (
    <Box flex={1}>
      <MainHeader />
      <ScrollView>
        <Center>
          {/* <Text>sfdsafdasfds</Text> */}
          {menuWeekList.map((el) => (
            <Center my='10px' key={el.id}>
              <LinearButton
                actionFn={() => onSelectDay(el.title)}
                label={el.title}
              />
              {isShowDay(el.title) && (
                <Flex
                  p='12px'
                  direction='row'
                  justifyContent='space-between'
                  align='center'
                  wrap='wrap'
                >
                  {el.meals.map((meal, i) => (
                    <RecipItem onPushToLink={onPushToLink} key={i} el={meal} />
                  ))}
                </Flex>
              )}
            </Center>
          ))}
        </Center>
      </ScrollView>
    </Box>
  );
};

const mapStateToProps = ({
  menuWeek: { menuWeekList, loadingMenuWeek },
  allData: { isLoadedData },
}) => {
  return {
    menuWeekList,
    loadingMenuWeek,
    isLoadedData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMenuWeekList: () => dispatch(getMenuWeekList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuWeekPage);
