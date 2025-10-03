import React, {useState} from 'react';
import {Image, Keyboard, Text, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {Formik} from 'formik';
import styles from '../../GlobalStyles';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Wrapper from '../../components/wrapper';
import {companyDetailID, versionCode, width} from '../../config/constants';
import {LoginSchema} from '../../config/forms';
import {goToHomeAndResetStack} from '../../helper/functions';
import { setUserData } from '../../store/onBoarding';
import { useAppDispatch } from '../../store/hooks';

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
    dispatch(setUserData({ email: values?.email, token: 'dummy_token_123' }));

    goToHomeAndResetStack(navigation, 'HomeStack');
  };

  return (
    <Wrapper>
     
      <View style={[styles.marginBM, styles.centerAlign]}>
        <Image 
        source={require('../../assets/images/bitrupt.png')} 
        style={{width: moderateScale(width * 0.6), 
        marginTop: moderateScale(50),
        resizeMode: 'contain'
      }} 
        />
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
              labelValue={values?.email}
              error={errors?.email}
              textContentType={'emailAddress'}
              autoComplete={'email'}
            />
            <Input
              label={'Password'}
              required
              placeholder={'Enter Password'}
              secureTextEntry
              onChangeText={handleChange('password')}
              labelValue={values?.password}
              error={errors?.password}
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
