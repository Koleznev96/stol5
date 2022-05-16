import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/core';
import { connect } from 'react-redux';

import {
  TouchableOpacity,
  Alert,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { Box, Flex, Input, Icon, Text } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import propStyles from '../../resourses/propStyles';

import SearchIcon from '../../../assets/searchIcon.svg';
import MenuIcon from '../../../assets/headerMenuIcon.svg';
import DowloadIcon from '../../../assets/headerDowloadIcon.svg';
import BackIcon from '../../../assets/headerBackIcon.svg';
import LogoIcon from '../../../assets/logoIcon.svg';

import RecipesSearchList from '../RecipesSearchList';

import { headerBgImg } from '../../resourses/images';
import {
  showSearchLayout,
  searchRecipes,
  updateSearchList,
  searchAllowedProducts,
  searchRecipList,
} from '../../store/actions/recips';
import { getAllData } from '../../store/actions/allData';

import * as FS from 'expo-file-system';
import * as Progress from 'react-native-progress';
const { width } = Dimensions.get('window');

const MainHeader = ({
  showSearchLayout,
  searchRecipes,
  updateSearchList,
  isDiseas,
  termDiseas,
  setTermDiseas,
  getAllData,
  isSearchByRecips,
  searchAllowedProducts,
  //
  isLoadedData,
  loadingAllData,
  recipsList,
  searchRecipList,
}) => {
  const navigation = useNavigation();
  const [term, setTerm] = useState('');
  const [searchList, setSearchList] = useState([]);

  useFocusEffect(
    useCallback(() => {
      setTerm();
    }, [])
  );

  useEffect(() => {
    term
      ? showSearchLayout(true)
      : (() => {
        showSearchLayout(false);

        searchAllowedProducts('');
        searchRecipes('');
        setSearchList([]);
        if (!isLoadedData) {
          updateSearchList([], '');
        }
      })();
  }, [term, isLoadedData]);

  const onAlertDownload = () => {
    Alert.alert(
      'Синхронизация',
      'Для работы приложения без интернета, нужно закешировать данные (Это может занять несколько минут)',
      [
        {
          text: 'В другой раз',
          style: 'cancel',
        },
        {
          text: 'Загрузить данные',
          onPress: async () => {
            await getAllData();
          },
        },
      ]
    );
  };

  const downloadData = async () => {
    const path = `${FS.documentDirectory}ALL_DATA`,
      data = await FS.getInfoAsync(path);

    if (data.exists) {
      Alert.alert(
        'Синхронизация',
        'У вас уже есть загруженная копия для работы приложения в оффлайн режиме. Обновить данные?',
        [
          {
            text: 'Отмена',
            style: 'cancel',
          },
          {
            text: 'Загрузить данные',
            onPress: async () => {
              await getAllData();
            },
          },
        ]
      );
      return;
    }
    onAlertDownload();
  };

  const onSearch = (term) => {
    setTerm(term);

    if (isSearchByRecips) {
      if (!isLoadedData) {
        searchRecipes(term);
      } else {
        const recList = [];
        recipsList.forEach((el) => {
          el?.recipes.forEach((el2) => {
            if (el2.title.toLowerCase().includes(term.toLowerCase())) {
              recList.push(el2);
            }
          });
        });

        updateSearchList(recList, term);
        setSearchList(searchRecipList);
      }
    } else {
      searchAllowedProducts(term);
    }
  };

  return (
    <>
      <ImageBackground
        style={{ width }}
        source={{ uri: 'https://vseopecheni.ru/assets/app/headerImgBg.png' }}
        resizeMode="cover">
        <Flex
          my='8px'
          mb={0}
          direction='row'
          justify='space-between'
          alignItems='center'
        >
          <Flex ml='16px' direction='row' align='center'>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Box>
                <MenuIcon />
              </Box>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('MainPage')}
              activeOpacity={0.8}
              style={{
                marginLeft: 19,
                paddingHorizontal: 2,
                paddingVertical: 9,
                borderRadius: 5,
                backgroundColor: '#fff',
              }}
            >
              <LogoIcon />
            </TouchableOpacity>
          </Flex>
          <Flex direction='row' align='center'>
            <TouchableOpacity
              onPress={downloadData}
              style={{ marginRight: 24 }}
            >
              <DowloadIcon />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (navigation.canGoBack()) {
                  navigation.goBack();
                }
              }}
              style={{ marginRight: 16 }}
            >
              <BackIcon />
            </TouchableOpacity>
          </Flex>
        </Flex>
        <Box p={'8px'}>
          <Input
            placeholder='Поиск...'
            borderRadius='2px'
            value={isDiseas ? termDiseas : term}
            onChangeText={(text) =>
              isDiseas ? setTermDiseas(text) : onSearch(text)
            }
            fontSize={14}
            height='30px'
            py='5px'
            px='8px'
            autoCapitalize='none'
            bg='#fff'
            _focus={false}
            borderWidth={0}
            InputRightElement={
              <Icon
                as={
                  <>
                    {term ? (
                      <TouchableOpacity
                        style={{ marginRight: 8 }}
                        onPress={() => setTerm('')}
                      >
                        <AntDesign name='closecircle' size={13} color='#777' />
                      </TouchableOpacity>
                    ) : (
                      <Flex mr='8px' align='center' justify='center'>
                        <SearchIcon />
                      </Flex>
                    )}
                  </>
                }
              />
            }
          />
        </Box>
      </ImageBackground>
      {loadingAllData && (
        <Box p={3} bg='#fff' width={width}>
          <Flex align='center' direction='row' justify='space-between'>
            <Box>
              <Text fontWeight='bold'>Загрузка...</Text>
            </Box>
            <Box>
              <Text fontSize={12} color={propStyles.shadowColor}>
                Примерное время загрузки 5мин
              </Text>
            </Box>
          </Flex>
          <Flex mt={3} align='center' justify='center'>
            <Progress.Bar
              progress={0.4}
              indeterminate
              indeterminateAnimationDuration={1800}
              color={propStyles.headerColor}
              animationType='timing'
              width={width - 18}
              height={7}
            />
          </Flex>
        </Box>
      )}
      <RecipesSearchList isSearchByRecips={isSearchByRecips} />
    </>
  );
};

const mapStateToProps = ({
  allData: { loadingAllData, isLoadedData },
  recips: { recipsList, searchRecipList },
}) => ({
  loadingAllData,
  recipsList,
  isLoadedData,
  searchRecipList,
});

const mapDispatchToProps = (dispatch) => ({
  showSearchLayout: (bool) => dispatch(showSearchLayout(bool)),
  searchRecipes: (term, page) => dispatch(searchRecipes(term, page)),
  searchAllowedProducts: (term) => dispatch(searchAllowedProducts(term)),
  updateSearchList: (list, term) => dispatch(updateSearchList(list, term)),
  getAllData: () => dispatch(getAllData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainHeader);
