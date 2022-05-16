import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { receptions } from './variables';

export const registerForPushNotification = async () => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!');
    return;
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data;

  return token;
};

export const createAlarm = async (time, label, pushBody) => {
  let date = new Date(),
    title = '',
    body = '',
    hours = +time.slice(0, 2),
    minutes = +time.slice(-2),
    secondsInTheDay = 86400;

  console.log('time', time);

  const alarmTime = new Date().setHours(hours, minutes);
  const alarm = (alarmTime - date) / 1000;

  if (label) {
    title = label;
    body = 'Время приёма лекарств!';
  } else if (pushBody) {
    title = pushBody;
    body = 'Время для принятия пищи!';
  }

  // for (let i = 0; i <= 7; i++) {
  Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      priority: 'high',
      vibrate: true,
      sound: 'default',
      android: {
        sound: true,
      },
      ios: {
        sound: true,
      },
    },
    trigger: {
      hour: hours,
      minute: minutes,
      repeats: true,
      // seconds: +secondsInTheDay * +i + +alarm,
    },
  });
  // }
};

export const getAlarmsFromStorageAndCreate = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();

  const mt = await AsyncStorage.getItem('@medicTimes');
  const ft = await AsyncStorage.getItem('@foodTimes');

  if (mt) {
    const medicTimes = JSON.parse(mt);

    medicTimes.forEach((el) => {
      el.alarms.forEach((alarm) => {
        createAlarm(alarm, el.name);
      });
    });
  }

  if (ft) {
    const foodTimes = JSON.parse(ft);

    foodTimes.forEach((el, i) => {
      createAlarm(el, null, receptions[i]);
    });
  }
};
