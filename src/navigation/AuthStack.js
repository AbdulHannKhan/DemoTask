import {createStackNavigator} from '@react-navigation/stack';
import {useEffect, useState} from 'react';
import GetStarted from '../screens/Auth/GetStarted';
import Resetpass from '../screens/Auth/ResetPass';
import SignIn from '../screens/Auth/SignIn';
import SignUp from '../screens/Auth/SignUp';
import VerifyOTP from '../screens/Auth/VerifyOtp';
import VerifyPhone from '../screens/Auth/VerifyPhone';
import {useAppSelector} from '../store/hooks';
import TermsnConditions from '../screens/Auth/TermsnConditions';
import PrivacyPolicy from '../screens/Auth/PrivacyPolicy';

export const AuthScreens = [
  {
    name: 'SignIn',
    component: SignIn,
    key: 'SignIn',
  },
  {
    name: 'SignUp',
    component: SignUp,
    key: 'SignUp',
  },
  {
    name: 'ResetPass',
    component: Resetpass,
    key: 'ResetPass',
  },
  {
    name: 'VerifyPhone',
    component: VerifyPhone,
    key: 'VerifyPhone',
  },
  {
    name: 'VerifyOTP',
    component: VerifyOTP,
    key: 'VerifyOTP',
  },
  {
    name: 'TermsnConditions',
    component: TermsnConditions,
    key: 'TermsnConditions',
  },
  {
    name: 'PrivacyPolicy',
    component: PrivacyPolicy,
    key: 'PrivacyPolicy',
  },
];

const Auth = createStackNavigator();

const AuthStack = () => {
  const startedAlready = useAppSelector(
    state => state.onBoarding.startedAlready,
  );
  const [authScreens, setAuthScreens] = useState([...AuthScreens]);

  // useEffect(() => {
  //   if (startedAlready == true) {
  //     const temp = authScreens?.filter(e => e?.name !== 'GetStarted');
  //     setAuthScreens(temp);
  //   }
  // }, [startedAlready]);

  return (
    <Auth.Navigator screenOptions={{headerShown: false}}>
      {authScreens?.map(e => {
        return (
          <Auth.Screen key={e?.key} name={e?.name} component={e?.component} />
        );
      })}
    </Auth.Navigator>
  );
};

export default AuthStack;
