import React, {useEffect, useRef, useState} from 'react';
import {View, TextInput, StyleSheet, Alert, Text} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import styles from '../GlobalStyles';
import theme from '../config/theme';
import {height, width} from '../config/constants';
import OTPInputView from '@twotalltotems/react-native-otp-input';

type CustomProps = {
  length: number;
  onCodeChanged: () => void;
  status: string;
  otp: string;
  errorText: string;
  submit: (code: string) => void;
  style: object;
  cellwidth: any;
  iseditable: boolean;
};

const OtpInput = ({
  length = 6,
  onCodeChanged,
  status,
  otp,
  errorText,
  submit,
  style,
  cellwidth,
}: CustomProps) => {
  const checkError = otp?.length === 6 && errorText !== '';
  const checkSuccess = otp?.length === 6 && status === 'success';

  return (
    <View style={[styles.centerAlign, styles.marginHS]}>
      <OTPInputView
        style={{height: moderateScale(100)}}
        pinCount={length}
        code={otp}
        onCodeChanged={onCodeChanged}
        codeInputFieldStyle={{
          backgroundColor: checkError
            ? theme.colors.inputBgDanger
            : // : checkSuccess
              // ? theme.colors.successBack
              theme.colors.inputBack,
          borderColor: checkError
            ? theme.colors.danger
            : // : checkSuccess
              // ? theme.colors.green
              theme.colors.greyText,
          borderRadius: 5,
          color: theme.colors.placeholder,
          height: moderateScale(height * 0.055),
          width: cellwidth ? cellwidth : width * 0.12,
          fontSize: theme.fontSizes.regular,
        }}
        autoFocusOnLoad={true}
        // onCodeFilled={(code: string) => submit(code)}
        secureTextEntry={true}
        codeInputHighlightStyle={{
          borderColor: theme.colors.primary,
          backgroundColor: theme.colors.lightBlue,
          color: theme.colors.placeholder,
        }}
      />
      <Text
        style={[
          styles.errorText,
          {
            marginBottom: moderateScale(10),
            marginTop: -moderateScale(25),
            alignSelf: 'flex-start',
          },
        ]}>
        {errorText}
      </Text>
    </View>
  );
};
export default OtpInput;

const styless = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: moderateScale(10),
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    fontFamily: 'NotoSans-Regular',
    height: 50,
    // borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 5,
    backgroundColor: theme.colors.inputBack,
  },
});
