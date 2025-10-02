import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Modal,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Calendar } from 'react-native-calendars';
import { moderateScale } from 'react-native-size-matters';
import theme from '../config/theme';
import moment from 'moment';
import { useAppSelector } from '../store/hooks';

const CalendarPicker = ({
  showCalendar,
  setShowCalendar,
  currentDate,
  onDateSelect,
  selected,
}: any) => {
  const [selectedDate, setSelectedDate] = useState(selected);
  const { homeData } = useAppSelector(state => state.court);

  useEffect(() => {
    if (selected) {
      let d = moment(selected)
        ?.tz(homeData?.companyTimezone ?? 'Asia/Karachi')
        ?.format('YYYY-MM-DD');
      console.log('is it called?');
      setSelectedDate(d); // Ensure it retains the previously selected date
    }
  }, [selected, showCalendar]); // Update when the modal opens or selected changes

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={showCalendar}
      onRequestClose={() => setShowCalendar(false)}>
      <TouchableWithoutFeedback onPress={() => setShowCalendar(false)}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.calendarContainer}>
              {selected ? (
                <Calendar
                  minDate={moment(currentDate).format('YYYY-MM-DD')}
                  onDayPress={day => {
                    setSelectedDate(day.dateString);
                    onDateSelect(day); // Ensure parent state is updated
                  }}
                  markedDates={{
                    [selectedDate]: {
                      selected: true,
                      selectedColor: '#007BFF',
                      selectedDotColor: 'red',
                    },
                  }}
                  current={selectedDate || new Date()}
                  theme={{
                    selectedDayBackgroundColor: theme.colors.secondary,
                    todayTextColor: theme.colors.primary,
                  }}
                />
              ) : null}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CalendarPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  list: {
    width: moderateScale(150),
    height: moderateScale(200),
    position: 'absolute',

    right: 20,
    top: '30%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(15),
  },
  icon: {
    // marginRight: moderateScale(10),
  },
  chevron: {
    marginLeft: moderateScale(10),
  },
  input: {
    fontSize: theme.fontSizes.regular,
    color: theme.colors.darkText,
    padding: 0,
    paddingLeft: moderateScale(10),
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay background to dim the rest of the screen
  },
  calendarContainer: {
    backgroundColor: theme.colors.surface,
    borderRadius: moderateScale(8),
    width: moderateScale(320),
    padding: moderateScale(10),
  },
});
