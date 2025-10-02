import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import styles from '../GlobalStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from './Icon';
import {moderateScale} from 'react-native-size-matters';
import theme from '../config/theme';
import {navigate, width} from '../config/constants';
import PrivacyTip from '../assets/images/privacy_tip.svg';
import Promotion from '../assets/images/Promotions.svg';
type Props = {
  style: object;
  textStyle: object;
  rightIconTouch?: any;
  title: string;
  leftIcon: string;
  leftImage: any;
  rightIcon: string;
  rightText: string;
  rightImage: any;
  iconType: string;
  iconSize: number;
  iconColor: string;
  onPress: () => void;
  onPressRightIcon: () => void;
  centerAlign?: boolean;
  text?: string;
  text2?: string;
  text3?: string;
};

const Card = ({
  style,
  title,
  rightIconTouch,
  leftIcon,
  leftImage,
  rightIcon,
  rightText,
  rightImage,
  iconSize,
  iconType,
  iconColor,
  onPressRightIcon,
  onPress,
  centerAlign,
  text,
  text2,
  text3,
  textStyle,
}: Props) => {
  return (
    <View
      style={[
        text ? styles.paddingVS : styles.paddingVM,
        styles.marginBM,
        styles.paddingHS,
        style,
        {backgroundColor: theme.colors.surface, borderRadius: moderateScale(8)},
        centerAlign ? {alignItems: 'center'} : null,
      ]}>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.row, styles.centerAlign, styles.justifyBetween]}>
        <View style={[styles.row, styles.centerAlign]}>
          {leftImage ? (
            <Image
              source={leftImage}
              style={{
                width: moderateScale(27),
                height: moderateScale(36),
              }}
            />
          ) : title == 'Privacy Policy' ? (
            <PrivacyTip width={moderateScale(27)} />
          ) : (
            <View
              style={
                !rightIcon && [
                  {
                    marginLeft: moderateScale(8),
                    marginRight: moderateScale(5),
                    width: '10%',
                  },
                ]
              }>
              {iconType === 'SVG' && leftIcon === 'Promotion' ? (
                <Promotion
                  width={moderateScale(26)}
                  height={moderateScale(26)}
                />
              ) : (
                <Icon
                  name={leftIcon}
                  type={iconType}
                  size={moderateScale(22)}
                  color={
                    leftIcon === 'trash-can-outline'
                      ? theme.colors.danger
                      : theme.colors.primary
                  }
                  style={{width: moderateScale(27)}}
                />
              )}
            </View>
          )}
          <View
            style={[
              rightIcon
                ? {
                    width: rightIcon ? 'auto' : centerAlign ? null : 0,
                    marginLeft: moderateScale(10),
                  }
                : {width: '90%'},
            ]}>
            <Text style={[styles.regularBold, {lineHeight: moderateScale(20)}]}>
              {title}{' '}
              {text3 ? (
                <Text
                  style={[
                    styles.normalSmall,
                    {color: theme.colors.darkGrey},
                    {lineHeight: moderateScale(20)},
                  ]}>
                  {text3}
                </Text>
              ) : null}
            </Text>
            {text ? <Text style={[styles.text, textStyle]}>{text}</Text> : null}
            {text2 ? (
              <Text
                style={[
                  styles.smallTabText,
                  {
                    color:
                      text2 === 'Reservation Pending' ||
                      text2 === 'Booking Cancelled'
                        ? theme.colors.red
                        : theme.colors.success,
                  },
                ]}>
                {text2}
              </Text>
            ) : null}
          </View>
        </View>
        {rightIcon ? (
          rightIconTouch ? (
            <TouchableOpacity onPress={onPressRightIcon}>
              <Icon
                name={rightIcon}
                type={
                  iconType === 'MaterialIcons'
                    ? 'MaterialCommunityIcons'
                    : iconType
                    ? iconType
                    : 'FontAwesome6'
                }
                size={iconSize ? iconSize : moderateScale(24)}
                color={iconColor ? iconColor : theme.colors.primary}
              />
            </TouchableOpacity>
          ) : (
            <Icon
              name={rightIcon}
              type={
                iconType === 'MaterialIcons'
                  ? 'MaterialCommunityIcons'
                  : iconType
                  ? iconType
                  : 'FontAwesome6'
              }
              size={iconSize ? iconSize : moderateScale(24)}
              color={iconColor ? iconColor : theme.colors.primary}
            />
          )
        ) : (
          <View
            style={[
              styles.row,
              styles.centerAlign,
              styles.justifyBetween,
              rightImage && {width: '25%'},
            ]}>
            <Text style={[styles.regularBold, {color: theme.colors.greyText}]}>
              {rightText}
            </Text>
            {rightImage ? (
              <Image
                source={rightImage}
                style={{width: moderateScale(36), height: moderateScale(24)}}
              />
            ) : null}
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Card;
