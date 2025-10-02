import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import styles from '../GlobalStyles';
import theme from '../config/theme';
import {moderateScale} from 'react-native-size-matters';

const OrBreak = ({text}: any) => {
  return (
    <View
      style={[
        styles.row,
        styles.centerAlign,
        text ? styles.justifyBetween : null,
      ]}>
      {text ? (
        <>
          <View style={styles.line} />
          <Text style={[styles.normalSmall, {color: theme?.colors.greylight}]}>
            {text}
          </Text>
          <View style={styles.line} />
        </>
      ) : (
        <View
          style={[
            styles.line,
            {width: '80%', alignSelf: 'center', marginTop: moderateScale(14)},
          ]}
        />
      )}
    </View>
  );
};

export default OrBreak;
