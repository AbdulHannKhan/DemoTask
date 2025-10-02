import {useIsFocused} from '@react-navigation/native';
import moment from 'moment-timezone';
import React, {useEffect, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {moderateScale} from 'react-native-size-matters';
import styles from '../../../../GlobalStyles';
import BackButton from '../../../../components/BackButton';
import Button from '../../../../components/Button';
import Picker from '../../../../components/DateTime';
import Icon from '../../../../components/Icon';
import Wrapper from '../../../../components/wrapper';
import theme from '../../../../config/theme';
import {CourtDayOfWeekEnum} from '../../../../helper/enums';
import {setBookingData, setSelectedDate} from '../../../../store/courtSlice';
import {useAppDispatch, useAppSelector} from '../../../../store/hooks';
import {
  convertToAMPM,
  generateIntervals,
  getDateRangeWithDay,
  splitAndMarkBlockedIntervals,
} from '../../../../helper/functions';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const timeFilterList = [
  {id: 1, text: '30 Min', value: 30},
  {id: 2, text: '1 Hour', value: 60},
];
const AllCourtsBooking = ({navigation, route}) => {
  const dispatch = useAppDispatch();
  const {data, slots} = route?.params;
  const isFocus = useIsFocused();

  const {accessToken} = useAppSelector(state => state.onBoarding);
  const {blockedSlots, selectedDate, homeData} = useAppSelector(
    state => state.court,
  );

  const currentDate = moment()
    ?.tz(homeData?.companyTimezone ?? 'Asia/Karachi')
    ?.toDate();

  const [today, setToday] = useState(
    new Date(
      currentDate?.getFullYear(),
      currentDate?.getMonth(),
      currentDate?.getDate(),
    ),
  );

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [timeFilter, setTimeFilter] = useState(60);
  const [showPicker, setShowPicker] = useState(false);
  const [daysArray, setDaysArray] = useState([]);

  useEffect(() => {
    if (isFocus) {
      let daysArray = [];

      daysArray = getDateRangeWithDay(selectedDate, today);
      const [year, month, day] = selectedDate?.split('-').map(Number);
      setSelectedMonth(month - 1);

      setDaysArray(daysArray);
    }
  }, [isFocus]);

  const toggleSlotSelection = (item, court) => {
    setSelectedSlot({
      slot: {
        bookingStartTime: item.courtStartTime,
        bookingEndTime: item.courtEndTime,
        courtCharges: item.courtCharges,
      },
      court: court,
    });
  };

  const RenderSlot = ({slot, court}) => {
    const isSelected =
      selectedSlot?.slot?.bookingStartTime === slot.courtStartTime &&
      selectedSlot?.court?.courtId === court?.courtId;
    return (
      <TouchableOpacity
        disabled={slot?.isBlocked}
        onPress={() => toggleSlotSelection(slot, court)}
        style={[
          styles.slotContainer2,
          styles.marginVXS,
          styles.marginHXS,
          slot?.isBlocked
            ? {backgroundColor: theme.colors.disable}
            : {
                backgroundColor: isSelected
                  ? theme.colors.primary
                  : theme.colors.surface,
              },
        ]}>
        <Text
          style={[
            styles.smallBold,
            slot?.isBlocked
              ? {
                  color: theme.colors.greylight,
                  textDecorationLine: 'line-through',
                }
              : {
                  color: isSelected
                    ? theme.colors.surface
                    : theme.colors.darkGrey,
                },
          ]}>
          {convertToAMPM(slot.courtStartTime)}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderDays = ({item}) => {
    const [year, month, day] = selectedDate?.split('-');
    let d = `${day}/${month}/${year}`;

    return (
      <TouchableOpacity
        style={[
          styles.centerAlign,
          styles.flexColumn,
          styles.justifyBetween,
          styles.date,
          styles.shadow,
          item?.date == d
            ? {
                backgroundColor: theme.colors.primary,
                height: moderateScale(99),
                width: moderateScale(80),
              }
            : null,
          {marginRight: moderateScale(17)},
        ]}
        onPress={() => {
          getSlots(item?.date);
        }}>
        <Text
          style={[
            styles.regularBold,
            styles.marginTXS,
            {
              color:
                item?.date == d ? theme.colors.surface : theme.colors.darkGrey,

              fontSize:
                item?.date == d
                  ? theme.fontSizes.large
                  : theme.fontSizes.medium,
            },
          ]}>
          {item?.day}
        </Text>
        <Text
          style={[
            styles.heading3,
            styles.marginBXS,
            {
              color:
                item?.date == d ? theme.colors.surface : theme.colors.darkGrey,
            },
          ]}>
          {item?.date?.substring(0, 2)}
        </Text>
      </TouchableOpacity>
    );
  };

  const onDateSelect = selectedDate => {
    setShowPicker(false);
    getSlots(selectedDate);
  };

  const getSlots = async selectedDate => {
    let daysArray = [];
    let d = '';
    if (typeof selectedDate === 'string') {
      const [day, month, year] = selectedDate?.split('/');
      d = `${year}-${month}-${day}`;

      daysArray = getDateRangeWithDay(d, today);

      setSelectedMonth(month - 1);

      dispatch(setSelectedDate(d));
    } else {
      setSelectedMonth(new Date(selectedDate).getMonth());
      daysArray = getDateRangeWithDay(
        moment(selectedDate).format('YYYY-MM-DD'),
        today,
      );

      dispatch(setSelectedDate(moment(selectedDate).format('YYYY-MM-DD')));
    }

    setSelectedSlot(null);

    setDaysArray(daysArray);
  };

  const handleContinue = () => {
    console.log(
      {
        slots: [selectedSlot?.slot],
        data: selectedSlot?.court,
        duration: timeFilter,
      },
      'abc',
    );
    dispatch(
      setBookingData({
        slots: [selectedSlot?.slot],
        data: selectedSlot?.court,
        duration: timeFilter,
      }),
    );

    if (accessToken) {
      navigation.navigate('BookingSummary');
    } else {
      navigation?.navigate('AuthStack', {screen: 'SignIn'});
    }
  };

  const renderCourt = ({item}) => {
    let court = item;
    let blockedSlotss = blockedSlots?.filter(
      e => e?.courtId === court?.courtId,
    );

    let dayOfWeek; // 0 = Sunday, 1 = Monday, etc.
    let dayName;
    dayOfWeek = new Date(selectedDate).getDay();
    dayName = Object.keys(CourtDayOfWeekEnum)?.find(
      day => CourtDayOfWeekEnum[day] === dayOfWeek,
    );
    const todaySlots = court?.courtTimings?.filter(
      slot => slot.courtDayOfWeek === CourtDayOfWeekEnum[dayName],
    );
    const intervals = generateIntervals(
      todaySlots,
      timeFilter,
      court?.courtSlotDuration,
    );
    const processedIntervals = splitAndMarkBlockedIntervals(
      intervals,
      blockedSlotss,
    );

    const availableSlots = processedIntervals?.filter(
      slot => slot?.isBlocked === false,
    );

    return (
      <View
        style={[
          styles.shadow,
          styles.paddingVS,
          styles.marginBM,
          styles.marginHL,
          {borderRadius: moderateScale(10)},
        ]}>
        <View
          style={[
            styles.row,
            styles.paddingHM,
            styles.centerAlign,
            styles.justifyBetween,
          ]}>
          <Text style={[styles.normalBold, {color: theme.colors.darkText}]}>
            {court?.courtName}
          </Text>
          <Text style={styles.smallTabText}>
            {availableSlots?.length} slots
          </Text>
        </View>
        <View style={[styles.horizontalLine, styles.marginHM]} />

        <FlatList
          data={processedIntervals}
          renderItem={({item}) => {
            return <RenderSlot court={court} slot={item} />;
          }}
          keyExtractor={(item, index) => index.toString()}
          numColumns={4}
          columnWrapperStyle={{
            gap: moderateScale(3), // ✅ perfect spacing
          }}
          contentContainerStyle={{
            paddingHorizontal: moderateScale(5),
          }}
          style={{paddingLeft: moderateScale(5)}}
        />
      </View>
    );
  };
  return (
    <Wrapper style={[styles.main, {paddingHorizontal: 0}]}>
      <BackButton
        onPress={() => navigation.goBack()}
        title="Choose Schedule"
        style={[styles.paddingHL, styles.paddingVM, styles.headerBorder]}
      />

      <View style={{flex: 1}}>
        {/* Month Picker */}

        <View
          style={[
            styles.row,
            styles.centerAlign,
            styles.paddingHL,
            {height: moderateScale(100)},
          ]}>
          <TouchableOpacity
            onPress={() => setShowPicker(true)}
            style={[
              styles.centerAlign,
              {width: '30%'},
              styles.date,
              styles.shadow,
            ]}>
            <Text style={[styles.smallBold, styles.marginBS]}>
              {months[selectedMonth]}
            </Text>
            <Icon
              name={'calendar'}
              color={theme.colors.darkGrey}
              size={moderateScale(30)}
            />
          </TouchableOpacity>
          <DatePicker
            modal
            minimumDate={today}
            open={showPicker}
            date={new Date(selectedDate) || new Date()}
            mode="date"
            onConfirm={onDateSelect}
            onCancel={() => setShowPicker(false)}
          />

          <View style={[styles.marginLM, styles.centerAlign, {width: '75%'}]}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              scrollEnabled={false}
              contentContainerStyle={[
                styles.centerAlign,
                {padding: moderateScale(2)},
              ]}
              data={daysArray}
              renderItem={renderDays}
              keyExtractor={(item, i) => i.toString()}
            />
          </View>
        </View>

        <View style={[styles.row, styles.centerAlign, styles.justifyBetween]}>
          <Text style={[styles.regularBold, styles.marginLL]}>
            Available Slots
          </Text>

          <Picker
            placeholder={'30 Min'}
            icon={'alarm'}
            type={'list'}
            value={timeFilter == 60 ? '1 Hour' : '30 Min'}
            onSelectItem={(item, data) => {
              setTimeFilter(data?.value);
              setSelectedSlot(null);
              //   onAnyChangeDetect(data?.value, selectedDate, blockedSlots);
            }}
            list={timeFilterList}
            style={[styles.fullWidth, {alignItems: 'flex-end'}]}
          />
        </View>
        <View
          style={{
            flex: 1,
          }}>
          <FlatList
            data={data?.courts}
            renderItem={renderCourt}
            keyExtractor={(item, index) => index?.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: moderateScale(60)}}
          />
        </View>
      </View>
      {selectedSlot ? (
        <Button
          title="Continue"
          onPress={handleContinue}
          style={styles.buttonOver}
        />
      ) : null}
    </Wrapper>
  );
};

export default AllCourtsBooking;
