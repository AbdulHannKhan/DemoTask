import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Wrapper from './wrapper';
import styles from '../GlobalStyles';
import Button from './Button';
import Btns from './Btns';
import theme from '../config/theme';
import Checkbox from './CheckBox';
import {moderateScale} from 'react-native-size-matters';
import {useTranslation} from 'react-i18next';
import Input from './Input';
import PhoneNumInput from './PhoneInput';

type Props = {
  title?: string;
  text?: string;
  name?: string;
  startText?: string;
  endText?: string;
  finalText?: string;
  qtyText?: string;
  style?: object;
  type?: string;
  btns?: boolean;
  greyBorder?: boolean;
  btnTitle1?: string;
  btnTitle2?: string;
  onPress: () => void;
  onBtn1Press?: () => void;
  onBtn2Press?: () => void;
  checkbox?: boolean;
  toggleCheckBox?: boolean;
  setToggleCheckBox?: any;
  centered?: boolean;
  checkBoxText?: string;
  input?: boolean;
  value?: any;
  setValue?: any;
  disable?: boolean;
  error?: string;
  setError?: any;
};

const PopUp = ({
  title,
  name,
  text,
  startText,
  endText,
  qtyText = '',
  finalText = '',
  style,
  type,
  centered,
  btns,
  btnTitle1,
  btnTitle2,
  onPress,
  onBtn1Press,
  onBtn2Press,
  checkbox,
  toggleCheckBox,
  setToggleCheckBox,
  checkBoxText,
  input,
  value,
  setValue,
  error,
  setError,
  disable,
}: Props) => {
  const {t} = useTranslation();
  return (
    <View>
      <View style={[styles.centerAlign, style]}>
        <Text style={styles.heading2}>{title}</Text>
        {text ? (
          <Text
            style={[
              styles.text,
              styles.marginVS,

              centered ? null : {alignSelf: 'flex-start'},
            ]}>
            {text}
          </Text>
        ) : (
          <Text
            style={[
              styles.text,
              type === 'phoneInput' ? null : styles.marginVS,
              centered ? null : {alignSelf: 'flex-start'},
            ]}>
            {startText}
            <Text style={styles.regularBold}>{name}</Text>
            {endText}
            <Text style={styles.regularBold}>{qtyText}</Text>
            {finalText}
          </Text>
        )}
      </View>
      {type === 'phoneInput' ? (
        <PhoneNumInput
          label={t('PH_NUM')}
          required={true}
          onChangeText={setValue}
          labelValue={value}
          onChangeCode={code => {}}
          error={error}
          setError={setError}
        />
      ) : null}
      {checkbox && (
        <View
          style={{
            alignSelf: 'flex-start',
            marginTop: -moderateScale(10),
            marginBottom: -moderateScale(10),
          }}>
          <Checkbox
            toggleCheckBox={toggleCheckBox}
            setToggleCheckBox={check => {
              setToggleCheckBox(check);
            }}
            text={checkBoxText}
          />
        </View>
      )}

      {input ? (
        <Input
          label={t('PASSWORD')}
          placeholder={t('ENTER_PASS')}
          secureTextEntry={true}
          onChangeText={val => {
            setValue(val);
          }}
          labelValue={value ? value : ''}
          textContentType={'password'}
          autoComplete={'password'}
        />
      ) : null}

      {btns ? (
        <Btns
          btnText1={btnTitle1 ? btnTitle1 : t('CANCEL')}
          btnText2={btnTitle2 ? btnTitle2 : t('DELETE')}
          onBtn1Press={onBtn1Press}
          onBtn2Press={onBtn2Press}
          btn2disable={disable ? disable : false}
          btnStyle={
            btnTitle2
              ? {}
              : {
                  backgroundColor: disable
                    ? theme.colors.disable
                    : theme.colors.red,
                }
          }
          borderColor={theme.colors.border}
        />
      ) : (
        <Button title={t('CLOSE')} onPress={onPress} />
      )}
    </View>
  );
};

export default PopUp;
