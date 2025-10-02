import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import styles from '../GlobalStyles';
import Icon from './Icon';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import theme from '../config/theme';

type Props = {
  width: number;
  text: string;
  icon: string;
  font: number;
  type: string;
  onPress?: () => void;
  style?: object;
};
const Widget = ({width, type, icon, font, text, style, onPress}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.greyBorder,
        styles.marginBS,
        styles.centerAlign,
        {height: moderateScale(60)},
        style,
        // width>? {width: 20%,} : null,
      ]}>
      <Icon
        name={icon}
        size={icon === 'person-outline' ? moderateScale(28) : moderateScale(24)}
        color={theme.colors.text}
        type={type}
        style={{
          marginBottom:
            icon === 'person-outline' ? -moderateScale(3) : moderateScale(0),
        }}
      />
      <Text
        style={[
          styles.homeTabs,
          {fontSize: font ? font : theme.fontSizes.regular},
        ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Widget;
