import { AsyncStorage , Alert } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

const NOTIFICATION_KEY = 'mobileFlashCards:notifications';

/**
 * Accreditation: code taken from Udacity React Native 'UdaciFitness' lessons
 */
export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(Notifications.cancelAllScheduledNotificationsAsync);
}

/**
 * Accreditation: code taken from Udacity React Native 'UdaciFitness' lessons
 */
function createNotification() {
  return {
    title: 'Learn something today!',
    body: '🚨 don\'t forget to take a quiz today!🚨',
    ios: {
      sound: true,
    },
    android:{
      sound:true,
      priority:'high',
      sticky:false,
      vibrate:true,
    }
  };
}

/**
 * Accreditation: code adapted from Udacity React Native 'UdaciFitness' lessons
 */
export function setLocalNotification(chosenTime) {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === 'granted') {
            Notifications.cancelAllScheduledNotificationsAsync();

            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: chosenTime,
              repeat: 'day',
            });

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });
}



export function alertMessage(title, message, callback) {
  return Alert.alert(
    title,
    message,
    [
      { text: 'OK', onPress: () => callback() }
    ]
  );
}
