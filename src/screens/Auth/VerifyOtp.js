import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Keyboard, StyleSheet, Text, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import BackButton from '../../components/BackButton';
import Button from '../../components/Button';
import OtpInput from '../../components/OtpInput';
import PopUp from '../../components/PopUp';
import CustomRBSheet from '../../components/RBSheet';
import Wrapper from '../../components/wrapper';
import {companyDetailID, navigate, versionCode} from '../../config/constants';
import styles from '../../GlobalStyles';
import {linkTest} from '../../helper/functions';
import {navigationRef} from '../../navigation';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {
  generateOtp,
  generateOtpForget,
  login,
  register,
  setAccessToken1,
  setClearData,
  verifyOTP,
} from '../../store/onBoarding';

const VerifyOTP = ({navigation, route}) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const versionRBSheet = useRef();

  const fromForgetPass = route?.params?.from === 'forgot';

  const isFocus = useIsFocused();
  const {error, status} = useAppSelector(state => state.onBoarding);
  const {bookingData} = useAppSelector(state => state.court);

  const [code, setCode] = useState('');
  const [errorotp, setErrorotp] = useState('');

  useEffect(() => {
    isFocus && dispatch(setClearData(''));
  }, [isFocus]);

  useEffect(() => {
    if (error) {
      setErrorotp(error);
    }

    if (code?.length < 6) {
      setErrorotp('');
    }
  }, [error, code]);

  const onSubmit = () => {
    let form = {
      otpCode: code,
      companyDetailID: companyDetailID,
    };

    dispatch(verifyOTP(form)).then(res => {
      if (res?.error?.message !== 'Rejected') {
        handleSubmit();
      }
    });
  };

  const handleSubmit = async () => {
    if (route?.params?.from === 'forgot') {
      navigationRef.navigate('ResetPass');
    } else {
      let object = await AsyncStorage.getItem('form');
      let form = JSON.parse(object);

      delete form['tnC'];
      delete form['email'];

      dispatch(register(form)).then(res => {
        if (res?.error?.message !== 'Rejected') {
          console.log(res, 'fcmmmm1');
          setCode('');
          handleLogin();
          dispatch(setAccessToken1(''));
        }
        console.log(res, 'going1');
      });
    }
  };

  const handleLogin = async () => {
    try {
      let object = await AsyncStorage.getItem('form');
      console.log(fcmToken, 'going');
      let form = JSON.parse(object);
      const fcmToken = await messaging().getToken();
      console.log(fcmToken, 'abc');
      let loginData = {
        email: form?.email,
        password: form?.password,
        deviceToken: fcmToken,
        version: versionCode,
        companyDetailID: companyDetailID,
      };

      dispatch(login(loginData)).then(res => {
        if (res?.error?.message !== 'Rejected') {
          if (bookingData) {
            navigationRef.navigate('Home', {screen: 'BookingSummary'});
          } else {
            navigationRef.navigate('PostOnBoarding');
          }
        }
        console.log(res, 'going11212');
      });
    } catch (error) {
      console.log(error, 'going error');
    }
  };

  const handleSendAgain = async () => {
    Keyboard.dismiss();

    let object = await AsyncStorage.getItem('form');
    let form = JSON.parse(object);

    const otpForm = {
      companyDetailID: companyDetailID,
      email: form?.email,
    };

    if (fromForgetPass) {
      dispatch(generateOtpForget(otpForm));
    } else {
      dispatch(generateOtp(otpForm));
    }
  };

  return (
    <Wrapper>
      <BackButton
        borderHide={true}
        onPress={() => navigate({navigation, back: true})}
      />

      {/* ========  HEADER ======= */}
      <View style={styles.justifyStart}>
        <Text style={styles.heading3}>{t('VERIFICATION_CODE')}</Text>
        <Text style={[styles.text, styles.marginVS]}>
          We have sent a verification code to your Email Address
        </Text>
      </View>

      {/* ========  FORM ========== */}

      <OtpInput
        onCodeChanged={code => setCode(code)}
        status={status}
        otp={code}
        errorText={errorotp}
      />

      <Text
        onPress={handleSendAgain}
        style={[
          styles.normalSmall,
          styles.marginTS,
          {marginBottom: moderateScale(120), alignSelf: 'center'},
        ]}>
        {t('DIDNT_RECEIVE_CODE')}{' '}
        <Text style={[styles.normalSmall, styles.underlineTxt]}>
          {t('SEND_AGAIN')}
        </Text>
      </Text>

      <Button
        disable={code.length !== 6}
        title={t('SUBMIT')}
        onPress={onSubmit}
      />

      {/* ========== BOTTOM SHEETS ========= */}
      <CustomRBSheet rbsheetRef={versionRBSheet} height={moderateScale(250)}>
        <PopUp
          title={t('NEW_VERSION')}
          text={t('NEW_VERSION_TEXT')}
          btns={true}
          btnTitle1={t('CLOSE')}
          btnTitle2={t('UPDATE')}
          onBtn1Press={() => versionRBSheet.current.close()}
          onBtn2Press={() => {
            linkTest();
          }}
        />
      </CustomRBSheet>
    </Wrapper>
  );
};

export default VerifyOTP;

const styless = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
});
