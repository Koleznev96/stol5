import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';

import { Dimensions, TouchableOpacity } from 'react-native';
import { Box, Flex, ScrollView, Center, Image, Text } from 'native-base';
import { AntDesign } from '@expo/vector-icons';

import MainHeader from '../../../components/MainHeader';
import SpinnerFw from '../../../components/SpinnerFw';

import { getRecipById, updateRecipById } from '../../../store/actions/recips';
import { imgPath } from '../../../resourses/variables';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

import AutoHeightWebView from 'react-native-autoheight-webview';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

const InfoItem = ({ text }) => {
  return (
    <Box mb={4}>
      <Text color='#000' fontSize={16}>
        {'\u2022'} {text}
      </Text>
    </Box>
  );
};

const ResipsTable5ItemPage = ({
  getRecipById,
  route,
  recipById,
  loadingRecipById,
  isLoadedData,
  updateRecipById,
  allDataRecipesWithDetails,
}) => {
  const { id } = route.params;
  const [isFavorite, setFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useMemo(() => {
    return (async () => {
      const as = await AsyncStorage.getItem('@favorites');
      if (!as) return;

      const list = JSON.parse(as),
        isMatch = !!list.filter((el) => +el.id === +recipById.id).length;

      isMatch ? setFavorite(true) : setFavorite(false);
    })();
  }, [recipById]);

  useEffect(() => {
    setLoading(true);
    if (id && !isLoadedData) {
      getRecipById(id);
    } else if (id && isLoadedData) {
      updateRecipById(
        allDataRecipesWithDetails.filter((el) => +el.id === +id)[0]
      );
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading || loadingRecipById) {
    return <SpinnerFw />;
  }

  const toggleFavorite = async (item) => {
    const data = await AsyncStorage.getItem('@favorites');

    if (!data) {
      await AsyncStorage.setItem('@favorites', JSON.stringify([item]));
      setFavorite(true);
      return;
    }

    const favoritesList = JSON.parse(data);
    const isMatch = !!favoritesList.filter((el) => el.id === item.id).length;

    const newList = isMatch
      ? favoritesList.filter((el) => el.id !== item.id)
      : [...favoritesList, item];

    setFavorite(!isFavorite);
    await AsyncStorage.setItem('@favorites', JSON.stringify(newList));
  };

  return (
    <Box flex={1}>
      <MainHeader />
      <ScrollView>
        <Box p='14px'>
          {recipById ? (
            <>
              <MaskedView
                style={{ height: 44, width: width - 28 }}
                maskElement={
                  <Text
                    w={width - 40}
                    fontSize={18}
                    fontWeight='500'
                    color='red'
                    numberOfLines={2}
                    ellipsizeMode='tail'
                  >
                    {recipById?.title}
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
              <Center mt={3}>
                <Image
                  borderRadius={8}
                  source={{
                    uri: !isLoadedData
                      ? imgPath + recipById?.image
                      : recipById?.image,
                  }}
                  width={'100%'}
                  height={200}
                  alt={recipById?.title || 'Recipe'}
                />
                <TouchableOpacity
                  onPress={() => toggleFavorite(recipById)}
                  style={{
                    position: 'absolute',
                    right: 30,
                    bottom: -25,
                    borderRadius: 50,
                  }}
                >
                  <LinearGradient
                    style={{
                      borderRadius: 26,
                      width: 50,
                      height: 50,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    colors={['#F84784', '#7348FF']}
                  >
                    {isFavorite ? (
                      <AntDesign name='heart' size={30} color='#fff' />
                    ) : (
                      <AntDesign name='hearto' size={30} color='#fff' />
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              </Center>

              {recipById?.ingredients?.length ? (
                <Box mt={4}>
                  {recipById?.ingredients.map((el, i) => (
                    <InfoItem key={i} text={`${el.title} ${el.count}`} />
                  ))}
                </Box>
              ) : null}
              {recipById?.description && (
                <AutoHeightWebView
                  scrollEnabled={false}
                  style={{ width: '100%' }}
                  originWhitelist={['*']}
                  source={{
                    html: `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><style media="screen" type="text/css">
                      body {
                        font-size: 18px;
                        @font-face {
                          font-family: "Roboto";
                          src: url("file:///android_asset/fonts/Roboto.ttf");
                      }              }
                      </style></head><body>${recipById.description}</body>
                    </html>`,
                  }}
                />
              )}
            </>
          ) : (
            <Center pt='10%'>
              <Text fontSize={20}>Ничего не найдено</Text>
            </Center>
          )}
        </Box>
      </ScrollView>
    </Box>
  );
};

const mapStateToProps = ({
  recips: { recipById, loadingRecipById },
  allData: { isLoadedData, allDataRecipesWithDetails },
}) => {
  return {
    recipById,
    loadingRecipById,
    isLoadedData,
    allDataRecipesWithDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRecipById: (id) => dispatch(getRecipById(id)),
    updateRecipById: (data) => dispatch(updateRecipById(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResipsTable5ItemPage);
