import moment from 'moment-timezone';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Card from '../../../components/Card';
import NoDataComp from '../../../components/NoDataComp';
import SearchableFlatlist from '../../../components/SearchableFlatlist';
import theme from '../../../config/theme';
import styless from '../../../GlobalStyles';
import {BookingStatusEnum} from '../../../helper/enums';
import {convertToAMPM} from '../../../helper/functions';
import {navigationRef} from '../../../navigation';
import {getBookings, setBookingData} from '../../../store/courtSlice';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {useIsFocused} from '@react-navigation/native';

const MyBookings = ({navigation}) => {
  const dispatch = useAppDispatch();
  const isFocus = useIsFocused();
  const [selectedTab, setSelectedTab] = useState('upcoming');
  const {bookings, listLoader} = useAppSelector(state => state.court);
  const {accessToken} = useAppSelector(state => state.onBoarding);

  useEffect(() => {
    if (isFocus && !accessToken) {
      dispatch(setBookingData(null));

      navigationRef.navigate('AuthStack', {
        screen: 'SignIn',
        params: {
          stack: 'MyBookingStack',
          data: 'MyBookings',
        },
      });
    }
  }, [isFocus]);

  const handleTabPress = tab => {
    setSelectedTab(tab);
  };

  const formatDate = date => {
    const d = moment.tz(date, 'UTC').local();
    return d.format('DD MMMM, YYYY');
  };

  const processData = (data, pg) => {
    if (!data || data.length === 0) return [];

    const transformedData = [];
    let lastDate = null;
    let today = formatDate(new Date());

    data?.forEach((item, index) => {
      const itemDate = formatDate(item?.bookingDate);

      if (itemDate !== lastDate) {
        transformedData.push({
          type: 'date',
          date: itemDate == today ? 'Today' : itemDate,
        });
        lastDate = itemDate;
      }

      transformedData.push({type: 'item', item});
    });

    return transformedData;
  };

  const renderItem = ({item, index}) => {
    let booking = item?.item;

    if (item.type === 'item') {
      const date = `${moment(booking?.bookingDate).format(
        'ddd DD MMMM',
      )}, ${convertToAMPM(booking?.bookingStartTime)} - ${convertToAMPM(
        booking?.bookingEndTime,
      )}`;
      const text =
        selectedTab === 'upcoming'
          ? booking?.bookingStatusId === BookingStatusEnum.Pending
            ? 'Reservation Pending'
            : booking?.bookingStatusId === BookingStatusEnum.Confirmed
            ? 'Booking Confirmed'
            : 'Booking Cancelled'
          : booking?.bookingStatusId === BookingStatusEnum.Confirmed
          ? 'Booking Confirmed'
          : 'Booking Cancelled';
      const [s, ref, no] = booking?.bookingNo?.split('-');

      return (
        <Card
          title={`${booking?.courtName}`}
          text3={`(${ref}-${no})`}
          text={date}
          text2={text}
          leftIcon={'calendar-outline'}
          rightIcon={'arrow-right'}
          iconType={'MaterialCommunityIcons'}
          onPress={() => {
            navigationRef.navigate('BookingDetails', {
              data: booking,
              from: selectedTab,
            });
          }}
          textStyle={{fontSize: theme.fontSizes.small}}
          centerAlign={item?.centerAlign}
        />
      );
    } else if (item.type === 'date') {
      return <DateBreaker date={item?.date} index={index} />;
    }
    return null;
  };

  const DateBreaker = ({date, index}) => {
    return (
      <Text
        style={[
          styless.normalSmall,
          index == 0 ? null : styles.marginTM,
          {color: theme.colors.darkGrey},
          styless.marginB,
        ]}>
        {date}
      </Text>
    );
  };

  const Tabs = () => {
    return (
      <View style={[styles.tabs, styless.marginB]}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'upcoming' && styles.activeTab]}
          onPress={() => handleTabPress('upcoming')}>
          <Text
            style={[
              styless.normalSmall,
              selectedTab === 'upcoming' && [
                styless.normalBold,
                {color: theme.colors.darkText},
              ],
            ]}>
            Upcoming Booking
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'previous' && styles.activeTab]}
          onPress={() => handleTabPress('previous')}>
          <Text
            style={[
              styless.normalSmall,
              selectedTab === 'previous' && [
                styless.normalBold,
                {color: theme.colors.darkText},
              ],
            ]}>
            Previous Booking
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  if (accessToken) {
    return (
      <SearchableFlatlist
        title={'My Bookings'}
        searchable={false}
        headerStyle={{marginBottom: -20}}
        newFetchedList={bookings}
        loader={listLoader}
        getAllItems={getBookings}
        renderItem={renderItem}
        upcoming={selectedTab === 'upcoming' ? true : false}
        processData={processData}
        NoDataComp={() => {
          return <NoDataComp type="calendar" text={'No Bookings Found'} />;
        }}>
        <Tabs />
      </SearchableFlatlist>
    );
  }
  return null;
};

export default MyBookings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tab: {
    flex: 1,
    // padding: 16,
    paddingBottom: moderateScale(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    borderBottomColor: theme.colors.primary,
    borderBottomWidth: 1,
  },
  tabText: {
    fontSize: 16,
    color: '#333',
  },

  content: {
    flex: 1,
    padding: 16,
  },
});
