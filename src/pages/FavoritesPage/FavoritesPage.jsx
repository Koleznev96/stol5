import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';

import { Box, ScrollView, Center, Flex, Text } from 'native-base';

import {TouchableOpacity, Dimensions} from 'react-native';

import MainHeader from '../../components/MainHeader';
import RecipItem from '../../components/RecipItem';

import AsyncStorage from '@react-native-async-storage/async-storage';
import SpinnerFw from '../../components/SpinnerFw';

import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';

import LinearButton from '../../components/LinearButton';
import { paddingLeft, paddingRight } from 'styled-system';

const { width } = Dimensions.get('window');

const FavoritesPage = () => {
  const navigation = useNavigation();
  const [favoritesList, setFavoritesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const list = await AsyncStorage.getItem('@favorites');
      !list ? setFavoritesList([]) : setFavoritesList(JSON.parse(list));
    })();
    setLoading(false);
  });

  if (loading) {
    return <SpinnerFw />;
  }

  const onPushToLink = (id) => {
    navigation.navigate('ResipsTable5ItemPage', { id });
  };

  const onPushToLinkFavorites = () => {
    navigation.navigate('RecipsTable5Page');
  };

  return (
    <Box flex={1}>
      <MainHeader />
      <ScrollView
      contentContainerStyle={{
        paddingLeft: 12, paddingRight: 12
      }}
      >
        <MaskedView
          style={{ height: 44, width: width - 28, marginTop: 10, }}
          maskElement={
            <Text
              w={width - 40}
              fontSize={18}
              fontWeight='500'
              color='red'
              numberOfLines={1}
              ellipsizeMode='tail'
            >
              Избранные рецепты
            </Text>
          }
        >
          <LinearGradient
            // start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 0.33 }}
            colors={['#F84784', '#7348FF']}
            style={{ flex: 1 }}
          />
        </MaskedView>
        {favoritesList.length ? (
          <Flex direction='row' wrap='wrap' justifyContent='space-between'>
            {favoritesList.map((el) => (
              <RecipItem
                onPushToLink={() => onPushToLink(el.id)}
                el={el}
                key={el.id}
              />
            ))}
          </Flex>
        ) : (
          <>
          <Center _text={{ fontSize: 18 }} >
            Пока что нет избранных рецептов.
          </Center>
          <TouchableOpacity
           onPress={() => onPushToLinkFavorites()}
          >
          <Center _text={{ fontSize: 18, color: '#274BCE', underline: {textDecorationLine: 'underline'} }} mt='12%'>
          <LinearButton
            actionFn={() => onPushToLinkFavorites()}
            label={'Перейти в раздел Рецепты '}
            // width={'90%'}
            // borderRadius={0}
            // style={{
            //   width: '100%',
            //   position: 'absolute',
            //   bottom: 0,
            //   height: 48,
            //   justifyContent: 'center',
            //   alignItems: 'center',
            // }}
          />
            
          </Center>
          </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </Box>
  );
};

export default FavoritesPage;
