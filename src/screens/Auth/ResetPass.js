import {Formik} from 'formik';
import React, {useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Keyboard, Text, View} from 'react-native';
import AlertModal from '../../components/AlertModal';
import BackButton from '../../components/BackButton';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Wrapper from '../../components/wrapper';
import {height} from '../../config/constants';
import {ResetPassSchema} from '../../config/forms';
import styles from '../../GlobalStyles';
import {navigationRef} from '../../navigation';
import {useAppDispatch} from '../../store/hooks';
import {resetPass, setAccessToken1} from '../../store/onBoarding';

const Resetpass = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();

  const [modalVisible, setModalVisible] = useState(false);
  const [initialValues, setInitialValues] = useState({
    password: '',
  });

  const handleResetPass = async (values, resetForm) => {
    Keyboard.dismiss();
    dispatch(resetPass(values)).then(res => {
      if (res?.error?.message !== 'Rejected') {
        dispatch(setAccessToken1(''));
        resetForm();
        setModalVisible(true);
      }
    });
  };

  const onClose = () => {
    setModalVisible(false);
    navigationRef.navigate('SignIn');
  };

  return (
    <Wrapper>
      <BackButton
        borderHide={true}
        onPress={() => {
          navigationRef?.goBack();
          navigationRef?.goBack();
        }}
      />
      <View style={[styles.justifyStart, styles.marginBM]}>
        <Text style={styles.heading3}>{t('RESET_PASSWORD')}</Text>
      </View>
      <Formik
        initialValues={initialValues}
        isInitialValid={false}
        validationSchema={ResetPassSchema}
        onSubmit={(values, {resetForm}) => handleResetPass(values, resetForm)}>
        {({handleChange, handleSubmit, values, errors, isValid}) => (
          <View style={[{height: height / 2, justifyContent: 'space-between'}]}>
            <Input
              label={t('PASSWORD')}
              required={true}
              placeholder={t('ENTER_PASS')}
              secureTextEntry={true}
              onChangeText={handleChange('password')}
              labelValue={values.password}
              error={errors.password}
              textContentType={'password'}
              autoComplete={'password'}
            />

            <Button
              disable={!isValid}
              title={t('CONFIRM')}
              style={styles.marginVXL}
              onPress={handleSubmit}
            />
          </View>
        )}
      </Formik>

      <AlertModal type={'reset'} isVisible={modalVisible} onClose={onClose} />
    </Wrapper>
  );
};

export default Resetpass;
