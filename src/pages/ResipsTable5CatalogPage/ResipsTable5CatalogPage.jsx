import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import { useFocusEffect } from '@react-navigation/core';

import { Box, FlatList } from 'native-base';

import LinearButton from '../../components/LinearButton';

import MainHeader from '../../components/MainHeader';
import SpinnerFw from '../../components/SpinnerFw';
import RecipItem from '../../components/RecipItem';

import { getRecipsList, loadMoreRecips } from '../../store/actions/recips';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ResipsTable5CatalogPage = ({
  route,
  getRecipsList,
  recipsList,
  loadingRecipsList,
  loadMoreRecips,
  isLoadedData,
  isMobileDevice,
}) => {
  const navigation = useNavigation();
  const { id } = route.params;
  const [page, setPage] = useState(1);
  const [hasFavorites, setHasFavorites] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log('99999-', id)

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const as = await AsyncStorage.getItem('@favorites');
        !JSON.parse(as)?.length
          ? setHasFavorites(false)
          : setHasFavorites(true);
      })();
    }, [])
  );

  useEffect(() => {
    if (id && !isLoadedData) {
      getRecipsList(id);
    } else if (id && isLoadedData) {
      const a = recipsList.filter((el) => +el.id === +id);
      setRecipes(a[0]?.recipes);
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading || loadingRecipsList) {
    return <SpinnerFw />;
  }

  const onPushToLink = (link, id) => {
    navigation.navigate(link, { id });
  };

  const renderItem = ({ item }) => (
    <RecipItem
      key={item.id}
      onPushToLink={() => onPushToLink('ResipsTable5ItemPage', item.id)}
      el={item}
    />
  );

  const loadMoreData = () => {
    const nextPage = page + 1;

    loadMoreRecips(id, nextPage);
    setPage(nextPage);
  };

  return (
    <>
      <Box flex={1}>
        <MainHeader isSearchByRecips={true} />
        <FlatList
          contentContainerStyle={{
            marginTop: 12,
            paddingHorizontal: 12,
          }}
          columnWrapperStyle={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
          showsVerticalScrollIndicator={false}
          numColumns={isMobileDevice ? 2 : 4}
          data={isLoadedData ? recipes : recipsList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onEndReached={!isLoadedData ? loadMoreData : null}
        />
      </Box>
      {hasFavorites && (
        <LinearButton
          actionFn={() => onPushToLink('FavoritesPage')}
          label={'ИЗБРАННЫЕ РЕЦЕПТЫ'}
          width={'100%'}
          borderRadius={0}
          style={{
            width: '100%',
            position: 'absolute',
            bottom: 0,
            height: 48,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      )}
    </>
  );
};

const mapStateToProps = ({
  recips: { recipsList, loadingRecipsList },
  allData: { isLoadedData, isMobileDevice },
}) => {
  return { recipsList, loadingRecipsList, isLoadedData, isMobileDevice };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRecipsList: (id) => dispatch(getRecipsList(id)),
    loadMoreRecips: (id, page) => dispatch(loadMoreRecips(id, page)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResipsTable5CatalogPage);
