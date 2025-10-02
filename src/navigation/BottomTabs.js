import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View} from 'react-native';
import Calender from '../assets/images/Calender.svg';
import User from '../assets/images/circle-user.svg';
import HomeSvg from '../assets/images/house.svg';
import NotificationsSvg from '../assets/images/notifications.svg';
import theme from '../config/theme';
import styles from '../GlobalStyles';
import Notifications from '../screens/App/Notification';
import MyBookings from '../screens/App/MyBookings';
import {useAppSelector} from '../store/hooks';
import HomeStack, {MyBookingStack, SettingsStack} from './HomeStack';
import {moderateScale} from 'react-native-size-matters';

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  const notificationDot = useAppSelector(state => state.court.notificationDot);

  const Tabs = [
    {
      name: 'Home',
      component: HomeStack,
      key: 'Home',
      Icon: ({color, size}) =>
        color === theme.colors.primary ? (
          <View style={styles.tabBack}>
            <HomeSvg />
          </View>
        ) : (
          <HomeSvg />
        ),
    },
    {
      name: 'MyBookingStack',
      component: MyBookingStack,
      key: 'MyBookingStack',
      Icon: ({color, size}) =>
        color === theme.colors.primary ? (
          <View style={styles.tabBack}>
            <Calender />
          </View>
        ) : (
          <Calender />
        ),
    },
    {
      name: 'Notifications',
      component: Notifications,
      key: 'Notification',
      Icon: ({color, size}) =>
        color === theme.colors.primary ? (
          <View style={[styles.tabBack]}>
            {notificationDot ? <View style={styles.notifyDot} /> : null}

            <NotificationsSvg />
          </View>
        ) : (
          <View>
            {notificationDot ? (
              <View
                style={[styles.notifyDot, {top: -moderateScale(3), right: 0}]}
              />
            ) : null}
            <NotificationsSvg />
          </View>
        ),
    },
    {
      name: 'SettingsStack',
      component: SettingsStack,
      key: 'SettingsStack',
      Icon: ({color, size}) =>
        color === theme.colors.primary ? (
          <View style={styles.tabBack}>
            <User />
          </View>
        ) : (
          <User />
        ),
    },
  ];

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: [styles.bottomTabStyle, null],
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text,
      }}>
      {Tabs?.map(tab => {
        return (
          <Tab.Screen
            key={tab?.key}
            name={tab?.name}
            component={tab?.component}
            options={{
              tabBarIcon: ({color, size}) => tab?.Icon({color, size}),
            }}
            // listeners={{
            //   tabPress: e => {
            //     if (tab?.name === t('HOME')) {
            //       e.preventDefault(); // Prevent default behavior
            //       navigationRef.dispatch(
            //         CommonActions.reset({
            //           index: 0,
            //           routes: [{name: tab?.name}],
            //         }),
            //       );
            //     }
            //   },
            // }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default HomeTabs;
