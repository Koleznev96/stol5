import React from 'react';
import { useNavigation } from '@react-navigation/core';

import { TouchableOpacity } from 'react-native';
import { Box, Flex, Text, Image } from 'native-base';

const LinkItem = ({ icon, label, path, id }) => {
  const navigation = useNavigation();
  
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(path, { id })}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 14,
        marginBottom: 30,
      }}
    >
      <Flex width={44} mr='10px' justify='center' align='center'>
        <Image width={44} height={38} alt={label} source={{ uri: icon }} />
      </Flex>
      <Box>
        <Text color='#000' fontWeight='500' fontSize={16}>
          {label}
        </Text>
      </Box>
    </TouchableOpacity>
  );
};

export default LinkItem;
