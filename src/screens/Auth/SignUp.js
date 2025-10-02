import AsyncStorage from '@react-native-async-storage/async-storage';
import {Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Keyboard, Text, View} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import styles from '../../GlobalStyles';
import BackButton from '../../components/BackButton';
import Button from '../../components/Button';
import Checkbox from '../../components/CheckBox';
import Input from '../../components/Input';
import PhoneNumInput from '../../components/PhoneInput';
import Wrapper from '../../components/wrapper';
import {companyDetailID, navigate} from '../../config/constants';
import {SignUpSchema} from '../../config/forms';
import images from '../../config/images';
import {navigationRef} from '../../navigation';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {generateOtp} from '../../store/onBoarding';
import {useIsFocused} from '@react-navigation/native';

const languages = [
  {languageName: 'English', image: images.usflag},
  {languageName: 'اردو', image: images.pakflag},
  // {name: 'हिन्दी', image: images.indflag},
];

const SignUp = ({navigation}) => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();

  const isFocus = useIsFocused();

  const {initialCountryCode} = useAppSelector(state => state.onBoarding);

  const [phError, setPhError] = useState('');
  const [initialValues, setInitialValues] = useState({
    name: '',
    email: '',
    countryCode: initialCountryCode,
    cellNumber: '',
    password: '',
    tnC: false,
  });

  const handleGenerateOtp = async (values, resetForm) => {
    Keyboard.dismiss();
    const otpForm = {
      companyDetailID: companyDetailID,
      email: values?.email,
    };

    let num = values?.cellNumber.replace(values?.countryCode, '');
    num = num.replace(/\s+/g, '');

    await AsyncStorage.setItem(
      'form',
      JSON.stringify({...values, cellNumber: num}),
    );
    dispatch(generateOtp(otpForm)).then(res => {
      if (res?.error?.message !== 'Rejected') {
        navigationRef?.navigate('VerifyOTP');
        resetForm();
      }
    });
  };

  return (
    <Wrapper>
      <BackButton
        borderHide={true}
        onPress={() => navigationRef.goBack()}
        // RightComp={LanguageDropdown}
      />

      {/* ========  HEADER ======= */}
      <View style={[styles.justifyStart]}>
        <Text style={styles.heading3}>{t('SIGNUP')}</Text>
      </View>

      {/* ========  FORM ========== */}
      <Formik
        initialValues={initialValues}
        isInitialValid={false}
        enableReinitialize
        validationSchema={SignUpSchema}
        onSubmit={(values, {resetForm}) =>
          handleGenerateOtp(values, resetForm)
        }>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
          setFieldValue,
        }) => (
          <View>
            <Input
              label={t('FULL_NAME')}
              customStyle={{marginBottom: verticalScale(0)}}
              required={true}
              placeholder={t('ENTER_FULL_NAME')}
              onChangeText={handleChange('name')}
              labelValue={values.name}
              error={errors.name}
              textContentType={'name'}
              autoComplete={'name'}
            />
            <Input
              label={t('EMAIL_ADDRESS')}
              required={true}
              placeholder={t('ENTER_EMAIL_ADDRESS')}
              onChangeText={handleChange('email')}
              labelValue={values.email}
              error={errors.email}
              textContentType={'emailAddress'}
              autoComplete={'email'}
            />

            <PhoneNumInput
              label={t('PH_NUM')}
              required={true}
              initialValue={values.cellNumber ?? '+92'}
              onChangeText={handleChange('cellNumber')}
              onChangeCode={code => {
                setFieldValue('countryCode', code);
              }}
              labelValue={values.cellNumber}
              error={phError}
              setError={setPhError}
            />

            <Input
              label={t('PASSWORD')}
              customStyle={{marginBottom: verticalScale(0)}}
              required={true}
              placeholder={t('ENTER_PASS')}
              secureTextEntry={true}
              onChangeText={handleChange('password')}
              labelValue={values.password}
              error={errors.password}
              textContentType={'password'}
              autoComplete={'password'}
            />

            <Checkbox
              toggleCheckBox={values?.tnC}
              setToggleCheckBox={check => {
                setFieldValue('tnC', check);
              }}
              tnC={true}
            />

            <Button
              disable={!isValid || phError !== ''}
              title={t('SIGNUP')}
              style={styles.marginTXL}
              onPress={handleSubmit}
            />
          </View>
        )}
      </Formik>

      <Text
        onPress={() => navigate({navigation, to: 'SignIn'})}
        style={[
          styles.normalSmall,
          {alignSelf: 'center', marginBottom: moderateScale(40)},
        ]}>
        {t('ALREADY_HAVE_ACC')}{' '}
        <Text style={[styles.normalSmall, styles.underlineTxt]}>
          {t('SIGNIN')}
        </Text>
      </Text>
    </Wrapper>
  );
};

export default SignUp;
