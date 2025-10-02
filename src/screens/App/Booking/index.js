import {useIsFocused} from '@react-navigation/native';
import moment from 'moment-timezone';
import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {moderateScale} from 'react-native-size-matters';
import styles from '../../../GlobalStyles';
import BackButton from '../../../components/BackButton';
import Button from '../../../components/Button';
import DateInputWithChevron from '../../../components/DateTime';
import Icon from '../../../components/Icon';
import NoDataComp from '../../../components/NoDataComp';
import Wrapper from '../../../components/wrapper';
import {height} from '../../../config/constants';
import theme from '../../../config/theme';
import {CourtDayOfWeekEnum} from '../../../helper/enums';
import {
  convertToAMPM,
  generateIntervals,
  getDateRangeWithDay,
  splitAndMarkBlockedIntervals,
} from '../../../helper/functions';
import {setBookingData, setSelectedDate} from '../../../store/courtSlice';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';

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
const Schedule = ({navigation, route}) => {
  const dispatch = useAppDispatch();
  const {data, slots} = route?.params;
  const isFocus = useIsFocused();

  const {accessToken} = useAppSelector(state => state.onBoarding);
  const {blockedSlots, selectedLocData, selectedDate, homeData} =
    useAppSelector(state => state.court);

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
  const [allSlots, setAllSlots] = useState(slots);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [timeFilter, setTimeFilter] = useState(data?.courtSlotDuration);
  const [showPicker, setShowPicker] = useState(false);
  const [daysArray, setDaysArray] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState(data);

  useEffect(() => {
    if (blockedSlots) {
      onAnyChangeDetect(timeFilter, selectedDate, blockedSlots, selectedCourt);
    }
  }, [blockedSlots]);

  useEffect(() => {
    if (isFocus) {
      let daysArray = [];

      daysArray = getDateRangeWithDay(selectedDate, today);
      const [year, month, day] = selectedDate?.split('-').map(Number);
      setSelectedMonth(month - 1);

      setDaysArray(daysArray);
    }
  }, [isFocus]);

  const onAnyChangeDetect = (
    timeFilterProp,
    selectedDateProp,
    blockedSlotsProp,
    data,
  ) => {
    if (timeFilterProp) {
      let dayOfWeek; // 0 = Sunday, 1 = Monday, etc.
      let dayName;

      let blockedSlotss = blockedSlotsProp?.filter(
        e => e?.courtId === data?.courtId,
      );
      dayOfWeek = new Date(selectedDateProp).getDay();

      dayName = Object.keys(CourtDayOfWeekEnum).find(
        day => CourtDayOfWeekEnum[day] === dayOfWeek,
      );

      const todaySlots = data?.courtTimings?.filter(
        slot => slot.courtDayOfWeek === CourtDayOfWeekEnum[dayName],
      );

      const intervals = generateIntervals(
        todaySlots,
        timeFilterProp,
        data?.courtSlotDuration,
      );

      const processedIntervals = splitAndMarkBlockedIntervals(
        intervals,
        blockedSlotss,
      );

      setAllSlots(processedIntervals);
    }
  };

  const toggleSlotSelection = item => {
    setSelectedSlots(prevSelected => {
      const exists = prevSelected?.find(
        slot => slot.bookingStartTime === item?.courtStartTime,
      );

      if (exists) {
        return prevSelected?.filter(
          slot => slot.bookingStartTime !== item.courtStartTime,
        );
      } else {
        return [
          ...prevSelected,
          {
            bookingStartTime: item.courtStartTime,
            bookingEndTime: item.courtEndTime,
            courtCharges: item.courtCharges,
          },
        ];
      }
    });
  };

  const renderItem = ({item}) => {
    const isSelected = selectedSlots?.some(
      slot => slot.bookingStartTime === item.courtStartTime,
    );

    return (
      <TouchableOpacity
        disabled={item?.isBlocked}
        onPress={() => toggleSlotSelection(item)}
        style={[
          styles.slotContainer,
          styles.marginVS,
          styles.marginRM,
          item?.isBlocked
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
            item?.isBlocked
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
          {convertToAMPM(item.courtStartTime)} -{' '}
          {convertToAMPM(item.courtEndTime)}
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

    setSelectedSlots([]);

    setDaysArray(daysArray);
  };

  const handleContinue = () => {
    dispatch(
      setBookingData({
        slots: selectedSlots,
        data: selectedCourt,
        duration: timeFilter,
      }),
    );

    if (accessToken) {
      navigation.navigate('BookingSummary');
    } else {
      navigation?.navigate('AuthStack', {screen: 'SignIn'});
    }
  };

  return (
    <Wrapper style={[styles.main, {paddingHorizontal: 0}]}>
      <BackButton
        onPress={() => navigation.goBack()}
        title="Choose Schedule"
        style={[styles.paddingHL, styles.paddingVM, styles.headerBorder]}
      />
      <View
        style={[
          // {height: moderateScale(40), backgroundColor: 'red'},
          styles.marginBS,
        ]}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.paddingHL}>
          {selectedLocData?.courts?.map(court => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelectedCourt(court);
                  setSelectedSlots([]);
                  onAnyChangeDetect(
                    timeFilter,
                    selectedDate,
                    blockedSlots,
                    court,
                  );
                }}
                style={[
                  styles.courtSelect,
                  {
                    backgroundColor:
                      selectedCourt?.courtName === court?.courtName
                        ? theme.colors.primary
                        : theme.colors.surface,
                  },
                ]}>
                <Text
                  style={[
                    styles.courtFont,
                    {
                      color:
                        selectedCourt?.courtName === court?.courtName
                          ? theme.colors.surface
                          : theme.colors.text,
                    },
                  ]}>
                  {court?.courtName}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.paddingHL}>
        {/* Month Picker */}

        <View
          style={[
            styles.row,
            styles.centerAlign,
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

        <View
          style={[
            styles.row,
            styles.centerAlign,
            styles.justifyBetween,
            {paddingHorizontal: 0, width: '100%'},
          ]}>
          <Text style={[styles.regularBold]}>Available Slots</Text>

          <DateInputWithChevron
            placeholder={'30 Min'}
            icon={'alarm'}
            type={'list'}
            value={timeFilter == 60 ? '1 Hour' : '30 Min'}
            onSelectItem={(item, data) => {
              setTimeFilter(data?.value);
              setSelectedSlots([]);

              onAnyChangeDetect(
                data?.value,
                selectedDate,
                blockedSlots,
                selectedCourt,
              );
            }}
            list={timeFilterList}
            style={[styles.fullWidth, {alignItems: 'flex-end'}]}
          />
        </View>

        {/* Slots */}
        {allSlots?.length ? (
          <View
            style={[
              {
                maxHeight: height * 0.45,
                minHeight: height * 0.45,
              },
            ]}>
            <FlatList
              data={allSlots}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2}
              columnWrapperStyle={[
                styles.row,
                styles.centerAlign,
                styles.justifyBetween,
              ]}
              contentContainerStyle={styles.flatlist}
            />
          </View>
        ) : (
          <View
            style={[
              {
                maxHeight: height * 0.45,
                minHeight: height * 0.45,
              },
              styles.centerAlign,
            ]}>
            <NoDataComp text="No Slots Available" type="calendar" />
          </View>
        )}
      </View>

      <Button
        disable={selectedSlots?.length === 0}
        title="Continue"
        onPress={handleContinue}
        style={styles.buttonOver}
      />
    </Wrapper>
  );
};

export default Schedule;
