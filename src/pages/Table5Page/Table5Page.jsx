import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/core';

import { TouchableOpacity } from 'react-native';
import { Box, Flex, ScrollView, Text } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

import MainHeader from '../../components/MainHeader/MainHeader';
import SpinnerFw from '../../components/SpinnerFw';
import CategoryItem from '../../components/CategoryItem/CategoryItem';

import { getTable5Categories } from '../../store/actions/table5';

const Table5Page = ({
  getTable5Categories,
  table5CategoriesList,
  loadingTable5CategoriesList,
  isLoadedData,
}) => {
  const navigation = useNavigation();

  useEffect(() => {
    if (!isLoadedData) {
      getTable5Categories();
    }
  }, [getTable5Categories, isLoadedData]);

  if (loadingTable5CategoriesList) {
    return <SpinnerFw />;
  }

  const onPushToLink = (id) => {
    navigation.navigate('Table5InfoPage', { id });
  };

  return (
    <Box flex={1}>
      <MainHeader />
      <ScrollView>
        <TouchableOpacity
          style={{
            padding: 16,
            paddingBottom: 0,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => navigation.navigate('ArticlePage', { id: 9044 })}
        >
          <Box mr={2}>
            <MaterialIcons name='error-outline' size={26} color='#E10100' />
          </Box>
          <Text textAlign='center' fontSize={17} fontWeight='500'>
            Сколько нужно съедать ежедневно »
          </Text>
        </TouchableOpacity>
        <Flex direction='row' justify='space-between' wrap='wrap'>
          {table5CategoriesList?.length
            ? table5CategoriesList.map((el) => (
                <CategoryItem
                  actionFn={() => onPushToLink(el.id)}
                  key={el.id}
                  el={el}
                />
              ))
            : null}
        </Flex>
      </ScrollView>
    </Box>
  );
};

const mapStateToProps = ({
  table5: { loadingTable5CategoriesList, table5CategoriesList },
  allData: { isLoadedData },
}) => {
  return { loadingTable5CategoriesList, table5CategoriesList, isLoadedData };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTable5Categories: () => dispatch(getTable5Categories()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Table5Page);
