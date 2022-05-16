import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/core';

import { Box, ScrollView, Flex, Text } from 'native-base';

import { getLegalInfoList } from '../../store/actions/legalInfo';
import MainHeader from '../../components/MainHeader';
import RecipItem from '../../components/RecipItem';
import SpinnerFw from '../../components/SpinnerFw';

const LegalInfoPage = ({
  getLegalInfoList,
  isLoadedData,
  legalInfoList,
  loadingLegalInfoList,
}) => {
  const navigation = useNavigation();

  useEffect(() => {
    if (!isLoadedData) {
      getLegalInfoList();
    }
  }, [isLoadedData]);

  if (loadingLegalInfoList) {
    return <SpinnerFw />;
  }

  const onPushToLink = (id) => {
    navigation.navigate('ArticlePage', { id });
  };

  return (
    <Box flex={1}>
      <MainHeader />
      <ScrollView>
        <Flex
          mt='8px'
          px='12px'
          direction='row'
          justify='space-between'
          align='center'
          wrap='wrap'
        >
          {legalInfoList.length ? (
            legalInfoList.map((el, i) => (
              <RecipItem
                onPushToLink={() => onPushToLink(el.id)}
                key={i}
                el={el}
                isIcon={true}
              />
            ))
          ) : (
            <Box w='100%' mt='14%'>
              <Text fontSize={18} textAlign='center'>
                Правовая информация пока пуста
              </Text>
            </Box>
          )}
        </Flex>
      </ScrollView>
    </Box>
  );
};

const mapStateToProps = ({
  legalInfo: { legalInfoList, loadingLegalInfoList },
  allData: { isLoadedData },
}) => ({
  legalInfoList,
  loadingLegalInfoList,
  isLoadedData,
});

const mapDispatchToProps = (dispatch) => ({
  getLegalInfoList: () => dispatch(getLegalInfoList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LegalInfoPage);
