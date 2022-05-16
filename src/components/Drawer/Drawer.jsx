import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { ImageBackground } from 'react-native';
import { Box, Image, ScrollView } from 'native-base';

import { drawerImg } from '../../resourses/images';
import LinkItem from './LinkItem';

import { getCategoriesList } from '../../store/actions/categories';
import { imgPath } from '../../resourses/variables';
import { table5Img } from '../../resourses/images';

const Drawer = ({ getCategoriesList, categoriesList, isLoadedData }) => {
  useEffect(() => {
    if (!isLoadedData) {
      getCategoriesList();
    }
  }, [isLoadedData]);

  return (
    <Box flex={1}>
      <Box>
        <ImageBackground
          source={{ uri: 'https://vseopecheni.ru/assets/app/drawerImage.jpg' }}
          style={{
            width: '100%',
            height: 160,
          }}
          resizeMode='stretch'

        //source={drawerImg}
        >
          <Image
            source={{ uri: 'https://vseopecheni.ru/assets/app/table5.png' }}
            width={135}
            height={90}
            alt='Table 5'
            style={{
              position: 'absolute',
              top: '50%',
              marginTop: -45,
              left: '50%',
              marginLeft: -45,
            }}
          />
        </ImageBackground>
      </Box>
      <ScrollView>
        <Box pt={5}>
          <LinkItem path={'MainPage'} label={'Главная'} />
          {categoriesList.map((el, i) => (
            <LinkItem
              key={i}
              label={el.title}
              icon={!isLoadedData ? imgPath + el.icon : el.icon}
              path={el.path}
              id={el._id}
            />
          ))}
          <LinkItem path={'FavoritesPage'} label={'Избранные рецепты'} icon={'https://vseopecheni.ru/images2/recipes/new%20sasha/Group-109-1.png'} />
          {/* Добавить кнопку избранные */}
        </Box>
      </ScrollView>
    </Box>
  );
};

const mapStateToProps = ({
  categories: { categoriesList },
  allData: { isLoadedData },
}) => {
  return {
    categoriesList,
    isLoadedData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCategoriesList: () => dispatch(getCategoriesList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
