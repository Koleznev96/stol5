import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/core';

import { Flex, Box, ScrollView } from 'native-base';

import MainHeader from '../../components/MainHeader/MainHeader';
import SpinnerFw from '../../components/SpinnerFw';

import { getTreats } from '../../store/actions/treats';
import RecipItem from '../../components/RecipItem/RecipItem';

const HowTreatPage = ({
  getTreats,
  treatsList,
  loadingTreatsList,
  isLoadedData,
}) => {
  const navigation = useNavigation();

  useEffect(() => {
    if (!isLoadedData) {
      getTreats();
    }
  }, [getTreats, isLoadedData]);

  if (loadingTreatsList) {
    return <SpinnerFw />;
  }

  const onPushToLink = (id) => {
    navigation.navigate('ArticlePage', { id });
  };

  return (
    <Box flex={1}>
      <MainHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box>
          <Flex
            mt='6px'
            px='12px'
            direction='row'
            justify='space-between'
            align='center'
            wrap='wrap'
          >
            {treatsList.length
              ? treatsList.map((el, i) => (
                  <RecipItem
                    key={i}
                    el={el}
                    onPushToLink={onPushToLink}
                    isIcon={true}
                  />
                ))
              : null}
          </Flex>
        </Box>
      </ScrollView>
    </Box>
  );
};

const mapStateToProps = ({
  treats: { treatsList, loadingTreatsList },
  allData: { isLoadedData },
}) => {
  return { treatsList, loadingTreatsList, isLoadedData };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTreats: () => dispatch(getTreats()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HowTreatPage);
