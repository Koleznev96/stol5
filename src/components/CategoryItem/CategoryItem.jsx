import React from 'react';
import { connect } from 'react-redux';

import {
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Flex, Text } from 'native-base';

import { imgPath } from '../../resourses/variables';
const { width } = Dimensions.get('window');

const CategoryItem = ({ el, actionFn, isLoadedData, isMobileDevice }) => {
  const blockWidth = (width - 30) / (isMobileDevice ? 2 : 4);

  return (
    <TouchableOpacity
      onPress={actionFn}
      style={[styles.categoryItem, { width: width / (isMobileDevice ? 2 : 4) }]}
    >
      <ImageBackground
        style={{ width: blockWidth, height: blockWidth }}
        source={{ uri: isLoadedData ? el.icon : imgPath + el.icon }}
        alt={el.title}
        resizeMode="cover"
      />
      <Flex mt={1} align='center' width={blockWidth}>
        <Text textAlign='center' color='#000' fontWeight='500'>
          {el.title}
        </Text>
      </Flex>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryItem: {
    marginTop: 20,
    padding: 10,
    alignItems: 'center',
  },
});

const mapStateToProps = ({ allData: { isLoadedData, isMobileDevice } }) => ({
  isLoadedData,
  isMobileDevice,
});

export default connect(mapStateToProps)(CategoryItem);
