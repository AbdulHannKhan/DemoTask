import React, {useEffect, useRef, useState} from 'react';
import {Keyboard, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {width} from '../config/constants';
import theme from '../config/theme';
import styles from '../GlobalStyles';
import Icon from './Icon';
import Button from './Button';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '../store/hooks';
import i18next from 'i18next';

type CustomProps = {
  labelValue: string;
  placeholder?: string;
  customStyle?: object;
  error?: string;
  label?: string;
  required?: boolean;
  disableFlag?: boolean;
  leftText?: string;
  leftIcon?: string;
  onChangeText: (arg: string) => void;
  onPressRight?: any;
  onFocusNavigate?: () => void;
  navigate?: boolean;
  scanHide?: boolean;
  onScanPress?: any;
  addUserHide?: boolean;
  inputDisable?: boolean;
};

const SearchComp = ({
  labelValue,
  placeholder,
  customStyle,
  error,
  label,
  required,
  leftIcon,
  disableFlag,
  inputDisable,
  leftText,
  onPressRight,
  onChangeText,
  onFocusNavigate,
  navigate,
  scanHide,
  onScanPress,
  addUserHide,
}: CustomProps) => {
  const {userData, accessToken} = useAppSelector(state => state.onBoarding);
  const langDir = i18next?.dir();
  const inputRef = useRef<any>();
  const [focus, setFocus] = useState(false);
  const {t} = useTranslation();

  const onFocus = (e: any) => {
    onFocusNavigate && onFocusNavigate();

    if (!inputDisable) {
      setFocus(true);
      inputRef.current.focus();
    }
  };
  const onBlur = () => {
    setFocus(false);
  };

  useEffect(() => {
    navigate && setTimeout(() => inputRef?.current?.focus(), 100);
  }, [navigate, inputRef]);

  return (
    <TouchableOpacity
      disabled={disableFlag}
      onPress={onFocus}
      style={[customStyle, styles.marginVXS]}>
      {label ? (
        <View style={[styles.row, styles.marginBXS]}>
          <Text style={styles.regularBold}>{label}</Text>
          <Text style={[styles.regularBold, {color: theme.colors.danger}]}>
            {required ? ' *' : null}
          </Text>
        </View>
      ) : null}

      <View style={[styles.row, styles.centerAlign, styles.justifyBetween]}>
        <TouchableOpacity
          onPress={onFocus}
          style={[
            styles.inputContainer,
            scanHide && onPressRight && !addUserHide ? {width: '83%'} : null,
            focus ? styles.focusContainer : null,
          ]}>
          {/* {iconType ? (
            <Image
              style={styles.imgInput}
              resizeMode="contain"
              source={iconType}></Image>
          ) : null} */}

          {leftIcon && (
            <View style={[styles.centerAlign, styles.paddingLL]}>
              <Icon
                name={leftIcon}
                type="MaterialIcons"
                color={theme.colors.text}
                size={moderateScale(22)}
              />
            </View>
          )}

          <TextInput
            editable={!inputDisable}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.inputText}
            style={[
              styles.input,
              styles.text,
              langDir === 'rtl' && styles.marginRL,
            ]}
            onBlur={onBlur}
            onFocus={onFocus}
            ref={inputRef}
            value={labelValue}
            onChangeText={onChangeText}
          />

          {/* {error && <Text style={styles.errorText}>{error}</Text>} */}
        </TouchableOpacity>
        {focus ? (
          <TouchableOpacity
            style={[styles.centerAlign, {width: '27%'}]}
            onPress={() => {
              setFocus(false);
              Keyboard.dismiss();
              inputRef.current.clear();
              inputRef.current.setNativeProps({text: ''});
              onChangeText('');
            }}>
            <Text style={[styles.regularBold, {color: theme.colors.primary}]}>
              {t('CANCEL')}
            </Text>
          </TouchableOpacity>
        ) : scanHide && onPressRight && !addUserHide ? (
          <Button
            onPress={onPressRight}
            leftIcon={'user-plus'}
            iconColor={theme.colors.surface}
            style={[styles.paddingVM, {marginVertical: 0, width: '15%'}]}
            textStyle={[styles.normalSmall, {color: theme.colors.surface}]}
          />
        ) : null}
      </View>
      {error && labelValue ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null}
      {/* {!error && customError && !labelValue ? (
        <Text style={styles.errorText}>{customError}</Text>
      ) : null} */}
    </TouchableOpacity>
  );
};

export default SearchComp;
