import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/core';

import { Box, FlatList } from 'native-base';

import MainHeader from '../../components/MainHeader/MainHeader';

import { getCategoriesRecipsList } from '../../store/actions/recips';
import SpinnerFw from '../../components/SpinnerFw';
import CategoryItem from '../../components/CategoryItem/CategoryItem';

const RecipsTable5Page = ({
  loadingRecipsCategoryList,
  recipsCategoryList,
  getCategoriesRecipsList,
  isLoadedData,
  isMobileDevice,
}) => {
  const navigation = useNavigation();

  useEffect(() => {
    if (!isLoadedData) {
      getCategoriesRecipsList();
    }
  }, [getCategoriesRecipsList, isLoadedData]);

  if (loadingRecipsCategoryList) {
    return <SpinnerFw />;
  }

  const onPushToLink = (id) => {
    navigation.navigate('ResipsTable5CatalogPage', { id });
  };

  const renderItem = ({ item }) => (
    <CategoryItem
      key={item.id}
      actionFn={() => onPushToLink(item.id)}
      el={item}
    />
  );

  return (
    <Box flex={1}>
      <MainHeader isSearchByRecips={true} />
      <FlatList
        showsVerticalScrollIndicator={false}
        // style={{ paddingHorizontal: 14 }}
        columnWrapperStyle={
          {
            // justifyContent: 'space-between',
          }
        }
        numColumns={isMobileDevice ? 2 : 4}
        data={recipsCategoryList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </Box>
  );
};

const mapStateToProps = ({
  recips: { loadingRecipsCategoryList, recipsCategoryList },
  allData: { isLoadedData, isMobileDevice },
}) => {
  return {
    loadingRecipsCategoryList,
    recipsCategoryList,
    isLoadedData,
    isMobileDevice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCategoriesRecipsList: () => dispatch(getCategoriesRecipsList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipsTable5Page);
