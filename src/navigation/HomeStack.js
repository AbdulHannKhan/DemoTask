import {createStackNavigator} from '@react-navigation/stack';
import Schedule from '../screens/App/Booking';
import Summary from '../screens/App/Booking/Summary';
import CourtDetails from '../screens/App/CourtDetails';
import Home from '../screens/App/Home';
import Profile from '../screens/App/Settings/Profile';
import {useAppSelector} from '../store/hooks';
import Settings from '../screens/App/Settings';
import TermsnConditions from '../screens/Auth/TermsnConditions';
import PrivacyPolicy from '../screens/Auth/PrivacyPolicy';
import MyBookings from '../screens/App/MyBookings';
import BookingDetails from '../screens/App/MyBookings/BookingDetails';
import AuthStack from './AuthStack';
import {useEffect} from 'react';
import AllCourtsBooking from '../screens/App/Booking/AllCourtsBooking';

export const HomeScreens = [
  {
    name: 'HomeScreen',
    component: Home,
    key: 'HomeScreen',
  },
  {
    name: 'CourtDetails',
    component: CourtDetails,
    key: 'CourtDetails',
  },
  {
    name: 'BookingSchedule',
    component: Schedule,
    key: 'BookingSchedule',
  },
  {
    name: 'AllCourtsBooking',
    component: AllCourtsBooking,
    key: 'AllCourtsBooking',
  },
  {
    name: 'BookingSummary',
    component: Summary,
    key: 'BookingSummary',
  },
  {
    name: 'AuthStack',
    component: AuthStack,
    key: 'AuthStack',
  },
];

const HomeNav = createStackNavigator();

const HomeStack = () => {
  const {userData} = useAppSelector(state => state.onBoarding);

  return (
    <HomeNav.Navigator screenOptions={{headerShown: false}}>
      {HomeScreens?.map(e => {
        return (
          <HomeNav.Screen
            key={e?.key}
            name={e?.name}
            component={e?.component}
          />
        );
      })}
    </HomeNav.Navigator>
  );
};

export const SettingScreens = [
  {
    name: 'Settings',
    component: Settings,
    key: 'Settings',
  },
  {
    name: 'Profile',
    component: Profile,
    key: 'Profile',
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

const SettingNav = createStackNavigator();

export const SettingsStack = () => {
  return (
    <SettingNav.Navigator screenOptions={{headerShown: false}}>
      {SettingScreens?.map(e => {
        return (
          <SettingNav.Screen
            key={e?.key}
            name={e?.name}
            component={e?.component}
          />
        );
      })}
    </SettingNav.Navigator>
  );
};

export const MyBookingScreens = [
  {
    name: 'MyBookings',
    component: MyBookings,
    key: 'MyBookings',
  },
  {
    name: 'BookingDetails',
    component: BookingDetails,
    key: 'BookingDetails',
  },
];

const MyBookingStackNav = createStackNavigator();

export const MyBookingStack = () => {
  return (
    <MyBookingStackNav.Navigator screenOptions={{headerShown: false}}>
      {MyBookingScreens?.map(e => {
        return (
          <MyBookingStackNav.Screen
            key={e?.key}
            name={e?.name}
            component={e?.component}
          />
        );
      })}
    </MyBookingStackNav.Navigator>
  );
};

export default HomeStack;
