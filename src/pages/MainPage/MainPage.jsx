import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/core';

import { Box, Flex, ScrollView } from 'native-base';
import MainHeader from '../../components/MainHeader/MainHeader';

import { getCategoriesList } from '../../store/actions/categories';
import SpinnerFw from '../../components/SpinnerFw';
import CategoryItem from '../../components/CategoryItem/CategoryItem';

const MainPage = ({
  loadingCategoriesList,
  categoriesList,
  getCategoriesList,
  isLoadedData,
}) => {
  const navigation = useNavigation();

  console.log('===. ', categoriesList)

  useEffect(() => {
    if (!isLoadedData) {
      getCategoriesList();
    }
  }, [getCategoriesList, isLoadedData]);

  if (loadingCategoriesList) {
    return <SpinnerFw />;
  }

  const onPushToLink = (link, id) => {
    navigation.navigate(link, { id });
  };

  return (
    <Box flex={1}>
      <MainHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box>
          <Flex direction='row' justify='space-between' wrap='wrap'>
            {categoriesList.length
              ? categoriesList.map((el) => (
                  <CategoryItem
                    key={el.id}
                    el={el}
                    actionFn={() => onPushToLink(el.path, el._id)}
                  />
                ))
              : null}
              {/* <CategoryItem
                key={'666'}
                el={el}
                actionFn={() => onPushToLink(el.path, el._id)}
              /> */}
          </Flex>
        </Box>
      </ScrollView>
    </Box>
  );
};

const mapStateToProps = ({
  categories: { categoriesList, loadingCategoriesList },
  allData: { isLoadedData },
}) => {
  return {
    categoriesList,
    loadingCategoriesList,
    isLoadedData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCategoriesList: () => dispatch(getCategoriesList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
