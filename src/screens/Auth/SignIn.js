import React, {useEffect, useRef, useState} from 'react';
import {Animated, BackHandler, Keyboard, Text, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {Formik} from 'formik';
import {useTranslation} from 'react-i18next';
import messaging from '@react-native-firebase/messaging';
import {useIsFocused} from '@react-navigation/native';

import styles from '../../GlobalStyles';
import Logo from '../../assets/images/applogo1.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Wrapper from '../../components/wrapper';
import {companyDetailID, versionCode, width} from '../../config/constants';
import {LoginSchema} from '../../config/forms';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {login, setAccessToken1, setPostOnboard} from '../../store/onBoarding';
import {navigationRef} from '../../navigation';
import BackButton from '../../components/BackButton';
import {goToHomeAndResetStack} from '../../helper/functions';
import {setLoading} from '../../store/courtSlice';

const SignIn = ({navigation, route}) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const isFocus = useIsFocused();
  const {bookingData} = useAppSelector(state => state.court);
  const {accessToken, fcmToken} = useAppSelector(state => state.onBoarding);

  useEffect(() => {
    if (isFocus && accessToken) {
      navigationRef.goBack();
    }
  }, [isFocus]);

  const [initialValues, setInitialValues] = useState({
    email: '',
    password: '',
    deviceToken: fcmToken,
    version: versionCode,
    companyDetailID: companyDetailID,
  });

  const translateY = useRef(new Animated.Value(-100)).current; // Start higher

  useEffect(() => {
    isFocus && dispatch(setAccessToken1(''));
    // getFCMToken();
    isFocus && dispatch(setLoading(false));
    // Start logo animation
    Animated.timing(translateY, {
      toValue: 0, // Move to normal position
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleLogin = async (values, resetForm) => {
    Keyboard.dismiss();
    dispatch(login(values)).then(res => {
      if (res?.error?.message !== 'Rejected') {
        dispatch(setPostOnboard(true));
        resetForm();

        if (bookingData) {
          navigationRef.navigate('Home', {screen: 'BookingSummary'});
        } else {
          if (route?.params?.stack && route?.params?.data) {
            navigationRef.navigate(route?.params?.stack, {
              screen: route?.params?.data,
            });
          } else {
            goToHomeAndResetStack(navigation, 'HomeTabs');
          }
        }
      }
    });
  };

  return (
    <Wrapper>
      <BackButton
        onPress={() => {
          navigationRef.goBack();
        }}
      />
      {/* Animated Logo */}
      <View style={[styles.marginBM, styles.centerAlign]}>
        {/* <Animated.View style={{transform: [{translateY}]}}> */}
        <Logo width={moderateScale(width * 0.6)} height={moderateScale(90)} />
        {/* </Animated.View> */}
      </View>

      <View style={styles.justifyStart}>
        <Text style={styles.heading3}>{t('SIGNIN')}</Text>
      </View>

      <Formik
        isInitialValid={false}
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={(values, {resetForm}) => handleLogin(values, resetForm)}>
        {({handleChange, handleSubmit, values, errors, isValid}) => (
          <View>
            <Input
              label={t('EMAIL_ADDRESS')}
              required
              placeholder={t('ENTER_EMAIL_ADDRESS')}
              onChangeText={handleChange('email')}
              labelValue={values.email}
              error={errors.email}
              textContentType={'emailAddress'}
              autoComplete={'email'}
            />
            <Input
              label={t('PASSWORD')}
              required
              placeholder={t('ENTER_PASS')}
              secureTextEntry
              onChangeText={handleChange('password')}
              labelValue={values.password}
              error={errors.password}
              textContentType={'password'}
              autoComplete={'password'}
            />

            <View
              style={[styles.row, styles.centerAlign, styles.justifyBetween]}>
              <View style={{width: '20%'}} />
              <Text
                onPress={() => navigation.navigate('VerifyPhone')}
                style={[styles.normalSmall, styles.underlineTxt]}>
                {t('FORGOT_PASS')}
              </Text>
            </View>

            <Button
              disable={!isValid}
              onPress={handleSubmit}
              title={t('SIGNIN')}
            />
          </View>
        )}
      </Formik>

      <Text
        onPress={() => navigation.navigate('SignUp')}
        style={[
          styles.normalSmall,
          styles.underlineTxt,
          styles.marginVL,
          {alignSelf: 'center'},
        ]}>
        {t('CREATE_ACC')}
      </Text>
    </Wrapper>
  );
};

export default SignIn;
