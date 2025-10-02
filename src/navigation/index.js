import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useRef, useState} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import Toast from 'react-native-toast-message';
import Loader from '../components/Loader';
import ParentNoti from '../NotificationService';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {
  setClearData,
  setFcmToken,
  setStartedAlready,
} from '../store/onBoarding';
import HomeTabs from './BottomTabs';
import GetStarted from '../screens/Auth/GetStarted';
import PostOnboarding from '../screens/PostOnboarding';
import {
  getBlockedTimes,
  getHomeData,
  getImage,
  getLocationsDataNew,
  setAllHomeImages,
  setAllImages,
  setClearData1,
  setNotificationDot,
  setSelectedDate,
} from '../store/courtSlice';
import {AppState} from 'react-native';
import {companyDetailID} from '../config/constants';
import moment from 'moment-timezone';
import {CompanyImageTypeEnum} from '../helper/enums';
import {compressImages} from '../helper/functions';

const MainStack = createStackNavigator();

export const navigationRef = createNavigationContainerRef();

const MainNavigation = ({navigationIntegration}) => {
  const dispatch = useAppDispatch();
  const {homeData} = useAppSelector(state => state.court);
  const {startedAlready, loading, fcmToken, success, error} = useAppSelector(
    state => state.onBoarding,
  );

  const noti = ParentNoti();

  const cloading = useAppSelector(state => state.court.loading);
  const cerror = useAppSelector(state => state.court.error);
  const csuccess = useAppSelector(state => state.court.success);

  const checkStarted = async () => {
    const t = await AsyncStorage.getItem('opened');
    dispatch(setStartedAlready(t == 'true' ? true : false));
  };

  const appState = useRef(AppState.currentState);
  useEffect(() => {
    const handleAppStateChange = nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        let date = moment()?.tz('Asia/Karachi');
        if (homeData) {
          date = moment()?.tz(homeData?.companyTimezone);
        }

        dispatch(setSelectedDate(date.format('YYYY-MM-DD')));
        fetchData(date.format('YYYY-MM-DD'));
      } else if (
        appState.current === 'active' &&
        nextAppState.match(/inactive|background/)
      ) {
        console.log('App has gone to the background!');
      }

      appState.current = nextAppState;
    };

    const fetchData = date => {
      dispatch(getLocationsDataNew({companyDetailID: companyDetailID}));
      getBlockedSlots(date, null);
      dispatch(getHomeData({companyDetailID: companyDetailID}));
    };

    const getBlockedSlots = (date, id) => {
      let form = {
        courtId: id,
        date: date,
        companyDetailID: companyDetailID,
      };

      dispatch(getBlockedTimes(form));
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove(); // Clean up the listener
    };
  }, []);

  useEffect(() => {
    let date = moment()?.tz('Asia/Karachi');
    if (homeData) {
      date = moment()?.tz(homeData?.companyTimezone);
    }

    dispatch(setSelectedDate(date?.format('YYYY-MM-DD')));
  }, []);

  useEffect(() => {
    messaging().setBackgroundMessageHandler(async remoteMsg => {
      console.log(remoteMsg, 'remote msg');
      dispatch(setNotificationDot(true));
    });
    const unsubscribe = messaging().onMessage(async remoteMsg => {
      console.log(remoteMsg, 'remottee');
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    setTimeout(() => {
      noti.checkNotPer(getFCMToken);
    }, 500);
  }, []);

  useEffect(() => {
    if (fcmToken) {
      notificationService();
    }
  }, [fcmToken]);

  const getFCMToken = async () => {
    noti.requestUserPermission(async () => {
      try {
        const fcmToken = await messaging().getToken();

        if (fcmToken) {
          dispatch(setFcmToken(fcmToken));
        }
      } catch (error) {
        console.log(error, 'errorrrr');
      }
    });
  };

  const notificationService = () => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    const unsubscribeOnNotificationOpened = messaging().onNotificationOpenedApp(
      remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
        navigationRef.navigate('HomeTabs', {screen: 'Notifications'});
      },
    );

    // foreGround
    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      let msg = remoteMessage?.data?.msg;

      showNotificationToast(msg);
      dispatch(setNotificationDot(true));
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );

          navigationRef.navigate('HomeTabs', {screen: 'Notifications'});
        }
      });

    return () => {
      unsubscribeOnNotificationOpened();
      unsubscribeOnMessage();
    };
  };

  useEffect(() => {
    const init = async () => {
      checkStarted();
    };

    init().finally(async () => {
      if (startedAlready !== null) {
        setTimeout(() => {
          RNBootSplash.hide({fade: true});
        }, 2000);
      }
    });
  }, [startedAlready]);

  useEffect(() => {
    //on Boarding
    error && showErrorToast(error);
    cerror && showErrorToast(cerror);

    success && showSuccessToast(success);
    csuccess && showSuccessToast(csuccess);

    setTimeout(() => {
      dispatch(setClearData(''));
      dispatch(setClearData1(''));
    }, 1000);
  }, [error, success, cerror, csuccess]);

  const showErrorToast = msg => {
    if (!msg) return;

    const [text1, text2] = msg?.split('\n');

    Toast.show({
      type: 'error',
      text1: text1 || 'Error',
      text2: text2 || undefined,
    });
  };

  const showSuccessToast = msg => {
    if (!msg) return;

    const [text1, text2] = msg?.split('\n');

    Toast.show({
      type: 'success',
      text1: text1 || 'Success',
      text2: text2 || undefined,
    });
  };

  const showNotificationToast = msg => {
    let message = JSON.parse(msg);
    if (message?.IsSuccess) {
      Toast.show({
        type: 'success',
        text1: message?.Title,
        text2: message?.Notification,
      });
    } else {
      if (message) {
        Toast.show({
          type: 'error',
          text1: message?.Title,
          text2: message?.Notification,
        });
      }
    }
  };

  return (
    <NavigationContainer
      onReady={() => {
        navigationIntegration.registerNavigationContainer(navigationRef);
      }}
      ref={navigationRef}>
      {<Loader isLoading={loading} />}
      {<Loader isLoading={cloading} />}

      <MainStack.Navigator screenOptions={{headerShown: false}}>
        {!startedAlready ? (
          <MainStack.Screen name={'GetStarted'} component={GetStarted} />
        ) : null}

        <MainStack.Screen name={'HomeTabs'} component={HomeTabs} />
        <MainStack.Screen name={'PostOnBoarding'} component={PostOnboarding} />
      </MainStack.Navigator>

      <Toast />
    </NavigationContainer>
  );
};

export default MainNavigation;
