import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {moderateScale} from 'react-native-size-matters';
import Icon from './Icon';
import theme from '../config/theme';
import styless from '../GlobalStyles';
import Location from '../assets/images/distance.svg';
import {useIsFocused} from '@react-navigation/native';
import {useAppSelector} from '../store/hooks';
import moment from 'moment-timezone';
import CalendarPicker from './CalendarPicker';

const Picker = ({
  placeholder,
  value,
  style,
  type,
  icon,
  list,
  iconType,
  onSelectItem,
}) => {
  const {homeData} = useAppSelector(state => state.court);

  const [showCalendar, setShowCalendar] = useState(false); // Controls the visibility of the calendar
  const [selected, setSelected] = useState(null); // Stores the selected date
  const [showList, setShowList] = useState(false); // Stores the selected date
  const [currentDate, setCurrentDate] = useState(''); // Stores the selected date

  const isFocus = useIsFocused();

  useEffect(() => {
    if (value && isFocus && homeData) {
      setCurrentDate(
        moment()?.tz(homeData?.companyTimezone)?.format('YYYY-MM-DD'),
      );
      if (type === 'datePicker') {
        let d = moment(value)?.format('YYYY-MM-DD');

        setSelected(d);
      } else {
        setSelected(value);
      }
    }
  }, [isFocus, homeData]);

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar); // Toggle calendar visibility
  };

  const onDateSelect = date => {
    setSelected(date.dateString); // Store the selected date
    setShowCalendar(false); // Close the calendar after selection
    onSelectItem(date);
  };

  const onItemSelect = (item, e) => {
    setSelected(item); // Store the selected item
    setShowList(false); // Close the dropdown after selection
    onSelectItem(item, e);
  };

  return (
    <TouchableOpacity
      onPress={() => {
        if (type === 'datePicker') {
          toggleCalendar();
        } else {
          setShowList(!showList);
        }
      }}
      style={[styles.container, style]}>
      <TouchableOpacity
        onPress={() => {
          if (type === 'datePicker') {
            toggleCalendar();
          } else {
            setShowList(!showList);
          }
        }}
        style={[styles.inputContainer]}>
        {/* Calendar Icon */}
        {icon === 'location' ? (
          <Location />
        ) : (
          <Icon
            name={icon}
            size={moderateScale(20)}
            color={theme.colors.darkText}
            style={styles.icon}
            type={iconType}
          />
        )}

        {/* Date Input */}
        {selected ? (
          <TextInput
            style={styles.input}
            value={
              type === 'datePicker'
                ? moment(selected ? selected : new Date()).format('DD-MMM-YYYY')
                : selected
            }
            placeholder={placeholder}
            placeholderTextColor={theme.colors.darkText}
            editable={false} // Make the input field read-only
          />
        ) : null}

        {/* Chevron Icon */}
        <TouchableOpacity
          onPress={() => {
            if (type === 'datePicker') {
              toggleCalendar();
            } else {
              setShowList(!showList);
            }
          }}>
          <Icon
            name={showCalendar || showList ? 'chevron-up' : 'chevron-down'}
            size={moderateScale(24)}
            color={theme.colors.darkText}
            style={styles.chevron}
          />
        </TouchableOpacity>
      </TouchableOpacity>

      {/* Calendar Modal */}
      {showCalendar && (
        <CalendarPicker
          showCalendar={showCalendar}
          setShowCalendar={setShowCalendar}
          currentDate={currentDate}
          onDateSelect={onDateSelect}
          selected={selected}
        />
      )}

      {/* Dropdown Modal */}
      {showList && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={showList}
          onRequestClose={() => setShowList(false)}>
          <TouchableWithoutFeedback
            onPress={() => setShowList(false)} // Close the modal on outside press
          >
            <View style={styles.modalOverlay}>
              <View
                style={[
                  styles.calendarContainer,
                  styles.list,
                  {height: 'auto'},
                ]}>
                <ScrollView>
                  {list?.map((e, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => onItemSelect(e?.text, e)}
                      style={[
                        styless.paddingVXS,
                        {
                          backgroundColor:
                            e?.text === selected
                              ? theme.colors.inputBack
                              : theme.colors.surface,
                          paddingBottom: moderateScale(5),
                          borderBottomColor: theme.colors.border,
                          borderRadius: moderateScale(4),
                        },
                      ]}>
                      <Text style={[styless.normalSmall, styless.marginLS]}>
                        {e?.text}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </TouchableOpacity>
  );
};

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

export default Picker;
