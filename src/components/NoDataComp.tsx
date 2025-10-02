import React from 'react';
import {Text, View} from 'react-native';
import Empty from '../assets/images/Empty.svg';
import Person from '../assets/images/person.svg';
import Bell from '../assets/images/Bell.svg';

import styles from '../GlobalStyles';
import {useTranslation} from 'react-i18next';
import {height} from '../config/constants';
import Icon from './Icon';
import theme from '../config/theme';
import {moderateScale} from 'react-native-size-matters';

type Props = {
  type?: string;
  text?: string;
};

const NoDataComp = ({type, text}: Props) => {
  const {t} = useTranslation();

  return (
    <View
      style={[
        styles.selfAlign,
        styles.centerAlign,
        styles.flexColumn,
        // styles.justifyBetween,
        {height: height / 1.8},
      ]}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {type === 'user' ? (
          <Person />
        ) : type === 'notification' ? (
          <Bell />
        ) : type === 'calendar' ? (
          <Icon
            name={'calendar-times-o'}
            size={moderateScale(80)}
            type="FontAwesome"
            color={theme.colors.darkGrey}
            style={{marginLeft: moderateScale(8)}}
          />
        ) : (
          <Empty />
        )}
      </View>

      <Text style={[styles.normalBold, styles.marginTL]}>
        {text ? text : t('NO_PRODUCT_FOUND')}
      </Text>
    </View>
  );
};

export default NoDataComp;
