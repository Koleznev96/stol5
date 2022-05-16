import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/core';

import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { Box, Text, FlatList, Image } from 'native-base';
import propStyles from '../../resourses/propStyles';

import { loadMoreSearchRecipesList } from '../../store/actions/recips';
import { imgPath } from '../../resourses/variables';

const { width, height } = Dimensions.get('window');

const RecipesSearchList = ({
  isShowSearchLayout,
  searchRecipList,
  searchTerm,
  loadMoreSearchRecipesList,
  isSearchByRecips,
  isLoadedData,
}) => {
  const navigation = useNavigation();
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  const loadMoreData = () => {
    loadMoreSearchRecipesList(searchTerm, page + 1);
    setPage(page + 1);
  };

  const onPushToLink = (id) => {
    navigation.navigate('ResipsTable5ItemPage', { id });
  };

  const recipeItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => onPushToLink(item.id)}
      style={styles.listItem}
    >
      <Box mr='14px'>
        <Image
          width={140}
          height={140}
          source={{
            uri: item.icon && !isLoadedData ? imgPath + item.icon : item.image,
          }}
          alt={item.title}
          borderRadius={9}
        />
      </Box>
      <Box width={width - 182}>
        <Text fontSize={18}>{item.title}</Text>
      </Box>
    </TouchableOpacity>
  );

  const productItem = ({ item }) => (
    <Box p='14px' style={styles.listItem}>
      <Box width={width - 28 - 12 - 70} pr={'8px'}>
        <Text>{item.title}</Text>
      </Box>
      <Box width={70}>
        {item.allowed ? (
          <Text fontSize={16} fontWeight='500' color='#00FF00'>
            МОЖНО
          </Text>
        ) : (
          <Text fontWeight='500' color='#FF0000'>
            НЕЛЬЗЯ
          </Text>
        )}
      </Box>
    </Box>
  );

  return (
    <>
      {isShowSearchLayout ? (
        <Box
          mb='20px'
          safeAreaBottom={false}
          bg={searchTerm.length ? '#fff' : propStyles.shadowColor}
          width={width}
          height={height - 120}
        >
          <Box mb='20px'>
            <FlatList
              data={searchRecipList}
              renderItem={isSearchByRecips ? recipeItem : productItem}
              keyExtractor={(_, i) => i}
              onEndReachedThreshold={0.9}
              onEndReached={() => {
                if (isSearchByRecips && !isLoadedData) {
                  loadMoreData();
                }
              }}
            />
          </Box>
        </Box>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: propStyles.shadowedColor,
  },
});

const mapStateToProps = ({
  recips: { isShowSearchLayout, searchRecipList, searchTerm },
  allData: { isLoadedData },
}) => {
  return {
    isShowSearchLayout,
    searchRecipList,
    searchTerm,
    isLoadedData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadMoreSearchRecipesList: (term, page) =>
      dispatch(loadMoreSearchRecipesList(term, page)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipesSearchList);
