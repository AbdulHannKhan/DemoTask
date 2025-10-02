import i18next from 'i18next';
import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Filter from '../assets/images/Filter.svg';
import theme from '../config/theme';
import styles from '../GlobalStyles';
import Icon from './Icon';
import images from '../config/images';

type HeaderProps = {
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
};

const Header = ({
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
}: HeaderProps) => {
  const langDir = i18next.dir();
  const [disable, setDisable] = useState(false);
  return (
    <View
      style={[
        styles.marginVM,
        styles.marginBM,
        styles.row,
        rightBtn ? {justifyContent: 'space-between'} : null,
        styles.headerBorder2,
        styles.paddingHL,
        style,
      ]}>
      <View style={[styles.row, styles.centerAlign]}>
        <View style={{width: moderateScale(55), height: moderateScale(55)}}>
          <Image
            source={images.user}
            resizeMode="contain"
            style={styles.fullWidthHeight}
          />
        </View>
        <Text
          style={[
            langDir === 'rtl' ? styles.regularBold : styles.regularBold,
            styles.marginLM,
          ]}>
          {title}
        </Text>
      </View>

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
          <TouchableOpacity onPress={rightButtonPress} style={styles.roundBtn3}>
            {rightBtn === 'filter' ? (
              <Filter />
            ) : (
              <Icon
                name={rightBtn}
                size={moderateScale(24)}
                color={
                  rightBtn === 'trash-can-outline'
                    ? theme.colors.red
                    : rightBtn === 'information-outline' ||
                      rightBtn === 'bell-alt'
                    ? theme.colors.grey2
                    : theme.colors.primary
                }
                type={
                  rightBtn === 'bell-alt'
                    ? 'Fontisto'
                    : rightBtn === 'dots-three-vertical'
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

export default Header;
