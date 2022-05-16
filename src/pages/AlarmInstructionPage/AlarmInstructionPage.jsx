import React, { useRef, createRef, useState } from 'react';

import { Box, Text, Center } from 'native-base';
import { FlatList } from 'react-native';
import MainHeader from '../../components/MainHeader';

import LinearButton from '../../components/LinearButton';
import { phones, phoneInstructions } from '../../resourses/variables';

const AlarmInstructionPage = () => {
  const flatListRef = useRef();
  const windowRef = useRef();

  const onPressTouch = async (id) => {
    const idx = phoneInstructions.findIndex((el) => el.id === id);
    if (idx === -1) return;

    flatListRef.current.scrollToIndex({
      animated: true,
      index: idx,
      viewOffset: idx === 0 ? -1200 : 0,
    });
  };

  const RenderItem = ({ item }) => (
    <Center width='280px'>
      {item.id === 1 && (
        <Center py={2}>
          <Box
            mb={2}
            borderBottomColor={'#000'}
            borderBottomWidth={1}
            pt={5}
            pb={7}
          >
            <Text textAlign='center' fontSize={20}>
              Почему у меня перестали приходить напоминания?
            </Text>
          </Box>
          {phones.map((el, i) => (
            <Box key={i} mt={5}>
              <LinearButton
                actionFn={() => onPressTouch(el.id)}
                width={280}
                label={el.phone}
              />
            </Box>
          ))}
          <Box>
            <Box mt='30px'>
              <Text>
                Основная причина в приложения для очистки, таких как Master, 360
                Security, CM security, Fast Booster и других похожих
                приложениях. Когда вы очищаете свое устройство, эти приложения
                блокируют напоминания от Стол №5 и ставят ваше здоровье под
                угрозу. Существует только один способ предотвращения
                вмешательства этих приложений в работу Стол №5.
              </Text>
              <Box px={3} mt={4}>
                <Text>1. Пройди в настройки вашего устройств.</Text>
                <Text>2. Нажмите на "Доступ".</Text>
                <Text>3. Под "Сервис" отключите приложение для очистки.</Text>
                <Text>Перезагрузите устройство.</Text>
                <Text>5. Войдите в приложение Стол №5.</Text>
              </Box>
            </Box>
          </Box>
        </Center>
      )}
      <Box mt='24px'>
        <Box>
          <Text fontWeight='bold'>{item.label}</Text>
        </Box>
        <Box px={3} mt={4}>
          {item.content.map((content, i) => (
            <Box key={i}>
              <Text>
                {`${i + 1}. `}
                {content}
              </Text>
            </Box>
          ))}
        </Box>
        {item.additionalContent && (
          <Box mt='24px'>
            <Box>
              <Text>{item.additionalContent.label}</Text>
            </Box>
            <Box px={3} mt={4}>
              {item.additionalContent.content.map((addContent, addCidx) => (
                <Text key={addContent}>
                  {addCidx} .{addContent}
                </Text>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Center>
  );

  return (
    <Box pb='110px' flex={1}>
      <MainHeader />
      <Center>
        <FlatList
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          ref={flatListRef}
          data={phoneInstructions}
          renderItem={RenderItem}
          keyExtractor={(_, i) => i}
          initialNumToRender={17}
        />
      </Center>
    </Box>
  );
};

export default AlarmInstructionPage;
