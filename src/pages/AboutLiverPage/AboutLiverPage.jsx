import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/core';

import { Box, Flex, ScrollView } from 'native-base';
import MainHeader from '../../components/MainHeader/MainHeader';

import { getLiverArticleList } from '../../store/actions/liverArticles';
import SpinnerFw from '../../components/SpinnerFw';

import CategoryItem from '../../components/CategoryItem/CategoryItem';

const LiverDiseasePage = ({
  getLiverArticleList,
  liverArticlesList,
  loadingLiverArticlesList,
  isLoadedData,
}) => {
  const navigation = useNavigation();

  useEffect(() => {
    if (!isLoadedData) {
      getLiverArticleList();
    }
  }, [getLiverArticleList, isLoadedData]);

  if (loadingLiverArticlesList) {
    return <SpinnerFw />;
  }

  const onPushToLink = (id) => {
    navigation.navigate('ArticlePage', { id });
  };

  return (
    <Box flex={1}>
      <MainHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Flex
          direction='row'
          align='center'
          justify='space-between'
          wrap='wrap'
          pt={0}
        >
          {liverArticlesList.length
            ? liverArticlesList.map((el) => (
                <CategoryItem
                  key={el.id}
                  el={el}
                  actionFn={() => onPushToLink(el.id)}
                />
              ))
            : null}
        </Flex>
      </ScrollView>
    </Box>
  );
};

const mapStateToProps = ({
  liverArticles: { liverArticlesList, loadingLiverArticlesList },
  allData: { isLoadedData },
}) => {
  return { liverArticlesList, loadingLiverArticlesList, isLoadedData };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getLiverArticleList: () => dispatch(getLiverArticleList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LiverDiseasePage);
