import i18next from 'i18next';
import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Filter from '../assets/images/Filter.svg';
import theme from '../config/theme';
import styles from '../GlobalStyles';
import Icon from './Icon';

type ButtonProps = {
  style?: object;
  onPress: () => void;
  type?: string;
  title?: string;
  rightBtn?: string;
  RightComp?: any;
  rightButtonPress?: () => void;
  borderHide?: boolean;
  languageChng?: boolean;
  extraBtn?: string;
  onPressExtra?: () => void;
  extraBtnDisable?: boolean;
  showBackButton?: boolean;
};

const BackButton = ({
  type,
  title,
  rightButtonPress,
  onPress,
  rightBtn,
  style,
  borderHide,
  RightComp,
  extraBtn,
  onPressExtra,
  extraBtnDisable,
  showBackButton = true,
}: ButtonProps) => {
  const langDir = i18next.dir();
  const [disable, setDisable] = useState(false);
  return (
    <View
      style={[
        styles.marginVM,
        styles.marginBM,
        styles.row,
        RightComp ? {justifyContent: 'space-between'} : null,
        style,
      ]}>
      {showBackButton && (
        <View style={[styles.row, styles.centerAlign]}>
          <TouchableOpacity
            disabled={disable}
            onPress={() => {
              onPress();
              setDisable(true);
              setTimeout(() => {
                setDisable(false);
              }, 2000);
            }}>
            <Icon
              name={'arrow-left'}
              type={'MaterialCommunityIcons'}
              size={moderateScale(24)}
              color={theme.colors.grey2}
              style={{marginTop: moderateScale(5)}}
            />
          </TouchableOpacity>
          <Text
            style={[
              langDir === 'rtl' ? styles.regularBold : styles.heading2,
              styles.marginLS,
            ]}>
            {title}
          </Text>
        </View>
      )}

      <View
        style={[
          styles.row,
          extraBtn ? {width: '20%', justifyContent: 'space-between'} : null,
        ]}>
        {extraBtn ? (
          <TouchableOpacity disabled={extraBtnDisable} onPress={onPressExtra}>
            <Icon
              name={extraBtn}
              size={moderateScale(24)}
              color={
                extraBtn === 'trash-can-outline' && extraBtnDisable === false
                  ? theme.colors.red
                  : extraBtnDisable === true
                  ? theme.colors.placeholder
                  : theme.colors.primary
              }
              type={'MaterialCommunityIcons'}
            />
          </TouchableOpacity>
        ) : null}
        {rightBtn ? (
          <TouchableOpacity onPress={rightButtonPress}>
            {rightBtn === 'filter' ? (
              <Filter />
            ) : (
              <Icon
                name={rightBtn}
                size={moderateScale(24)}
                color={
                  rightBtn === 'trash-can-outline'
                    ? theme.colors.red
                    : rightBtn === 'information-outline'
                    ? theme.colors.grey2
                    : theme.colors.primary
                }
                type={
                  rightBtn === 'dots-three-vertical'
                    ? 'Entypo'
                    : 'MaterialCommunityIcons'
                }
              />
            )}
          </TouchableOpacity>
        ) : null}
      </View>
      {RightComp && <RightComp />}
    </View>
  );
};

export default BackButton;
