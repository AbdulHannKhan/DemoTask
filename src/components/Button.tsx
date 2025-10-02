import { StyleSheet, TouchableOpacity, Text, View, Platform, Image } from 'react-native';
import React from 'react';
import theme from '../config/theme';
import styles from '../GlobalStyles';
import Google from '../assets/images/Google.svg';
import Padel from '../assets/images/sports_tennis.svg';

// import Padel from '../assets/images/Padel.png';

import Icon from './Icon';
import { moderateScale } from 'react-native-size-matters';
import i18next from 'i18next';

type ButtonProps = {
  title?: string;
  style?: object;
  onPress: () => void;
  type?: string;
  disable?: boolean;
  textStyle?: object;
  leftIcon?: string;
  rightIcon?: string;
  iconColor?: string;
  iconSize?: number;
  IconComp?: any;
};

const Button = ({
  title,
  type,
  disable,
  onPress,
  style,
  textStyle,
  leftIcon,
  rightIcon,
  iconColor,
  iconSize,
  IconComp,
}: ButtonProps) => {
  const langDir = i18next.dir();
  const typeCheck = type === 'Google';
  return (
    <TouchableOpacity
      disabled={disable}
      onPress={onPress}
      style={[
        styles.row,
        styles.primaryBtn,
        styles.centerAlign,
        typeCheck ? styles.googleBtn : null,
        disable ? { backgroundColor: theme.colors.disable } : null,
        style,
        Platform.OS === 'ios' && { minHeight: moderateScale(35) },
      ]}>
      {typeCheck && <Google />}
      {leftIcon && leftIcon == 'padel' ?
        <Padel width={moderateScale(22)} height={moderateScale(22)} />
        // <Image source={Padel} resizeMode='contain' style={{ width: moderateScale(16), height: moderateScale(16) }} />
        : leftIcon ? (
          <Icon
            name={leftIcon}
            size={iconSize ? iconSize : moderateScale(18)}
            type={
              leftIcon === 'user-plus'
                ? 'Feather'
                : leftIcon === 'wallet-outline' ||
                  leftIcon === 'trash-can-outline' ||
                  leftIcon === 'printer-outline' ||
                  leftIcon === 'image-plus' ||
                  leftIcon === 'whatsapp'
                  ? 'MaterialCommunityIcons'
                  : leftIcon === 'receipt-outline'
                    ? 'Ionicons'
                    : 'MaterialIcons'
            }
            color={iconColor}
            style={title && { marginRight: moderateScale(5) }}
          />
        ) : null}
      {IconComp && <IconComp />}
      {title ? (
        <Text
          style={[
            styles.text,
            styles.btntxt,
            typeCheck ? styles.paddingHM : null,
            typeCheck ? styles.normalSmall : null,
            disable ? { color: theme.colors.greylight } : null,
            textStyle ? textStyle : null,
            Platform.OS === 'ios' && langDir === 'rtl' ? { lineHeight: 0 } : null,
            { paddingBottom: moderateScale(5) },
          ]}>
          {title}
        </Text>
      ) : null}

      {rightIcon && (
        <Icon
          name={rightIcon}
          size={moderateScale(12)}
          type={'AntDesign'}
          color={theme.colors.darkGrey}
        />
      )}
    </TouchableOpacity>
  );
};

export default Button;
