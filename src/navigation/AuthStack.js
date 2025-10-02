import {createStackNavigator} from '@react-navigation/stack';
import {useEffect, useState} from 'react';
import SignIn from '../screens/Auth/SignIn';
import {useAppSelector} from '../store/hooks';

export const AuthScreens = [
  {
    name: 'SignIn',
    component: SignIn,
    key: 'SignIn',
  },

];

const Auth = createStackNavigator();

const AuthStack = () => {
 
  return (
    <Auth.Navigator screenOptions={{headerShown: false}}>
      {AuthScreens?.map(e => {
        return (
          <Auth.Screen key={e?.key} name={e?.name} component={e?.component} />
        );
      })}
    </Auth.Navigator>
  );
};

export default AuthStack;
