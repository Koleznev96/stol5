import React from 'react';

import { TouchableOpacity } from 'react-native';
import { Text } from 'native-base';

import { LinearGradient } from 'expo-linear-gradient';

const LinearButton = ({
  label,
  actionFn,
  children,
  width,
  height,
  borderRadius,
}) => {
  return (
    <TouchableOpacity onPress={actionFn}>
      <LinearGradient
        colors={['#F84784', '#7348FF']}
        style={{
          borderRadius: borderRadius || borderRadius === 0 ? borderRadius : 6,
          width: width ? width : 290,
          height: height ? height : 44,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        start={[0, 0]}
        end={[1, 1]}
      >
        {children ? (
          children
        ) : (
          <Text color='#fff' fontWeight='600'>
            {label}
          </Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default LinearButton;
