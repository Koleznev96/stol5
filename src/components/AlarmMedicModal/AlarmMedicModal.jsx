import React, { useState } from 'react';

import {
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Box, Flex, Input, Text, Button, Modal } from 'native-base';
import propStyles from '../../resourses/propStyles';

import PopoverDatePicker from '../PopoverDatePicker';

import { onAlert } from '../../resourses/onAlert';
import { createAlarm } from '../../resourses/alarmNotifications';

import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

const joinFoodTime = (dateValue) => {
  if (!dateValue) return;

  const getTime = (idx) =>
    dateValue.toLocaleTimeString().slice(0, -3).split(':')[idx];

  const hours = +getTime(0);
  const minutes = +getTime(1);
  let curDate = '';

  const mins = minutes.toString().length === 1 ? `0${minutes}` : minutes;

  hours > 23
    ? (curDate = `0${hours - 24}:${mins}`)
    : (curDate = `${hours < 10 ? '0' + hours : hours}:${mins}`);

  return curDate;
};

const Reception = ({ openDialog, value, label, date, triggerProps }) => {
  return (
    <Flex mb={2} direction='row' justify='space-between' align='center'>
      <Box>
        <Box _text={{ fontSize: 14, color: 'grey' }} mb={1}>
          {label}
        </Box>
      </Box>
      <Box>
        <Button
          onPress={() => (openDialog ? openDialog() : (() => {})())}
          {...triggerProps}
          py={0}
          value={value}
          height={34}
          width={90}
          bg='#fff'
          border
          borderColor={propStyles.shadowedColor}
        >
          {joinFoodTime(date)}
        </Button>
      </Box>
    </Flex>
  );
};

const AlarmMedicModal = ({ open, setOpen, setMedicTimes, deleteMedicTime }) => {
  const [name, setName] = useState('');
  const [firstRecept, setFirstRecept] = useState('');
  const [secondRecept, setSecondRecept] = useState('');
  const [thirdRecept, setThirdRecept] = useState('');
  const [androidPicker, setAndroidPicker] = useState('');

  const createMedicAlarms = async () => {
    if (!firstRecept && !secondRecept && !thirdRecept)
      return onAlert('Выберите хотя бы один прием!');

    if (!name) return onAlert('Введите название лекарства');

    const medicAlarms = [
      {
        name,
        alarms: [
          joinFoodTime(firstRecept),
          joinFoodTime(secondRecept),
          joinFoodTime(thirdRecept),
        ].filter((el) => el),
      },
    ];

    const prevMedicTimes = await AsyncStorage.getItem('@medicTimes');

    if (prevMedicTimes) {
      const data = [...JSON.parse(prevMedicTimes), ...medicAlarms].map(
        (el, i) => ({
          ...el,
          idx: i,
        })
      );
      await AsyncStorage.setItem('@medicTimes', JSON.stringify(data));
      setMedicTimes(data);

      medicAlarms[0].alarms.forEach((el) => {
        createAlarm(el, medicAlarms[0].name);
      });
    } else {
      const data = medicAlarms.map((el, i) => ({ ...el, idx: i }));

      await AsyncStorage.setItem('@medicTimes', JSON.stringify(data));
      setMedicTimes(data);
      medicAlarms[0].alarms.forEach((el) => {
        createAlarm(el, medicAlarms[0].name);
      });
    }
    setName('');
    setFirstRecept('');
    setSecondRecept('');
    setThirdRecept('');
    setOpen(false);

    onAlert('Вы успешно добавили будильник');
  };

  return (
    <>
      <Modal size='full' isOpen={open}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Box width='100%' safeAreaY flex={1} bg='#fff'>
            <Flex
              p='14px'
              borderBottomWidth={1}
              borderBottomColor={propStyles.shadowedColor}
              direction='row'
              align='center'
              justify='space-between'
            >
              <TouchableOpacity onPress={() => setOpen(false)}>
                <Text fontSize={15} color={propStyles.blueActiveColor}>
                  Закрыть
                </Text>
              </TouchableOpacity>
              <Box _text={{ fontSize: 18, fontWeight: '500' }}>
                Приём лекарств
              </Box>
              <TouchableOpacity>
                <Text
                  onPress={createMedicAlarms}
                  fontSize={15}
                  color={propStyles.blueActiveColor}
                >
                  Сохранить
                </Text>
              </TouchableOpacity>
            </Flex>
            <Box p='14px'>
              <Box>
                <Box _text={{ fontSize: 14, color: 'grey' }} mb={1}>
                  Название лекарства
                </Box>
                <Box>
                  <Input
                    py={0}
                    onChangeText={(text) => setName(text)}
                    value={name}
                    height={34}
                  />
                </Box>
              </Box>
              <Box mt={'40px'}>
                <>
                  {/* first */}
                  {Platform.OS === 'ios' ? (
                    <PopoverDatePicker
                      button={(triggerProps) => (
                        <Reception
                          date={firstRecept}
                          label='Первый прием'
                          triggerProps={triggerProps}
                        />
                      )}
                      value={firstRecept}
                      setValue={setFirstRecept}
                    />
                  ) : (
                    <>
                      <Reception
                        openDialog={() => setAndroidPicker('first')}
                        date={firstRecept}
                        label='Первый прием'
                      />
                      {androidPicker === 'first' ? (
                        <DateTimePicker
                          testID='dateTimePicker'
                          value={firstRecept ? firstRecept : new Date()}
                          mode={'time'}
                          is24Hour={true}
                          display='spinner'
                          onChange={(_, selectedDate) => {
                            setAndroidPicker('');
                            setFirstRecept(selectedDate);
                          }}
                        />
                      ) : null}
                    </>
                  )}
                  {/* second */}
                  {Platform.OS === 'ios' ? (
                    <PopoverDatePicker
                      button={(triggerProps) => (
                        <Reception
                          date={secondRecept}
                          label='Второй прием'
                          triggerProps={triggerProps}
                        />
                      )}
                      value={secondRecept}
                      setValue={setSecondRecept}
                    />
                  ) : (
                    <>
                      <Reception
                        openDialog={() => setAndroidPicker('second')}
                        date={secondRecept}
                        label='Второй прием'
                      />
                      {androidPicker === 'second' ? (
                        <DateTimePicker
                          testID='dateTimePicker'
                          value={secondRecept ? secondRecept : new Date()}
                          mode={'time'}
                          is24Hour={true}
                          display='spinner'
                          onChange={(_, selectedDate) => {
                            setAndroidPicker('');
                            setSecondRecept(selectedDate);
                          }}
                        />
                      ) : null}
                    </>
                  )}
                  {/* third */}
                  {Platform.OS === 'ios' ? (
                    <PopoverDatePicker
                      button={(triggerProps) => (
                        <Reception
                          date={thirdRecept}
                          label='Третий прием'
                          triggerProps={triggerProps}
                        />
                      )}
                      value={thirdRecept}
                      setValue={setThirdRecept}
                    />
                  ) : (
                    <>
                      <Reception
                        openDialog={() => setAndroidPicker('third')}
                        date={thirdRecept}
                        label='Третий прием'
                      />
                      {androidPicker === 'third' ? (
                        <DateTimePicker
                          testID='dateTimePicker'
                          value={thirdRecept ? thirdRecept : new Date()}
                          mode={'time'}
                          is24Hour={true}
                          display='spinner'
                          onChange={(_, selectedDate) => {
                            setAndroidPicker('');
                            setThirdRecept(selectedDate);
                          }}
                        />
                      ) : null}
                    </>
                  )}
                </>
              </Box>
            </Box>
          </Box>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default AlarmMedicModal;
