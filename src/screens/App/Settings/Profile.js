import {Formik} from 'formik';
import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Keyboard, ScrollView, Text, View} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import styles from '../../../GlobalStyles';
import BackButton from '../../../components/BackButton';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import PhoneNumInput from '../../../components/PhoneInput';
import ProfileImageUpload from '../../../components/ProfileImgUpload';
import Wrapper from '../../../components/wrapper';
import {convertToBase64} from '../../../config/constants';
import {ProfileSchema} from '../../../config/forms';
import {navigationRef} from '../../../navigation';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {updateProfile} from '../../../store/courtSlice';
import {setUserData} from '../../../store/onBoarding';
import Toast from 'react-native-toast-message';

const Profile = ({navigation, route}) => {
  const {t} = useTranslation();

  const dispatch = useAppDispatch();

  const {userData} = useAppSelector(state => state.onBoarding);
  const [phError, setPhError] = useState('');
  const [email, setEmail] = useState('');
  const [valid, setValid] = useState(false);

  const [initialValues, setInitialValues] = useState({
    name: userData?.userName,
    countryCode: userData?.userCellNumber?.substring(0, 3),
    cellNumber: userData?.userCellNumber,
    password: '',
    image: userData?.userImage,
  });

  const handleUpdate = (values, resetForm) => {
    Keyboard.dismiss();
    dispatch(
      updateProfile({
        ...values,
        cellNumber: values?.cellNumber?.substring(3, 14),
      }),
    ).then(res => {
      if (res?.error?.message !== 'Rejected') {
        let temp = {
          ...userData,
          userName: values?.name,
          userImage: values?.image,
          userCellNumber: values?.cellNumber,
        };

        dispatch(setUserData(temp));
        Toast.show({
          type: 'success',
          text1: 'Profile info is successfully updated.',
        });
        setInitialValues({
          name: values?.name,
          countryCode: values?.countryCode,
          cellNumber: values?.cellNumber,
          password: '',
          image: values?.image,
        });
      }
    });
  };

  return (
    <Wrapper style={styles.wrapper}>
      <BackButton
        title={t('PROFILE_SETTINGS')}
        onPress={() => navigationRef.goBack()}
        style={[styles.paddingHL, styles.paddingVM, styles.headerBorder]}
      />

      <Formik
        initialValues={initialValues}
        validationSchema={ProfileSchema}
        isInitialValid={valid}
        enableReinitialize={true}
        onSubmit={(values, {resetForm}) => {
          handleUpdate(values, resetForm);
        }}>
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
          setFieldValue,
        }) => (
          <View style={styles.paddingHL}>
            <ProfileImageUpload
              setImage={async val => {
                let checkkk = await convertToBase64(val?.uri);
                setFieldValue('image', checkkk);
              }}
              image={{uri: values?.image}}
            />
            <Input
              label={t('FULL_NAME')}
              placeholder={t('ENTER_FULL_NAME')}
              onChangeText={handleChange('name')}
              labelValue={values.name}
              error={errors.name}
              textContentType={'password'}
              autoComplete={'password'}
            />
            <Text style={[styles.regularBold, styles.marginBXS]}>
              Email Address
            </Text>
            <View
              style={[
                styles.inputContainer,
                styles.paddingHM,
                styles.marginBXS,
              ]}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {[userData?.userEmail]?.map(e => {
                  return (
                    <View>
                      <Text
                        style={[styles.text, {marginTop: -moderateScale(5)}]}>
                        {e}
                      </Text>
                    </View>
                  );
                })}
              </ScrollView>
            </View>

            <PhoneNumInput
              label={t('PH_NUM')}
              onChangeText={handleChange('cellNumber')}
              onChangeCode={code => {
                setFieldValue('countryCode', code);
              }}
              labelValue={values.cellNumber}
              error={phError}
              setError={setPhError}
            />

            <Input
              label={t('NEW_PASS')}
              customStyle={styles.marginVXS}
              placeholder={t('ENTER_NEW_PASS')}
              secureTextEntry={true}
              onChangeText={handleChange('password')}
              labelValue={values.password}
              error={errors.password}
              textContentType={'password'}
              autoComplete={'password'}
            />

            <Button
              disable={!isValid}
              onPress={handleSubmit}
              title={t('UPDATE')}
              style={{marginTop: moderateScale(30)}}
            />
          </View>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Profile;
