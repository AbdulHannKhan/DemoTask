import moment from 'moment-timezone';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Card from '../../../components/Card';
import NoDataComp from '../../../components/NoDataComp';
import SearchableFlatlist from '../../../components/SearchableFlatlist';
import {height} from '../../../config/constants';
import theme from '../../../config/theme';
import {navigationRef} from '../../../navigation';
import {
  getNotifications,
  setBookingData,
  setNotificationDot,
} from '../../../store/courtSlice';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import styles from '../../../GlobalStyles';
import {useIsFocused} from '@react-navigation/native';
import {NotiIconTypes} from '../../../helper/enums';
import {parseBoldText} from '../../../helper/functions';

const Notifications = () => {
  const dispatch = useAppDispatch();
  const isFocus = useIsFocused();
  const {notifications, homeData, listLoader} = useAppSelector(
    state => state.court,
  );
  const {accessToken, userData} = useAppSelector(state => state.onBoarding);
  const Icons = [
    {
      type: NotiIconTypes.Booking,
      icon: 'calendar-outline',
      iconType: 'MaterialCommunityIcons',
    },
    {
      type: NotiIconTypes.Payment,
      icon: 'cash-multiple',
      iconType: 'MaterialCommunityIcons',
    },
    {
      type: NotiIconTypes.Reminder,
      icon: 'bell-outline',
      iconType: 'MaterialCommunityIcons',
    },
    {
      type: NotiIconTypes.Promotion,
      icon: 'Promotion',
      iconType: 'SVG',
    },
    {
      type: NotiIconTypes.Admin,
      icon: 'calendar-multiple-check',
      iconType: 'MaterialCommunityIcons',
    },
  ];
  useEffect(() => {
    if (isFocus && !accessToken) {
      dispatch(setBookingData(null));

      navigationRef.navigate('AuthStack', {
        screen: 'SignIn',
        params: {
          stack: 'Notifications',
          data: 'Notifications',
        },
      });
    }
    if (isFocus) {
      dispatch(setNotificationDot(false));
    }
  }, [isFocus]);

  const formatDate = date => {
    const d = moment.tz(date, homeData?.companyTimezone).local();

    return d.format('LL');
  };

  const processData = (data, pg) => {
    if (!data || data.length === 0) return [];

    const transformedData = [];
    let lastDate = null;
    let today = formatDate(new Date());

    data?.forEach((item, index) => {
      const itemDate = formatDate(item?.createdDate);

      if (itemDate !== lastDate) {
        transformedData.push({
          type: 'date',
          date: itemDate == today ? 'Today' : itemDate,
        });
        lastDate = itemDate;
      }

      transformedData.push({type: 'item', item: item});
    });

    return transformedData;
  };

  const renderItem = ({item, index}) => {
    let noti = item?.item;
    if (item?.type === 'item') {
      let msg = JSON?.parse(noti?.message);

      const selectedIcon =
        Icons.find(icon => icon.type === item?.Icon) || Icons[0];
      const formattedText = parseBoldText(msg?.Data, styles.notiText);

      return (
        <Card
          title={msg?.Title}
          text={formattedText}
          leftIcon={selectedIcon?.icon}
          iconType={selectedIcon?.iconType}
          textStyle={styles.notiText}
          centerAlign={item?.centerAlign}
        />
      );
    } else if (item?.type === 'date') {
      return <DateBreaker date={item?.date} index={index} />;
    }
    return null;
  };

  const DateBreaker = ({date, index}) => {
    return (
      <Text
        style={[
          styles.regularBold,
          index == 0 ? null : styles.marginTM,
          {color: theme.colors.primary, marginBottom: moderateScale(10)},
        ]}>
        {date}
      </Text>
    );
  };
  if (accessToken) {
    return (
      <SearchableFlatlist
        title={'Notifications'}
        searchable={false}
        headerStyle={{marginBottom: -moderateScale(20), paddingHorizontal: 0}}
        newFetchedList={notifications}
        loader={listLoader}
        getAllItems={getNotifications}
        renderItem={renderItem}
        processData={processData}
        NoDataComp={() => {
          return (
            <View style={[styles.marginTXL]}>
              <NoDataComp type="notification" text={'No Notifications Found'} />
            </View>
          );
        }}
      />
    );
  }
  return null;
};

export default Notifications;
