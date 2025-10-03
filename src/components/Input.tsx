import React, {useEffect, useRef, useState} from 'react';
import {Platform, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {width} from '../config/constants';
import theme from '../config/theme';
import styles from '../GlobalStyles';
import Icon from './Icon';
import i18next from 'i18next';

type CustomProps = {
  max?: number;
  labelValue: string;
  placeholder: string;
  secureTextEntry?: boolean;
  onChangeText: (arg: string) => void;
  customStyle?: object;
  error?: any;
  label?: string;
  required?: boolean;
  editable?: boolean;
  rightIcon?: string;
  leftText?: string;
  deleteFunc?: () => void;
  leftIcon?: string;
  onPressRight?: () => void;
  onPressLeft?: () => void;
  RightComponent?: any;
  keyboardType?: any;
  rightText?: string;
  bottomText?: string;
  bottomHighlightTxt?: string;
  btmTextClr?: string;
  onSubmitEditing?: () => void;
  inputStyle?: object;
  textContentType: any;
  autoComplete: any;
};

const Input = ({
  max,
  labelValue,
  placeholder,
  onChangeText,
  secureTextEntry,
  customStyle,
  error,
  label,
  required,
  leftIcon,
  editable,
  leftText,
  deleteFunc,
  rightIcon,
  onPressRight,
  onPressLeft,
  keyboardType = 'default',
  RightComponent,
  bottomText,
  bottomHighlightTxt,
  btmTextClr,
  onSubmitEditing = () => {},
  inputStyle,
  textContentType = undefined,
  autoComplete = undefined,
}: CustomProps) => {
  const [close, setClose] = useState(secureTextEntry);
  const inputRef = useRef<any>();
  // useEffect(() => {
  //   inputRef && inputRef.current.focus();
  // }, [inputRef]);

  const onFocus = () => {
    inputRef.current.focus();
  };
  const langDir = i18next.dir();
  return (
    <TouchableOpacity
      disabled={!editable}
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

      <View style={[styles.row]}>
        <View
          style={[
            styles.inputContainer,
            inputStyle,
            {
              height: moderateScale(45),
            },
          ]}>
          {leftText ? (
            <Text
              style={[
                styles.text,
                styles.marginLM,
                {
                  color: theme.colors.darkText,
                  marginBottom:
                    Platform.OS === 'ios' ? moderateScale(1) : moderateScale(5),
                },
              ]}>
              {leftText}
            </Text>
          ) : null}

          {leftIcon && (
            <TouchableOpacity
              onPress={onPressLeft}
              style={[styles.centerAlign, styles.paddingLL]}>
              <Icon
                name={leftIcon}
                type="MaterialIcons"
                color={theme.colors.text}
                size={moderateScale(22)}
              />
            </TouchableOpacity>
          )}

          <TextInput
            maxLength={max}
            editable={editable}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.inputText}
            style={[
              styles.input,
              styles.text,
              leftText ? null : styles.paddingHM,
              // {lineHeight: moderateScale(20)},
            ]}
            ref={inputRef}
            secureTextEntry={close}
            value={labelValue}
            onChangeText={onChangeText}
            inputMode={keyboardType ? keyboardType : 'none'}
            onSubmitEditing={onSubmitEditing}
            textContentType={textContentType}
            autoComplete={autoComplete}
          />

          {secureTextEntry || rightIcon ? (
            <TouchableOpacity
              onPress={
                onPressRight ? () => onPressRight() : () => setClose(!close)
              }
              style={[styles.centerAlign, styles.paddingS]}>
              {rightIcon ? (
                <Icon
                  name={rightIcon}
                  type="Entypo"
                  color={theme.colors.text}
                  size={moderateScale(18)}
                />
              ) : (
                <Icon
                  name={!close ? 'eye-off-outline' : 'eye-outline'}
                  type="Ionicons"
                  color={theme.colors.text}
                  size={moderateScale(22)}
                />
              )}
            </TouchableOpacity>
          ) : null}
          {RightComponent && <RightComponent />}
        </View>
        {deleteFunc && labelValue ? (
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: width * 0.1,
            }}
            onPress={() => {
              deleteFunc();
            }}>
            <Icon
              name={'trash-can-outline'}
              type="MaterialCommunityIcons"
              color={theme.colors.primary}
              size={moderateScale(25)}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      {error && labelValue ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null}

      <View style={[styles.row, {alignItems: 'center'}]}>
        {langDir === 'ltr' && bottomText ? (
          <Text style={[styles.normalSmall, {color: theme.colors.darkGrey}]}>
            {bottomText}{' '}
          </Text>
        ) : null}

        {bottomHighlightTxt ? (
          <Text
            style={[
              styles.normalSmall,
              {fontFamily: theme.fonts.bold},
              btmTextClr ? {color: btmTextClr} : null,
            ]}>
            {bottomHighlightTxt}
          </Text>
        ) : null}
        {langDir === 'rtl' && bottomText ? (
          <Text style={[styles.normalSmall, {color: theme.colors.darkGrey}]}>
            {bottomText}{' '}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default Input;
