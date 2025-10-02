import {Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CheckBox from '@react-native-community/checkbox';
import {moderateScale} from 'react-native-size-matters';
import theme from '../config/theme';
import styles from '../GlobalStyles';
import {width} from '../config/constants';
import {navigationRef} from '../navigation';
import {useTranslation} from 'react-i18next';
import i18next from 'i18next';

type CustomProps = {
  setToggleCheckBox: (arg: boolean) => void;
  toggleCheckBox: any;
  text?: string;
  navigation?: any;
  tnC?: boolean;
};
const Checkbox = ({
  setToggleCheckBox,
  toggleCheckBox,
  navigation,
  text,
  tnC,
}: CustomProps) => {
  const {t} = useTranslation();
  const landDir = i18next.dir();
  return (
    <View
      style={[
        styles.row,
        styles.marginVS,
        tnC ? styles.justifyStart : styles.centerAlign,
      ]}>
      <CheckBox
        style={styles.checkBox}
        tintColor={theme.colors.primary}
        tintColors={{
          true: theme.colors.primary,
          false: theme.colors.text,
        }}
        boxType="square"
        disabled={false}
        onCheckColor={theme.colors.primary}
        shouldRasterizeIOS
        value={toggleCheckBox}
        onValueChange={newValue => {
          if (toggleCheckBox) {
            setToggleCheckBox(false);
          } else {
            setToggleCheckBox(true);
          }
        }}
      />
      {tnC ? (
        <View style={{width: '90%'}}>
          <Text
            style={[
              styles.normalSmall,
              landDir === 'rtl' && {textAlign: 'right'},
            ]}>
            {t('AGREE_TERMS_START')}{' '}
            <Text
              onPress={() => {
                navigationRef.navigate('TermsnConditions');
              }}
              style={styles.underlineTxt}>
              {t('TERMS_N_CONDITIONS')}
            </Text>{' '}
            {t('AND')}{' '}
            <Text
              onPress={() => {
                navigationRef.navigate('PrivacyPolicy');
              }}
              style={styles.underlineTxt}>
              {t('PRIVACY_POLICY')}
            </Text>{' '}
            {t('AGREE_TERMS_END')}
          </Text>
        </View>
      ) : (
        <Text style={styles.normalSmall}>{text}</Text>
      )}
    </View>
  );
};

export default Checkbox;
