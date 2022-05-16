import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';

import { TouchableOpacity, Platform, Alert } from 'react-native';
import { Box, Flex, Text, Button, ScrollView, Center } from 'native-base';
import propStyles from '../../resourses/propStyles';
import { Entypo } from '@expo/vector-icons';

import MainHeader from '../../components/MainHeader/MainHeader';
import AlarmMedicModal from '../../components/AlarmMedicModal';
import PopoverDatePicker from '../../components/PopoverDatePicker';

import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createAlarm,
  getAlarmsFromStorageAndCreate,
} from '../../resourses/alarmNotifications';
import { receptions } from '../../resourses/variables';

import * as Notifications from 'expo-notifications';

import { LinearGradient } from 'expo-linear-gradient';

import LinearButton from '../../components/LinearButton';

const AlarmPage = () => {
  const navigation = useNavigation();
  const [foodTime, setFoodTime] = useState(new Date());
  const [foodTimes, setFoodTimes] = useState([]);
  const [medicTimes, setMedicTimes] = useState([]);
  const [medicModal, setMedicModal] = useState(false);
  const [androidPicker, setAndroidPicker] = useState(false);

  useEffect(() => {
    (async () => {
      const ft = await AsyncStorage.getItem('@foodTimes');
      const mt = await AsyncStorage.getItem('@medicTimes');
      if (ft) {
        setFoodTimes(JSON.parse(ft));
      }
      if (mt) {
        setMedicTimes(JSON.parse(mt));
      }
    })();
  }, []);

  const joinFoodTime = async (value) => {
    const foodTimes = [];

    const time = value ? value : foodTime;

    const getTime = (idx) =>
      time.toLocaleTimeString().slice(0, -3).split(':')[idx];

    const hours = +getTime(0);
    const minutes = +getTime(1);

    for (let i = 0; i <= 4; i++) {
      const mins = minutes.toString().length === 1 ? `0${minutes}` : minutes;

      hours + i * 3 > 23
        ? foodTimes.push(`0${hours + i * 3 - 24}:${mins}`)
        : foodTimes.push(
            `${
              hours + i * 3 < 10 ? '0' + (hours + i * 3) : hours + i * 3
            }:${mins}`
          );
    }
    await AsyncStorage.setItem('@foodTimes', JSON.stringify(foodTimes));
    setFoodTimes(foodTimes);

    foodTimes.forEach((el, i) => {
      createAlarm(el, null, receptions[i]);
    });
  };

  const clearFoodTimes = async () => {
    setFoodTime(new Date());
    setFoodTimes([]);
    await AsyncStorage.removeItem('@foodTimes');

    getAlarmsFromStorageAndCreate();
  };

  const deleteMedicTime = async (idx) => {
    const prevMedicTimes = await AsyncStorage.getItem('@medicTimes');

    const parsedmt = JSON.parse(prevMedicTimes);

    const mt = parsedmt.filter((el) => el.idx !== idx);

    setMedicTimes(mt);
    await AsyncStorage.setItem('@medicTimes', JSON.stringify(mt));

    getAlarmsFromStorageAndCreate();
  };

  const pushToInstructionPage = () => {
    navigation.navigate('AlarmInstructionPage');
  };

  const test = async () => {
    const a = await Notifications.getAllScheduledNotificationsAsync();
    console.log(
      'a',
      a.sort((a, b) => a.trigger.seconds - b.trigger.seconds)
    );
    // await Notifications.cancelAllScheduledNotificationsAsync();
  };

  const alertFirstReceptionAndroid = () => {
    Alert.alert('', 'Введите первый прием пищи', [
      {
        text: 'Отмена',
        style: 'cancel',
      },
      {
        text: 'Продолжить',
        onPress: () => {
          setAndroidPicker(true);
        },
      },
    ]);
  };

  return (
    <Box flex={1}>
      <MainHeader />
      {/* <Button onPress={test}>test</Button> */}
      <ScrollView>
        <Box p='14px'>
          <Center>
            <Box my={4}>
              <LinearButton
                actionFn={pushToInstructionPage}
                label='Не приходят уведомления?'
              />
            </Box>
          </Center>
          <Flex alignItems='center' height={'180px'}>
            <Center>
              {Platform.OS === 'ios' ? (
                <PopoverDatePicker
                  isReceptionsFood={true}
                  showBtn={true}
                  value={foodTime}
                  setValue={setFoodTime}
                  takeDate={() => joinFoodTime(null)}
                  button={(triggerProps) => (
                    <LinearButton>
                      <Button
                        variant='unstyled'
                        bg={'transparent'}
                        width={290}
                        {...triggerProps}
                      >
                        Приём еды по времени
                      </Button>
                    </LinearButton>
                  )}
                />
              ) : (
                <>
                  <LinearButton
                    actionFn={alertFirstReceptionAndroid}
                    label='Приём еды по времени'
                  />

                  {androidPicker && (
                    <DateTimePicker
                      testID='dateTimePicker'
                      value={foodTime ? foodTime : new Date()}
                      mode={'time'}
                      is24Hour={true}
                      display='spinner'
                      onChange={({ type }, selectedDate) => {
                        if (type === 'dismissed') {
                          setAndroidPicker(false);
                          return;
                        }

                        setAndroidPicker(false);
                        setFoodTime(selectedDate);
                        joinFoodTime(selectedDate);
                      }}
                    />
                  )}
                </>
              )}
              {foodTimes.length ? (
                <Flex mt={3} direction='row' justify='center' align='center'>
                  {foodTimes.map((el, i) => (
                    <Box key={i} mr={1}>
                      <Text>{el};</Text>
                    </Box>
                  ))}
                  <Box>
                    <TouchableOpacity onPress={clearFoodTimes}>
                      <Entypo
                        name='circle-with-minus'
                        size={24}
                        color='#E04F5F'
                      />
                    </TouchableOpacity>
                  </Box>
                </Flex>
              ) : null}
            </Center>
            <Box mt={4}>
              <LinearButton
                actionFn={() => setMedicModal(true)}
                label='Приём лекарств по времени'
              />
            </Box>
          </Flex>
          {/*  */}
          <Box>
            {medicTimes.length
              ? medicTimes.map((el, i) => (
                  <Box
                    key={i}
                    pb={3}
                    borderBottomWidth={1}
                    borderBottomColor={propStyles.shadowedColor}
                  >
                    <Box mb={1}>
                      <Text fontSize={18} fontWeight='500'>
                        {el.name}
                      </Text>
                    </Box>
                    <Flex
                      direction='row'
                      align='center'
                      justify='space-between'
                    >
                      <Box>
                        {el.alarms.map((alarm, i) => (
                          <Box key={i}>
                            <Text>{alarm}</Text>
                          </Box>
                        ))}
                      </Box>
                      <TouchableOpacity onPress={() => deleteMedicTime(el.idx)}>
                        <Entypo
                          name='circle-with-minus'
                          size={40}
                          color='#E04F5F'
                        />
                      </TouchableOpacity>
                    </Flex>
                  </Box>
                ))
              : null}
          </Box>
        </Box>
      </ScrollView>
      <AlarmMedicModal
        deleteMedicTime={deleteMedicTime}
        open={medicModal}
        setOpen={setMedicModal}
        setMedicTimes={setMedicTimes}
      />
    </Box>
  );
};

export default AlarmPage;
