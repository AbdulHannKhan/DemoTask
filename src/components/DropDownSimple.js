import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import theme from '../config/theme';
import {useTranslation} from 'react-i18next';

const data = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
  {label: 'Item 4', value: '4'},
  {label: 'Item 5', value: '5'},
  {label: 'Item 6', value: '6'},
  {label: 'Item 7', value: '7'},
  {label: 'Item 8', value: '8'},
];

const DropDownSimple = ({
  dataDropdown,
  valueDropdown,
  onChange,
  marginTopText,
  required,
  disableDropDown,
}) => {
  const {t} = useTranslation();

  const [value, setValue] = useState(null);

  return (
    <View>
      <Text
        style={{
          fontSize: theme.fontSizes.medium,
          color: theme.colors.darkText,
          fontFamily: theme.fonts.semiBold,
          marginTop: marginTopText,
        }}>
        {t('SELECT_ROLE')}
        {required ? (
          <Text
            style={{
              color: theme.colors.danger,
            }}>
            {' '}
            *
          </Text>
        ) : null}
      </Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={dataDropdown}
        itemTextStyle={styles.placeholderStyle}
        maxHeight={200}
        labelField="label"
        valueField="value"
        placeholder={t('SELECT')}
        value={valueDropdown}
        onChange={onChange}
        disable={disableDropDown}
      />
    </View>
  );
};

export default DropDownSimple;

const styles = StyleSheet.create({
  dropdown: {
    // margin: 16,
    // borderWidth:1,
    backgroundColor: '#F6F7F9',
    paddingVertical: verticalScale(15),
    marginVertical: verticalScale(10),
    paddingHorizontal: scale(10),
    borderRadius: moderateScale(10),

    fontFamily: theme.fonts.medium,
    color: theme.colors.text,
    fontSize: theme.fontSizes.medium,
    lineHeight: theme.fontSizes.xlarge,

    // height: 50,
    // borderBottomColor: 'gray',
    // borderBottomWidth: 0.5,
  },

  placeholderStyle: {
    fontSize: moderateScale(16),
    color: theme.colors.inputText,
    // fontFamily: theme.fonts.medium,
    // color: theme.colors.text,
    // fontSize: theme.fontSizes.medium,
    // lineHeight: theme.fontSizes.xlarge,
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: theme.fonts.medium,
    color: theme.colors.text,
    fontSize: theme.fontSizes.medium,
    lineHeight: theme.fontSizes.xlarge,
  },
  iconStyle: {
    width: 25,
    height: 25,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: moderateScale(16),
  },
});
