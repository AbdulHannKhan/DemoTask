import React, {useEffect, useState} from 'react';
import {Keyboard, Text, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {companyDetailID, navigate} from '../../config/constants';
import BackButton from '../../components/BackButton';
import Button from '../../components/Button';
import PhoneNumInput from '../../components/PhoneInput';
import Wrapper from '../../components/wrapper';
import styles from '../../GlobalStyles';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {navigationRef} from '../../navigation';
import {generateOtpForget, setAccessToken1} from '../../store/onBoarding';
import {useIsFocused} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '../../components/Input';
import {Formik} from 'formik';
import {VerifyPhoneSchema} from '../../config/forms';

const VerifyPhone = ({navigation}) => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();

  const isFocus = useIsFocused();
  const [initialValues, setInitialValues] = useState({
    companyDetailID: companyDetailID,
    email: '',
  });

  useEffect(() => {
    isFocus && dispatch(setAccessToken1(''));
  }, [isFocus]);

  const handleGenerateOtp = async (values, {resetForm}) => {
    Keyboard.dismiss();

    await AsyncStorage.setItem('form', JSON.stringify(values));

    dispatch(generateOtpForget(values)).then(res => {
      if (res?.error?.message !== 'Rejected') {
        navigationRef.navigate('VerifyOTP', {from: 'forgot'});
        resetForm();
      }
    });
  };

  return (
    <Wrapper>
      <BackButton
        borderHide={true}
        onPress={() => navigate({navigation, back: true})}
      />
      <View style={[styles.justifyStart, styles.marginBM]}>
        <Text style={styles.heading3}>{t('RESET_PASSWORD')}</Text>
      </View>

      <Formik
        initialValues={initialValues}
        isInitialValid={false}
        validationSchema={VerifyPhoneSchema}
        onSubmit={handleGenerateOtp}>
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
              required={true}
              label={t('EMAIL_ADDRESS')}
              placeholder={t('ENTER_EMAIL_ADDRESS')}
              onChangeText={handleChange('email')}
              labelValue={values.email}
              error={errors.email}
              textContentType={'emailAddress'}
              autoComplete={'email'}
            />
            <View style={{marginVertical: moderateScale(30)}} />
            <Button
              disable={!isValid}
              title={t('CONFIRM')}
              onPress={handleSubmit}
            />
          </View>
        )}
      </Formik>
    </Wrapper>
  );
};

export default VerifyPhone;
