import React from 'react';
import { connect } from 'react-redux';

import { ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import { Flex, Text } from 'native-base';

import { imgPath } from '../../resourses/variables';
import { noPhotoImg } from '../../resourses/images';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const RecipItem = ({
  el,
  onPushToLink,
  isIcon,
  isLoadedData,
  isMobileDevice,
}) => {
  const blockWidth = (width - 36) / (isMobileDevice ? 2 : 4);

  return (
    <TouchableOpacity
      onPress={() => {
        if (el.id === 0) return;
        onPushToLink(el.id);
      }}
      activeOpacity={0.7}
      key={el.id}
      style={{ marginBottom: 12 }}
    >
      <ImageBackground
        imageStyle={{
          borderRadius: 15,
        }}
        style={{
          width: blockWidth,
          height: blockWidth,
        }}
        source={
          !el.icon && !el.image
            ? noPhotoImg
            : {
              uri: isIcon
                ? isLoadedData
                  ? el.icon
                  : imgPath + el.icon
                : isLoadedData
                  ? el.image
                  : imgPath + el.image,
            }
        }
        resizeMode="cover"
      >
        <LinearGradient
          style={{
            width: blockWidth,
            height: blockWidth,
            justifyContent: 'flex-end',
            borderRadius: 15,
          }}
          colors={['transparent', '#f0f0f0']}
        >
          <Flex height={82} p={3} justify='center' align='center'>
            {el?.time_title && (
              <Text mb={1} color='#000'>
                {el.time_title}
              </Text>
            )}
            <Text
              ellipsizeMode={'tail'}
              numberOfLines={2}
              textAlign='center'
              color='#000'
              fontWeight='bold'
            >
              {el.title}
            </Text>
          </Flex>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const mapStateToProps = ({ allData: { isLoadedData, isMobileDevice } }) => ({
  isLoadedData,
  isMobileDevice,
});

export default connect(mapStateToProps)(RecipItem);
