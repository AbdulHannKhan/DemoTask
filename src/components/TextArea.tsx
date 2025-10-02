import React, {useRef, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {width} from '../config/constants';
import theme from '../config/theme';
import styles from '../GlobalStyles';
import Icon from './Icon';

type CustomProps = {
  labelValue: string;
  placeholder: string;
  secureTextEntry?: boolean;
  onChangeText: (arg: string) => void;
  customStyle?: object;
  error?: string;
  label?: string;
  required?: boolean;
  disableFlag?: boolean;
  rightIcon?: string;
  leftText?: string;
  deleteFunc?: () => void;
  leftIcon?: string;
  onPressRight?: () => void;
  RightComponent?: any;
  keyboardType?: string;
  rightText?: string;
};

const TextAreaInput = ({
  labelValue,
  placeholder,
  onChangeText,
  secureTextEntry,
  customStyle,
  error,
  label,
  required,
  leftIcon,
  disableFlag,
  leftText,
  deleteFunc,
  rightIcon,
  onPressRight,
  keyboardType = 'default',
  RightComponent,
  rightText,
}: CustomProps) => {
  const [close, setClose] = useState(secureTextEntry);
  const inputRef = useRef<any>();
  const onFocus = () => {
    inputRef.current.focus();
  };

  return (
    <TouchableOpacity
      disabled={disableFlag}
      onPress={onFocus}
      style={[customStyle, styles.marginVS]}>
      {label ? (
        <View style={[styles.row, styles.marginBXS]}>
          <Text style={styles.regularBold}>{label}</Text>
          <Text style={[styles.regularBold, {color: theme.colors.danger}]}>
            {required ? ' *' : null}
          </Text>
        </View>
      ) : null}

      <View
        style={[
          styles.inputContainer,
          {alignItems: 'flex-start', height: moderateScale(120)},
        ]}>
        {/* {iconType ? (
            <Image
              style={styles.imgInput}
              resizeMode="contain"
              source={iconType}></Image>
          ) : null} */}
        {leftText ? (
          <Text
            style={[
              styles.text,
              styles.marginLM,
              {color: theme.colors.darkText},
            ]}>
            {leftText}
          </Text>
        ) : null}

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
          placeholder={placeholder}
          placeholderTextColor={theme.colors.inputText}
          style={[
            styles.input,
            styles.text,
            leftText ? null : styles.paddingHM,
            {verticalAlign: 'top'},
          ]}
          multiline={true}
          numberOfLines={4}
          ref={inputRef}
          secureTextEntry={close}
          value={labelValue}
          onChangeText={onChangeText}
          keyboardType={keyboardType ? keyboardType : 'default'}
          //   onFocus={() => setFocus(true)}
          //   onBlur={() => setFocus(false)}
        />

        {/* {error && <Text style={styles.errorText}>{error}</Text>} */}
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

export default TextAreaInput;
