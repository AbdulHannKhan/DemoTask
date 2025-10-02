import React, {useEffect, useRef, useState} from 'react';
import {Animated, BackHandler, Image, Keyboard, Text, View} from 'react-native';
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

const SignIn = ({navigation, route}) => {
  const dispatch = useAppDispatch();


  const [initialValues, setInitialValues] = useState({
    email: '',
    password: '',
    version: versionCode,
    companyDetailID: companyDetailID,
  });



  const handleLogin = async (values, resetForm) => {
    Keyboard.dismiss();
    goToHomeAndResetStack(navigation, 'HomeStack');

  
  };

  return (
    <Wrapper>
     
      {/* Animated Logo */}
      <View style={[styles.marginBM, styles.centerAlign]}>
        <Image 
        source={require('../../assets/images/bitrupt.png')} 
        style={{width: moderateScale(width * 0.6), 
        // height: moderateScale(200), 
        marginTop: moderateScale(50),
        resizeMode: 'contain'
      }} 
        />
        {/* <Logo width={moderateScale(width * 0.6)} height={moderateScale(200)} /> */}
      </View>

      <View style={styles.justifyStart}>
        <Text style={styles.heading3}>{'Sign In'}</Text>
      </View>

      <Formik
        isInitialValid={false}
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={(values, {resetForm}) => handleLogin(values, resetForm)}>
        {({handleChange, handleSubmit, values, errors, isValid}) => (
          <View>
            <Input
              label={'Email Address'}
              required
              placeholder={'Enter Email Address'}
              onChangeText={handleChange('email')}
              labelValue={values.email}
              error={errors.email}
              textContentType={'emailAddress'}
              autoComplete={'email'}
            />
            <Input
              label={'Password'}
              required
              placeholder={'Enter Password'}
              secureTextEntry
              onChangeText={handleChange('password')}
              labelValue={values.password}
              error={errors.password}
              textContentType={'password'}
              autoComplete={'password'}
            />

            <Button
              disable={!isValid}
              onPress={handleSubmit}
              title={'Sign In'}
            />
          </View>
        )}
      </Formik>

    
    </Wrapper>
  );
};

export default SignIn;
