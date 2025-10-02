import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {useEffect, useState} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import {
  PERMISSIONS,
  RESULTS,
  check,
  request,
  requestNotifications,
} from 'react-native-permissions';

const ParentNoti = () => {
  const [access, setAccess] = useState();

  const checkNotPer = async onSuccess => {
    const checkPermission = access;
    // const checkPermission = await AsyncStorage.getItem('permission');
    askForPermission(checkPermission, onSuccess);
  };

  // useEffect(() => {
  //   // checkNotPer();
  //   console.log(access, 'Checkkkkkk');
  // }, [access]);

  const askForPermission = (checkPermission, onSuccess) => {
    if (checkPermission == 'granted') {
      console.log('going1');
    } else {
      const checkAndRequestNotificationPermission = async () => {
        try {

          let isAndroid13OrHigher ;
          let status;
          if(Platform.OS==='android'){
            isAndroid13OrHigher=   Number(Platform.Version) >= 33; // API level 33 - Android 13+
            if (isAndroid13OrHigher) {
              status = await check(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS)
             }
          }else {
            status = await check(PERMISSIONS.IOS.NOTIFICATIONS);
          }
          

        
          if (status === RESULTS.GRANTED) {
            setAccess('granted');
            onSuccess();
          } else {
            await requestNotificationPermission(onSuccess);
          }
        } catch (error) {
          console.log('Error checking notification permission: ', error);
        }
      };
      checkAndRequestNotificationPermission();
    }
  };

  async function requestUserPermission(onSuccess) {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      onSuccess();
    }
  }

  const registerDeviceForRemoteMessages = async () => {
    try {
      await messaging().registerDeviceForRemoteMessages();
      console.log('Device registered for remote messages!');
    } catch (error) {
      console.error('Device registration failed:', error);
    }
  };

  const requestNotificationPermission = async onSuccess => {
    try {
      const isAndroid = Platform.OS === 'android';
      const isAndroid13OrHigher = isAndroid && Platform.Version >= 33;
   
      if (isAndroid13OrHigher) {
        const permission = PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS;
    
        if (permission) {
          try {
            const granted = await PermissionsAndroid.request(permission);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              console.log('Notification permission granted');
              onSuccess();
            }
          } catch (error) {
            console.warn('Permission request failed', error);
          }
        }
      } else {
        try {
          const {status} = await requestNotifications([
            'alert',
            'sound',
            'badge',
          ]);
          if (status === RESULTS.GRANTED) {
            onSuccess();
          }
        } catch (err) {
          console.log(err, 'going error');
        }
      }
    } catch (error) {
      console.log('Error requesting notification permission: ', error);
    }
  };
  return {
    requestNotificationPermission,
    checkNotPer,
    requestUserPermission,
    askForPermission,
    registerDeviceForRemoteMessages,
  };
};

export default ParentNoti;
