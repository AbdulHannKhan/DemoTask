import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import theme from '../config/theme';
import {moderateScale} from 'react-native-size-matters';
import {useAppDispatch} from '../store/hooks';
import {setClearData} from '../store/onBoarding';
import {useIsFocused} from '@react-navigation/native';
import styles from '../GlobalStyles';

type ContainerProps = {
  children: React.ReactNode;
  style: object;
  scrollEnabled:boolean
};

const Wrapper = ({children, style,scrollEnabled}: ContainerProps) => {
  return (
    <View style={[styles.main, style]}>
      <ScrollView
        scrollEnabled={scrollEnabled}
        contentContainerStyle={style}
        keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    </View>
  );
};

export default Wrapper;
