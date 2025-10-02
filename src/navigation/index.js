import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useRef, useState} from 'react';
import Toast from 'react-native-toast-message';
import Loader from '../components/Loader';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {
  setClearData,
} from '../store/onBoarding';
import {
  setClearData1,
} from '../store/courtSlice';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';

const MainStack = createStackNavigator();

export const navigationRef = createNavigationContainerRef();

const MainNavigation = () => {
  const dispatch = useAppDispatch();
  const { loading,  success, error} = useAppSelector(
    state => state.onBoarding,
  );

  const cloading = useAppSelector(state => state.court.loading);
  const cerror = useAppSelector(state => state.court.error);
  const csuccess = useAppSelector(state => state.court.success);
  
  useEffect(() => {

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

  return (
    <NavigationContainer
      ref={navigationRef}>
      {<Loader isLoading={loading} />}
      {<Loader isLoading={cloading} />}

      <MainStack.Navigator screenOptions={{headerShown: false}}>
        <MainStack.Screen name={'AuthStack'} component={AuthStack} />
        <MainStack.Screen name={'HomeStack'} component={HomeStack} />
      </MainStack.Navigator>

      <Toast />
    </NavigationContainer>
  );
};

export default MainNavigation;
